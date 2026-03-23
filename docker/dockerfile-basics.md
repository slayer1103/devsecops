# Dockerfile — Building Images

## Concept

A Dockerfile is a set of instructions used to build a Docker image.

```text
Dockerfile → docker build → Image → docker run → Container
```

---

## Minimal Example

### Dockerfile

```dockerfile
FROM ubuntu
CMD ["echo", "Hello from my first Docker image"]
```

---

## Build Image

```bash
docker build -t myfirstimage .
```

---

## Run Container

```bash
docker run myfirstimage
```

### Output

```text
Hello from my first Docker image
```

---

## Instructions Explained

### FROM

```dockerfile
FROM ubuntu
```

```text
base image used for building
```

---

### CMD

```dockerfile
CMD ["echo", "Hello from my first Docker image"]
```

```text
default command executed when container starts
```

---

## CMD Override

A command passed at runtime overrides the Dockerfile CMD.

```bash
docker run myfirstimage echo "Overridden command"
```

### Output

```text
Overridden command
```

```text
CMD = default, not fixed
```

---

# Example with COPY

## Step 1 — Create File

```bash
echo "This text came from a file inside the image" > message.txt
```

---

## Step 2 — Dockerfile

```dockerfile
FROM ubuntu
COPY message.txt /message.txt
CMD ["cat", "/message.txt"]
```

---

## Step 3 — Build

```bash
docker build -t myfileimage .
```

---

## Step 4 — Run

```bash
docker run myfileimage
```

### Output

```text
This text came from a file inside the image
```

---

## COPY Explained

```dockerfile
COPY message.txt /message.txt
```

```text
copies file from host → into image filesystem
```

---

## Build Context

```bash
docker build -t myfileimage .
```

```text
"." = current directory is build context
Docker can only access files inside this directory during build
```

---

## Image Layers

Check image history:

```bash
docker history myfileimage
```

```text
each Dockerfile instruction → creates a layer
image = stack of layers
```

---

## Key Takeaways

```text
Dockerfile → build instructions
FROM → base image
COPY → add files to image
CMD → default runtime command
build context → files accessible during build
image → layered structure
```
