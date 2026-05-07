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