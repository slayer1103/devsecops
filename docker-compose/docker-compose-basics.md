# Docker Compose — Basics

## Concept

Docker Compose is used to define and run multi-container applications using a single configuration file.

```text
compose.yaml → docker compose up → services start
```

Instead of running multiple `docker run` commands (backend, database, frontend), Compose defines all services in one place.

---

## Minimal Compose File

```yaml
services:
  web:
    image: nginx
    ports:
      - "8081:80"
```

---

## Run Services

```bash
docker compose up
```

### What happens

```text
network created
container created
service started
```

---

## Run in Background

```bash
docker compose up -d
```

```text
-d → detached mode (runs in background)
```

---

## Stop and Remove

```bash
docker compose down
```

### What it does

```text
stops containers
removes containers
removes network
```

---

## Multiple Services Example

```yaml
services:
  web:
    image: nginx
    ports:
      - "8081:80"

  helper:
    image: curlimages/curl
    command: sleep 300
```

### Result

```text
2 containers created
1 shared network
```

---

## Service-to-Service Communication

Inside a container:

```bash
curl http://web
```

### Why it works

```text
web = service name
↓
Docker DNS resolves it
↓
request reaches nginx container
```

### Key Rule

```text
service name = hostname
```

---

## No Need For

```text
manual IP lookup
manual network creation
```

Compose handles networking automatically.

---

## Difference from Manual Docker

```text
docker run + docker network create → manual setup
docker compose                     → automatic setup
```

---

## When to Use Compose

```text
multi-container applications
local development environments
testing service interactions
```

---

## Common Commands

```bash
docker compose up
docker compose up -d
docker compose down
docker ps
docker exec -it <container> sh
```

---

## Key Takeaways

```text
compose → manages multiple containers
automatic networking between services
service name → acts as DNS hostname
simplifies setup compared to manual docker commands
```