# Linux — Day 07: Service Binding & Port Debugging

## Concept

Services listen on network ports to accept connections.

```text
process → binds to port → enters LISTEN state → accepts connections
```

Service accessibility depends on:
- process running
- port listening
- correct network binding

---

## Step 1 — Start Service

```bash
python3 -m http.server 8000
```

---

## Step 2 — Verify Process

```bash
ps aux | grep python
```

```text
confirms server process is running
```

---

## Step 3 — Check Listening Ports

```bash
ss -tulnp | grep 8000
```

### Output

```text
0.0.0.0:8000
```

---

## Binding Explanation

```text
0.0.0.0 → listens on all network interfaces
127.0.0.1 → listens only on localhost
```

---

## Step 4 — Test Service

```bash
curl http://localhost:8000
```

```text
HTML response confirms service accessibility
```

---

## Step 5 — Bind to Localhost Only

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Check:

```bash
ss -tulnp | grep 8000
```

### Output

```text
127.0.0.1:8000
```

---

## Result

```text
service accessible only locally
not reachable externally
```

---

## Step 6 — Change Port

```bash
python3 -m http.server 9000
```

Test old port:

```bash
curl http://localhost:8000
```

### Result

```text
connection refused
```

---

## Reason

```text
no process is listening on port 8000
```

---

## Debugging Model

```text
1. is process running?
2. is port in LISTEN state?
3. is binding correct?
4. is traffic allowed (firewall/network)?
```

---

## Key Concepts

```text
LISTEN → service ready to accept connections
0.0.0.0 → all interfaces
127.0.0.1 → local only
connection refused → no listener on port
```

---

## Real-World Connections

```text
Docker port mappings
firewall rules
reverse proxies
cloud security groups
production debugging
```

---

## Key Takeaways

```text
services must bind to ports to be reachable
binding determines accessibility scope
port mismatch → connection failure
systematic debugging avoids guesswork
```