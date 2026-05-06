# Reliability: Failure, Detection, Retry, and Recovery

## Objective
Understand how systems behave under failure and how CI/CD detects and handles it.

---

## System Setup
- Backend: Node.js (Express)
- Frontend: React + nginx
- Docker Compose setup
- CI pipeline with:
  - health check (`/health`)
  - API validation (`/api/user`)

---

## Experiments Performed

### 1. Wrong API Response
- Modified `/api/user` to return HTML instead of JSON

**Result**
- Health check passed
- Validation failed

**Learning**
- Availability ≠ Correctness  
- CI must validate response, not just service status

---

### 2. Retry Logic in CI
- Added retry loop in validation step

**Result**
- Transient failures handled
- Persistent failures still fail pipeline

**Learning**
- Retry handles instability, not broken systems  
- Retry ≠ Recovery

---

### 3. Backend Crash Simulation
- Added:

```js
setTimeout(() => process.exit(1), 10000);
```

**Result**
- Backend crashes after request
- nginx returns 502 during downtime

**Learning**
- Readiness (`/health`) only checks startup  
- System can pass health and still fail later

---

### 4. Docker Restart Policy
- Added:

```yaml
restart: always
```

**Result**
- Backend auto-restarts after crash

**Learning**
- Recovery achieved without manual intervention  
- Restart introduces downtime window

---

## Observed Behavior

```
t=0   → API works  
t=10  → backend crashes  
t=11  → nginx returns 502  
t=12  → container restarts  
t=15  → backend available again  
```

---

## Key Learnings

- Readiness ≠ Stability  
- Availability ≠ Correctness  
- Retry ≠ Recovery  
- Restart ≠ Zero Downtime  
- System behavior depends on timing  
- CI should expose failures, not hide them  

---

## User Impact

- During restart window:
  - User sees **502 Bad Gateway**
  - Perceived as application downtime

---

## Current System State

- Backend:
  - Auto-restarts ✔
- CI:
  - Detects failures ✔
  - Handles transient issues ✔
- Limitation:
  - Downtime still visible to user ❌

---

## Next Step

Move to:
- Multiple instances
- Load balancing
- Reduce visible downtime


---

# High Availability and Load Balancing

## Objective
Reduce visible downtime by introducing multiple backend instances behind nginx.

---

## Changes Made

### 1. Scaled Backend Replicas

Started multiple backend containers:

```bash
docker compose up -d --scale backend=2