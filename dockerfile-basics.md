# Dockerfile – Building Custom Images

## Concept

A Dockerfile is a set of instructions used to build a Docker image.

Flow:

```text
Dockerfile → docker build → Image → docker run → Container
```

---

## Basic Example

### Create file

```bash
echo "Hello from Docker file build" > message.txt
```

---

### Dockerfile

```dockerfile
FROM ubuntu

WORKDIR /app

COPY message.txt .

CMD ["cat", "message.txt"]
```

---

### Build Image

```bash
docker build -t myapp:v1 .
```

---

### Run Container

```bash
docker run myapp:v1
```

Output:

```text
Hello from Docker file build
```

---

## Understanding Instructions

### FROM
Base image to build on.

```dockerfile
FROM ubuntu
```

---

### WORKDIR
Sets working directory inside container.

```dockerfile
WORKDIR /app
```

---

### COPY
Copies files from host into image.

```dockerfile
COPY message.txt .
```

---

### CMD
Default command executed when container starts.

```dockerfile
CMD ["cat", "message.txt"]
```

---

## Adding RUN (Installing Packages)

### Updated Dockerfile

```dockerfile
FROM ubuntu

WORKDIR /app

RUN apt update && apt install -y curl

COPY message.txt .

CMD ["cat", "message.txt"]
```

---

### Build New Image

```bash
docker build -t myapp:v2 .
```

---

### Verify

```bash
docker run -it myapp:v2 bash
```

Inside container:

```bash
curl --version
```

---

## Key Concept

```text
RUN → executes during build time
CMD → executes during container runtime
```

---

## Build vs Run

```text
docker build → creates image
docker run   → starts container
```

---

## Layer Behavior (Important)

Each Dockerfile instruction creates a layer.

Example:

```text
FROM
WORKDIR
RUN
COPY
```

During rebuild:

```text
unchanged steps → cached
changed steps → rebuilt
```

---

## Summary

```text
Dockerfile → instructions
Image      → built package
Container  → running instance

RUN → build-time changes
CMD → runtime execution
```
