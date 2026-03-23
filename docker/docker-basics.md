# Docker Basics

## Concept

Containers provide a lightweight way to run applications in isolated environments.

A container includes:

```text
application
dependencies
runtime environment
```

Containers share the host OS kernel, making them lighter than virtual machines.

---

## Image vs Container

### Image

```text
read-only template
contains application + filesystem
used to create containers
```

Examples:

```text
ubuntu
nginx
hello-world
```

List images:

```bash
docker images
```

---

### Container

```text
running instance of an image
```

Containers execute a process defined by the image.

---

## Container Lifecycle Example

```bash
docker run ubuntu
```

Flow:

```text
container created
↓
process runs
↓
process exits
↓
container stops
```

---

## Listing Containers

Running containers:

```bash
docker ps
```

All containers:

```bash
docker ps -a
```

---

## Running a Container with Shell

```bash
docker run -it ubuntu bash
```

### Options

```text
-i → interactive mode
-t → allocate terminal
```

This starts an Ubuntu container and opens a shell.

---

## Container Lifecycle Commands

Create and run:

```bash
docker run
```

Start existing container:

```bash
docker start <container_id>
```

Remove container:

```bash
docker rm <container_id>
```

---

## Container Isolation

Containers run in isolated environments using Linux kernel features:

```text
namespaces
cgroups
```

Isolation includes:

```text
filesystem
process space
network
hostname
```

---

## Example Observation

```bash
ls /
```

This shows the container filesystem, not the host system.

---

## Docker Architecture

```text
Docker CLI
↓
Docker Daemon
↓
Image pulled from registry
↓
Container created
↓
Process executed
```

---

## Image Source

If an image is not available locally, Docker pulls it from:

```text
Docker Hub (docker.io)
```

---

## Key Takeaways

```text
image → blueprint
container → running instance
containers are lightweight (shared kernel)
isolation is provided via namespaces and cgroups
docker CLI interacts with daemon to manage containers
```