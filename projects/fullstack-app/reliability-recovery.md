# High Availability and Load Balancing

## Objective
Reduce visible downtime by introducing multiple backend instances behind nginx.

---

## Changes Made

### 1. Scaled Backend Replicas

Started multiple backend containers:

```bash
docker compose up -d --scale backend=2
```

### 2. Removed Fixed Host Port Mapping

Changed backend service from:

```yaml
ports:
  - "6001:6000"
```

To:

```yaml
expose:
  - "6000"
```

**Reason**
- Multiple containers cannot bind to the same host port
- Backends communicate internally through Docker network
- Only nginx needs external exposure

---

## Architecture

```text
Browser
   ↓
localhost:3000
   ↓
nginx
   ↓
backend replicas
```

---

## Load Balancing Observation

Modified API response to include hostname:

```js
const os = require("os");

host: os.hostname()
```

**Observed**
- Different hostnames returned on repeated requests
- Confirms traffic distribution across backend replicas

Example:

```json
{
  "name": "Yashodhan",
  "role": "DevOps Learner",
  "host": "424eb3eadb0a"
}
```

and:

```json
{
  "name": "Yashodhan",
  "role": "DevOps Learner",
  "host": "a3f54dad6975"
}
```

---

## Failover Test

Stopped one backend container:

```bash
docker stop fullstack-app-backend-1
```

**Observed**
- Application continued responding
- Requests routed to remaining backend
- Temporary delay occurred during restart window

---

## Key Learnings

- Multiple replicas reduce single points of failure
- nginx distributes requests across available backends
- Restart policy improves recovery
- High availability reduces downtime but does not eliminate it
- Internal container networking is different from host networking

---

## User Impact

Without replicas:
- Single backend failure → application outage

With replicas:
- Single backend failure → degraded but available service

---

# Health Checks and Container Lifecycle

## Objective
Understand the difference between:
- running containers
- healthy services
- crash recovery behavior

---

## Docker Health Check

Added backend health check in `compose.yaml`:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:6000/health"]
  interval: 5s
  timeout: 2s
  retries: 3
```

---

## Observed Lifecycle

After startup:

```text
health: starting
```

After successful checks:

```text
healthy
```

This confirmed:
- container startup and service readiness are different states
- Docker validates application responsiveness, not just process existence

---

## Key Learning

```text
running ≠ healthy
```

A container can:
- exist
- accept connections
- still be internally broken

Examples:
- database disconnected
- deadlocked application
- partial initialization
- broken dependencies

---

## Replica Behavior

Two backend replicas were running behind nginx.

Observed:
- requests distributed across replicas
- different container hostnames returned from `/api/user`

Example:

```json
{
  "host": "424eb3eadb0a"
}
```

and:

```json
{
  "host": "a3f54dad6975"
}
```

This confirmed load balancing behavior.

---

## Failover Observation

Manually stopped one backend container:

```bash
docker stop fullstack-app-backend-1
```

Observed:
- only one hostname remained in API responses
- application still worked
- traffic routed to surviving backend

This demonstrated:
- degraded availability instead of total outage
- reduced single point of failure

---

## Important Distinction

Manual stop:

```bash
docker stop
```

is different from:

```js
process.exit(1)
```

Reason:
- manual stop is considered intentional shutdown
- crash exit is considered unexpected failure

Recovery behavior differs between both scenarios.

---

## Core Learnings

- running ≠ healthy
- replicas improve availability
- restart policies handle crashes
- health checks improve reliability visibility
- high availability reduces outage probability
- traffic routing depends on backend health/state

---

## Current Architecture

```text
Browser
   ↓
nginx
   ↓
backend replicas
   ↓
Docker health monitoring
```

---

## Next Step


Move toward:
- health-aware routing
- rolling deployments
- minimizing visible downtime

---

# Blue Green Deployment Concepts

## Objective

Understand:
- multi-version deployment concepts
- traffic distribution
- deployment coexistence
- limitations of Docker Compose orchestration

---

## nginx Upstream Routing

Updated `nginx.conf` to use upstream routing.

```nginx
upstream backend_upstream {

    server backend-blue:6000;
    server backend-green:6000;
}
```

Reason:
- nginx can distribute traffic across multiple backend services
- backend service names are resolved internally through Docker networking

---

## Compose Architecture Update

Modified `compose.yaml` to include:

```yaml
backend-blue
backend-green
frontend
```

Both backend services:
- expose internal port `6000`
- include health checks
- use restart policies

Frontend:
- routes traffic through nginx reverse proxy

---

## Observed Behavior

Repeated API requests returned:

```json
{
  "host": "005af8e5e4e5",
  "deployment": "green"
}
```

and:

```json
{
  "host": "6622d5734faa",
  "deployment": "green"
}
```

This confirmed:
- traffic distribution across multiple containers
- load balancing functioning correctly

Different hostnames proved:
- multiple backend instances were active
- nginx distributed requests across them

---

## Important Realization

Even though:
- backend-blue
- backend-green

were separate services,

both still used:

```yaml
build: ./backend
```

Meaning:
- both containers were built from identical source code
- deployment identity remained the same
- only container identity differed

---

## Key Learning

```text
container identity ≠ application version identity
```

Different containers can still run:
- identical code
- identical images
- identical deployment versions

---

## Docker Compose Limitation

Docker Compose can:
- run containers
- scale services
- provide networking

But it does NOT fully manage:
- desired state reconciliation
- automatic replica recovery
- controlled rolling deployments
- orchestration lifecycle

This highlighted the difference between:
- container runtime management
- container orchestration

---

## Kubernetes Mapping

Current concepts already learned:

| Current Concept | Kubernetes Equivalent |
|---|---|
| container | Pod |
| replicas | ReplicaSet |
| compose service | Deployment |
| nginx routing | Service / Ingress |
| healthcheck | Readiness/Liveness Probe |
| restart handling | Self-healing |
| scaling | Horizontal scaling |

---

## Final Understanding

Kubernetes exists because manually managing:
- replicas
- health
- rollout coordination
- traffic routing
- recovery behavior

becomes operationally difficult at scale.

The current Docker Compose setup demonstrated those pain points practically.