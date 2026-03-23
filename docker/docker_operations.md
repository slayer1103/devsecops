# Docker — Container Operations

## Concept

Docker containers are running instances of images. Container operations involve creating, inspecting, interacting with, and removing these instances.

```text
docker run → container created → process runs → lifecycle managed
```

---

## Run Container

```bash
docker run -d --name test_container ubuntu sleep 300
```

### Options

```text
-d        → run container in background (detached)
--name    → assign human-readable container name
sleep 300 → keeps container alive for 300 seconds
```

---

## Verify Running Containers

```bash
docker ps
```

```text
shows currently running containers
```

---

## Inspect Container

```bash
docker inspect test_container
```

### Important Fields

```text
Container ID
Image
Network settings
IP address
Mounts
Environment variables
```

---

## Execute Commands Inside Container

```bash
docker exec -it test_container bash
```

### Example Commands

```bash
hostname
ps aux
```

```text
shows container hostname and running processes
```

---

## View Container Logs

```bash
docker logs test_container
```

```text
shows stdout and stderr of main container process
```

---

## Follow Logs in Real Time

```bash
docker logs -f test_container
```

---

## Stop Container

```bash
docker stop test_container
```

```text
gracefully stops running container
```

---

## Remove Container

```bash
docker rm test_container
```

```text
removes container metadata and writable layer
container must be stopped before removal
```

---

## Verify Removal

```bash
docker ps -a
```

```text
container should not appear in list
```

---

## Key Takeaways

```text
docker run → create + start container
docker ps → check running containers
docker exec → interact with container
docker logs → debug container behavior
docker stop → stop execution
docker rm → remove container completely
```

---

## Execution Flow

```text
run container
↓
verify using docker ps
↓
inspect / exec / logs
↓
stop container
↓
remove container
``` 