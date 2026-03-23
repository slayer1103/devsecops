# Docker Volumes

## Concept

Containers are ephemeral.

Any data written inside a container’s writable layer is lost when the container is removed.

Docker volumes provide persistent storage outside the container lifecycle.

---

## Problem

Data inside containers does not persist after deletion.

---

## Demonstration (Data Loss)

### Step 1 — Create container

```bash
docker run -d --name voltest ubuntu sleep 300
```

### Step 2 — Write data

```bash
docker exec -it voltest bash
echo "hello from container" > /data.txt
cat /data.txt
exit
```

### Step 3 — Remove container

```bash
docker rm -f voltest
```

### Step 4 — Recreate container

```bash
docker run -d --name voltest ubuntu sleep 300
docker exec -it voltest bash
cat /data.txt
```

### Result

```text
File does not exist
```

This proves container data is ephemeral.

---

## Solution — Docker Volumes

### Create a volume

```bash
docker volume create mydata
```

List volumes:

```bash
docker volume ls
```

---

## Mount Volume to Container

```bash
docker run -d --name voltest -v mydata:/data ubuntu sleep 300
```

### Meaning

```text
mydata → Docker-managed volume
/data  → path inside container
```

---

## Write Data to Volume

```bash
docker exec -it voltest bash
echo "persistent file" > /data/test.txt
cat /data/test.txt
exit
```

---

## Verify Persistence

### Remove container

```bash
docker rm -f voltest
```

### Start new container

```bash
docker run -d --name voltest2 -v mydata:/data ubuntu sleep 300
```

### Check file

```bash
docker exec -it voltest2 bash
cat /data/test.txt
```

### Result

```text
File exists
```

This proves volume data persists across container lifecycle.

---

## Understanding `docker rm -f`

```text
-f → force remove
```

Behavior:

```text
running container → stop + remove
stopped container → remove
```

---

## Inspect Volume

```bash
docker volume inspect mydata
```

Important fields:

```text
Name
Driver
Mountpoint
```

Mountpoint shows where data is stored on host.

---

## Key Takeaways

```text
container lifecycle ≠ volume lifecycle
volumes persist data
containers are disposable
```