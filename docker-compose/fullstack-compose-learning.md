# Docker Compose — Fullstack App Learning

## Concept

Docker Compose is used to run multiple services (frontend + backend) together using a single configuration.

    frontend + backend → compose.yaml → docker compose up → application runs

Instead of running multiple docker run commands, Compose defines all services in one place.

---

## What We Learned

We learned how to package and run a fullstack application using containers.

    frontend (React)
    backend (Node + Express)
    ↓
    containerized separately
    ↓
    managed together using Docker Compose

---

## Application Architecture

    Browser → Frontend (3000)
            ↓
    Backend (5001 → 5000)

    Host Port (5001)
            ↓
    Container Port (5000)
            ↓
    Node Application

---

## Key Concepts

### Multi-Container Setup

    Each service runs in its own container
    Compose manages all services together

---

### Port Mapping

    host_port:container_port

Example:

    5001:5000

    5001 → accessed from browser
    5000 → internal container port

---

### Service Isolation

    frontend container ≠ backend container
    each has its own environment

---

### Build Context

    build: ./backend → uses backend folder
    build: ./frontend → uses frontend folder

    wrong context → build fails
    missing files → container fails

---

### Container Lifecycle

    docker compose up → build + create + start
    docker compose down → stop + remove

---

### Logs = Source of Truth

    docker-compose logs

    if container fails → logs tell why

---

## Problems Faced

### Missing Application Files

    no package.json → npm install failed
    empty folder → container useless

---

### Port Conflict

    port 5000 already used by system (macOS)

Fix:

    change host port → 5001

---

### Wrong Directory Execution

    running commands outside correct folder

Result:

    dependencies not found
    wrong output

---

### Container Not Running

    docker ps showed nothing

Reality:

    container started → crashed → exited

Fix:

    docker-compose logs backend

---

### Port Confusion

    changed app port unnecessarily

Correct understanding:

    app runs on container port
    host mapping is separate

---

## Debugging Approach

    1. Check folder structure
    2. Check required files (package.json)
    3. Check logs
    4. Check port usage
    5. Verify compose configuration

---

## Commands Used

    docker compose up --build
    docker compose down
    docker ps
    docker-compose logs
    lsof -i :5000

---

## Key Takeaways

    docker does not create applications
    docker runs existing applications

    compose simplifies multi-container setup

    ports must be aligned correctly

    logs are more useful than guessing

    most issues come from structure mistakes, not docker itself