# Docker Bind Mounts

## Concept

A bind mount maps a directory from the host machine directly into a container.

```text
host path
↓
container path (mount point)
```

Changes are reflected instantly on both sides.

---

## Difference from Volumes

```text
volume     → Docker-managed storage
bind mount → direct host path mapping
```

---

## Problem

Containers are ephemeral.  
Data inside containers is lost when the container is removed.

Bind mounts solve this by using the host filesystem directly.

---

## Step 1 — Create Host Directory

```bash
mkdir -p ~/binddemo
echo "hello from host" > ~/binddemo/file.txt
cat ~/binddemo/file.txt
```

This creates data on the host system.

---

## Step 2 — Mount Host Directory into Container

```bash
docker run -it --name bindtest -v ~/binddemo:/data ubuntu bash
```

### Verify inside container

```bash
ls /data
cat /data/file.txt
```

This proves the container can read files directly from the host.

---

## Step 3 — Write from Container to Host

Inside container:

```bash
echo "written from container" > /data/from_container.txt
cat /data/from_container.txt
exit
```

On host:

```bash
ls ~/binddemo
cat ~/binddemo/from_container.txt
```

This proves files created in the container appear on the host.

---

## Step 4 — Live Sync Behavior

Run container again:

```bash
docker run -it --name bindlive -v ~/binddemo:/data ubuntu bash
```

Inside container:

```bash
cat /data/file.txt
```

From another host terminal:

```bash
echo "host changed this" > ~/binddemo/file.txt
cat ~/binddemo/file.txt
```

Back inside container:

```bash
cat /data/file.txt
```

This proves bind mounts reflect changes instantly.

---

## Step 5 — Remove Container

```bash
docker rm -f bindlive
```

Verify on host:

```bash
ls ~/binddemo
cat ~/binddemo/file.txt
cat ~/binddemo/from_container.txt
```

### Result

```text
Host files remain unchanged
```

This proves bind-mounted data belongs to the host, not the container lifecycle.

---

## Key Concept

```text
bind mount = direct live mapping of host files into container
```

---

## Use Cases

```text
local development
config files
source code sharing
real-time file updates
```

---

## Key Takeaways

```text
no data copy → same filesystem shared
changes reflect instantly (host ↔ container)
removing container does NOT delete data
bind mounts rely on host path correctness
```