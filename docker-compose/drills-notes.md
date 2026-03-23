# Docker Compose — Drills

## Overview

Hands-on drills to understand Docker Compose fundamentals:
- multi-service setup
- environment variables
- networking
- port mapping

---

## Drill 1 — Multi-Service Setup

- Defined multiple services in a single compose file
- Verified containers run together

---

## Drill 2 — Environment Variables

- Passed env variables to containers
- Observed that env is isolated per container

---

## Drill 3 — Service Communication

- Used service name as hostname
- One container called another using curl

---

## Drill 4 — Port Mapping

- Exposed container port to host
- Accessed service via browser (localhost)

---

## Key Learnings

- Service name = internal DNS
- Containers are isolated systems
- Logs = container output
- Internal communication does not need ports
- External access requires port mapping

---

## Notes

- depends_on ≠ service ready
- Debugging is done using docker logs