## CI/CD Pipeline — Fullstack App (GitHub Actions)

### Concept

CI/CD automates building, testing, and verifying the application on every code change.

    Code → Build → Test → Verify

---

### Pipeline Overview

Workflow runs on:

    push → main branch
    pull request → main branch

---

### Jobs in Pipeline

#### 1. Backend Build

    docker build ./backend

Purpose:

    Verify backend Docker image builds successfully

Failure means:

    Backend code or Dockerfile is broken

---

#### 2. Frontend Build

Steps:

    npm ci
    npm run build
    docker build ./frontend

Purpose:

    - Install exact dependencies (strict)
    - Build React app
    - Create frontend Docker image

Important:

    npm ci requires package.json and package-lock.json to be in sync

---

#### 3. Smoke Test (System Test)

Steps:

    docker compose up -d --build
    wait for services
    curl http://localhost:3000

Purpose:

    Verify full system (frontend + backend + nginx) is working

---

### Request Flow in CI

    GitHub Runner (remote machine)
            ↓
    docker compose starts containers
            ↓
    localhost:3000 inside runner
            ↓
    Nginx → Backend → Response
            ↓
    curl verifies response

---

### Key Learnings

#### 1. npm install vs npm ci

    npm install → flexible (local)
    npm ci      → strict (CI environment)

Mismatch causes:

    pipeline failure

---

#### 2. Clean Environment

CI runs in:

    fresh machine (no previous state)

So:

    local success ≠ CI success

---

#### 3. Dependency Consistency

    package.json = intent
    package-lock.json = exact version

Both must match.

---

#### 4. Pipeline Validation

Pipeline ensures:

    - backend builds
    - frontend builds
    - system runs
    - app responds

---

### Limitations (Current Pipeline)

Current check:

    curl localhost:3000

Only verifies:

    server is running

Does NOT verify:

    API correctness
    data integrity

---

### Next Improvement

Upgrade check to:

    curl localhost:3000/api/user

Or:

    validate response content

---

### Mental Model

    You do NOT run tests manually anymore

    You define:
        what should happen

    Pipeline ensures:
        it always happens

---

### Final Understanding

This is not just automation.

This is:

    a system that verifies your application on every change