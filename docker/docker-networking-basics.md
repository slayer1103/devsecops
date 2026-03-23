# Docker Networking Basics

## Concept

Docker networking enables communication between:

```text
container ↔ internet
container ↔ host
container ↔ container
```

Each container gets its own network namespace with:

```text
IP address
MAC address
network interface
```

---

## Docker Network Types

List networks:

```bash
docker network ls
```

### Default Networks

```text
bridge → default isolated network
host   → container uses host network stack
none   → no network connectivity
```

---

## Inspecting a Network

```bash
docker network inspect bridge
```

Important fields:

```text
Name
Driver
Subnet
Gateway
Containers
```

---

## Key Concepts

```text
Subnet  → Docker internal IP range
Gateway → bridge interface on host
```

---

## Running a Container

```bash
docker run -d --name nettest nginx
```

Docker automatically:

```text
attaches container to bridge network
assigns private IP
```

---

## Extract Network Details

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{.Gateway}} {{.MacAddress}}{{end}}' nettest
```

Output:

```text
IP Address
Gateway
MAC Address
```

---

## Outbound Connectivity

Enter container:

```bash
docker exec -it nettest bash
```

Test:

```bash
apt update
```

### Result

```text
container can access internet via Docker gateway
```

---

## Container-to-Container (Default Bridge)

Run second container:

```bash
docker run -d --name nettest2 ubuntu sleep 300
```

Get IP of first container:

```bash
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nettest
```

Enter second container:

```bash
docker exec -it nettest2 bash
```

Install curl:

```bash
apt update
apt install -y curl
```

Test connection:

```bash
curl http://<nettest_ip>
```

### Result

```text
communication works via IP
```

---

## Limitation of Default Bridge

```bash
curl http://nettest
```

### Result

```text
fails (no DNS resolution)
```

---

## User-Defined Bridge Network

Create network:

```bash
docker network create mynet
```

Run containers:

```bash
docker run -d --name app1 --network mynet nginx
docker run -it --name app2 --network mynet ubuntu bash
```

Inside second container:

```bash
apt update
apt install -y curl
curl http://app1
```

### Result

```text
works using container name
```

---

## Key Difference

### Default Bridge

```text
IP communication → works
name-based communication → not reliable
```

---

### User-Defined Bridge

```text
IP communication → works
name-based communication → works (Docker DNS)
```

---

## Key Takeaways

```text
containers get private IPs
default bridge → no DNS-based discovery
user-defined network → built-in DNS
gateway enables outbound traffic
network inspect helps debug networking
```
