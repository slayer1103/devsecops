# Fullstack App — Production Setup (Nginx + Docker Compose)

## Concept

A fullstack application consists of:

- Frontend (React)  
- Backend (Node.js + Express)  

Both run in separate containers and communicate through a controlled entry point.

---

## Final Architecture

```
Browser → localhost:3000
        ↓
Nginx (Frontend Container)
        ↓
├── "/"    → React static files
└── "/api" → Backend service (internal Docker network)
                    ↓
              Node.js Backend
```

---

## Key Components

### 1. Frontend (React)

- Built using:
```
npm run build
```

- Output:
```
build/ (static HTML, CSS, JS)
```

- Served by Nginx, not React dev server

---

### 2. Backend (Express)

- Runs on:
```
app.listen(6000)
```

- API endpoint:
```
GET /api → returns response
```

---

### 3. Docker Compose

Defines services:

- frontend → Nginx container  
- backend  → Node container  

Both connected via internal Docker network.

---

### 4. Nginx (Core of System)

Acts as:

- Static file server  
- Reverse proxy  

---

## Nginx Routing Logic

```
location / {
    serve React build
}

location /api {
    forward request → backend:6000
}
```

---

## Request Flow (Critical)

### Step-by-step

```
1. User opens browser → localhost:3000
2. Request hits Nginx
3. "/" → React UI served
4. React executes fetch("/api")
5. Nginx routes /api → backend:6000
6. Backend responds
7. Nginx returns response
8. React updates UI
```

---

## Important Distinction

### Before (incorrect / dev-style)

```
Browser → backend (localhost:6001)
```

Problems:
- CORS issues  
- Direct dependency  
- Fragile setup  

---

### After (correct architecture)

```
Browser → frontend (Nginx)
        → backend (internal only)
```

Benefits:
- No CORS  
- Backend hidden  
- Clean routing  
- Production-ready  

---

## Port Understanding

```
Host:      3000
Container: 80 (Nginx)
Backend:   6000 (internal)
```

Backend is NOT exposed to host.

---

## Why Backend Port Was Removed

```
ports: "6001:6000"  → removed
```

Result:
- Backend not accessible externally  
- Still works via internal Docker network  

---

## Core Concepts Learned

### 1. Separation of Concerns

```
Frontend → UI
Backend  → logic
Nginx    → routing
```

---

### 2. Reverse Proxy

```
client → nginx → backend
```

---

### 3. Internal Docker Networking

```
service name = hostname
backend → http://backend:6000
```

---

### 4. Routing Control

- Frontend does NOT decide backend URL  
- Nginx controls routing  

---

### 5. Production vs Development

```
Dev  → React dev server + proxy
Prod → Nginx + static build + reverse proxy
```

---

## Mental Model (Memorize This)

```
Browser → frontend (Nginx)
         → backend (via routing)
```

Browser never talks to backend directly.

---

## Final Takeaway

This is no longer:

```
running containers
```

This is:

```
designing how services communicate in a real system
```