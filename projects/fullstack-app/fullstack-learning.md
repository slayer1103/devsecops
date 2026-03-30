## Frontend → Backend Communication

### Concept

Frontend (React) communicates with backend (Node.js) using HTTP requests.

    Frontend → fetch() → Backend API → response → UI update

---

### Implementation

Frontend makes request:

    fetch("http://localhost:6001")

Backend responds:

    res.send("Backend is running")

---

### Flow

    Browser → localhost:3000 (frontend)
            ↓
    Frontend fetch → localhost:6001
            ↓
    Backend responds
            ↓
    Frontend updates UI

---

### Key Issue Faced — CORS

Browser blocked request due to different origins:

    localhost:3000 ≠ localhost:6001

Error:

    blocked by CORS policy

---

### Fix

Enable CORS in backend:

    app.use(cors())

---

### Important Understanding

Ports being correct ≠ request allowed

    Network works → request reaches backend
    Browser security (CORS) → allows or blocks response

---

### Context Difference

    Browser context → use localhost
    Container context → use service name (backend)

---

### Final Result

    Frontend UI displays backend response successfully