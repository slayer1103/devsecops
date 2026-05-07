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