## CI Smoke Test Upgrade — Behavior Validation

### What Changed

Before:

    curl http://localhost:3000

Now:

    curl http://localhost:3000/api/user

And validate response:

    RESPONSE=$(curl -s http://localhost:3000/api/user)
    echo "$RESPONSE" | grep -q "Yashodhan"

---

### Why This Change

Old check only verified:

    server is running

New check verifies:

    backend is working
    nginx routing is correct
    response data is correct

---

### Key Learning

Availability check:

    "is server up?"

Behavior check:

    "is system working correctly?"

---

### Retry Logic Improvement

Replaced:

    sleep 10

With:

    retry loop using curl

Reason:

    containers may start at different speeds
    fixed sleep is unreliable

---

### Debugging Lesson

Failure case:

    API response unexpected

Cause:

    mismatch between expected value and actual backend response

Fix approach:

    compare:
        expected output (pipeline)
        actual output (logs)

---

### Final Understanding

CI pipeline should:

    not just run the system
    but validate correct behavior

This prevents:

    false positives in testing