Concept:

>> Docker Compose is used to define and run multi-container applications using a single configuration file.
>> Instead of running multiple docker run commands manually:
>> Example:
>> backend
>>database
>>frontend
>>
>> Compose allows defining all services in one file:
>> compose.yaml.
>>
>> Basic Compose file:
>>
>> services:
  web:
    image: nginx
    ports:
      - "8081:80"
>> For running it:
>>
>> docker compose up
>> This will:
>> create network
>>create container
>>start service

>>Running in background:
>>docker compose up -d
>>-d detached mode (runs in background)
>>
>>Stopping and removing:
>>
>>docker compose down.
>>
>>This will:
>>stop containers
>>remove containers
>>remove network

>>Example Multiple services:
>>services:
  web:
    image: nginx
    ports:
      - "8081:80"

  helper:
    image: curlimages/curl
    command: sleep 300

    This Creates:
    2 containers
    1 shared network

  >>Service Communication
>  >Inside one container:
>  >curl http://web
>  >
>  >work because:
>  >web = service name
↓
Docker DNS resolves it
↓
request reaches nginx container .
>  >All services are connected to this network.
>  >
>  >Key rule:
>  >Service Name = hostname.
>  >
>  No Need for:
>manual IP lookup
>manual network creation

>> Difference from manual docker:
>> docker run + docker network create → manual setup ; docker compose → automatic setup

>>When to use compose :
>multi-container applications
>local development setups
>testing service interactions

>>Commands summary:
>>docker compose up
>>docker compose up -d
>>docker compose down
>>docker ps
>>docker exec -it <container> sh
>>
>>Key concepts Learned:
>>
>>multi-container management
>>automatic networking
>>service-to-service communication
>>Docker DNS









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