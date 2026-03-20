# Docker – Volumes and Bind Mounts

## Concept

Containers are ephemeral.  
Any data inside a container is lost when the container is removed.

To persist data, Docker provides:
- Volumes (Docker-managed)
- Bind Mounts (host-managed)

---

# Docker Volumes

## Concept

Volumes are managed by Docker and stored outside the container lifecycle.

They persist data even after containers are removed.

---

## Example (Docker Run)

Create volume:

```bash
docker volume create myvolume
```

Run container with volume:

```bash
docker run -it --name voltest -v myvolume:/data ubuntu bash
```

Inside container:

```bash
echo "persistent data" > /data/file.txt
cat /data/file.txt
```

---

## Verification

Remove container:

```bash
docker rm voltest
```

Recreate container:

```bash
docker run -it --name voltest -v myvolume:/data ubuntu bash
```

Check file:

```bash
cat /data/file.txt
```

---

## Compose Example

```yaml
services:
  app:
    image: ubuntu
    command: sleep 300
    volumes:
      - myvolume:/data

volumes:
  myvolume:
```

---

## Key Points

- Volume is independent of container  
- Data persists across container lifecycle  
- Managed internally by Docker  

---

# Bind Mounts

## Concept

Bind mounts connect a container directly to a directory on the host system.

Both host and container share the same files.

---

## Example

Create directory on host:

```bash
mkdir -p ~/bind-demo
cd ~/bind-demo
echo "Hello from host" > file.txt
```

Run container with bind mount:

```bash
docker run -it --name bindtest -v ~/bind-demo:/data ubuntu bash
```

---

## Verification (Inside Container)

```bash
cat /data/file.txt
```

---

## Modify from Container

```bash
echo "Changed from container" > /data/file.txt
exit
```

---

## Verify on Host

```bash
cat ~/bind-demo/file.txt
```

---

## Key Concept

host filesystem ↔ container filesystem

Changes are reflected instantly on both sides.

---

## Difference Between Volumes and Bind Mounts

### Volumes
- Managed by Docker  
- Stored internally  
- Used for persistent data (databases, storage)  
- Safer for production  

### Bind Mounts
- Uses host filesystem  
- Direct file access  
- Real-time sync  
- Used for development  

---

## Summary

volume → Docker-managed persistent storage  
bind mount → host-controlled live filesystem
