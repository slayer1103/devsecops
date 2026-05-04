# Reliability: Failure, Detection, Retry, and Recovery

## Objective
Understand how systems behave under failure and how CI/CD detects and handles it.

---

## System Setup
- Backend: Node.js (Express)
- Frontend: React + nginx
- Docker Compose setup
- CI pipeline with:
  - health check (/health)
  - API validation (/api/user)

---

## Experiments Performed

### 1. Wrong API Response
- Modified `/api/user` to return HTML instead of JSON
- Result:
  - Health check passed
  - Validation failed
- Learning:
  - Availability ≠ Correctness
  - CI must validate response, not just service status

---

### 2. Retry Logic in CI
- Added retry loop in validation step
- Result:
  - Transient failures handled
  - Persistent failures still fail pipeline
- Learning:
  - Retry handles instability, not broken systems
  - Retry ≠ Recovery

---

### 3. Backend Crash Simulation
- Added:
  ```js
  setTimeout(() => process.exit(1), 10000);

### Result:
- Backend crashes after request
    * nginx returns 502 during downtime
* Learning:
    * Readiness (/health) only checks startup
    * System can pass health and still fail later