## Debugging Backend Without Docker

### Context

CI pipeline failed at:

    validate api response

Error:

    API response unexpected

---

### Root Cause

Pipeline expected:

    "Yashodhan"

Backend returned:

    "WrongName"

Mismatch caused:

    grep failure → exit code 1 → pipeline failure

---

### Debug Approach

Instead of running full system:

    docker compose up

Used direct backend execution:

    cd backend
    npm install
    node index.js

---

### Verification

Command:

    curl http://localhost:6000/api/user

Output:

    {"name":"Yashodhan","role":"DevOps Learner"}

---

### Key Learning

Do not debug entire system first.

Use layered debugging:

    1. Test backend independently
    2. Verify API response
    3. Then validate full system

---

### Pattern

Failure → Check logs → Compare expected vs actual → Isolate layer → Test locally → Fix → Re-run CI

---

### When to Use This

Use direct backend run when:

    - API logic is failing
    - Need fast feedback
    - Docker is not required

---

### When NOT to Use

Use Docker when:

    - Testing nginx routing
    - Testing full system
    - Reproducing CI behavior