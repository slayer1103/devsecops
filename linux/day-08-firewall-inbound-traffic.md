# Linux — Day 08: Firewall & Inbound Traffic

## Concept

Even if a service is running and listening on a port, external access can still be blocked by firewall rules.

```text
process → port → bind → firewall → access
```

---

## Step 1 — Start Service

```bash
python3 -m http.server 8000
```

---

## Step 2 — Verify Service

```bash
ss -tulnp | grep 8000
```

### Output

```text
0.0.0.0:8000
```

### Meaning

```text
LISTEN state → service ready
0.0.0.0 → bound to all interfaces
```

---

## Step 3 — Local Testing

```bash
curl http://localhost:8000
curl http://<VM-IP>:8000
```

Get IP:

```bash
ip addr
```

### Result

```text
service accessible locally
```

---

## Step 4 — External Testing

From another machine:

```text
http://<VM-IP>:8000
```

### Result

```text
connection failed
```

---

## Analysis

```text
application layer → working
binding → correct
issue → external access blocked
```

---

## Step 5 — Check Firewall

```bash
sudo ufw status verbose
```

### Observed

```text
Status: active
Default: deny (incoming)
Default: allow (outgoing)
```

---

## Firewall Behavior

```text
incoming traffic blocked by default
only allowed ports are accessible
```

---

## Step 6 — Allow Port

```bash
sudo ufw allow 8000
```

---

## Step 7 — Retest

From external machine:

```text
http://<VM-IP>:8000
```

### Result

```text
service accessible externally
```

---

## Debugging Model

```text
1. is process running?
2. is port in LISTEN state?
3. is binding correct?
4. is firewall allowing traffic?
```

---

## Key Concepts

```text
LISTEN → service ready
0.0.0.0 → all interfaces
firewall → controls inbound access
default deny → blocks external connections
```

---

## Mental Model

```text
Application → Process → Port → Bind Address → Firewall → Client
```

---

## Key Takeaways

```text
service must pass all layers to be accessible
firewall can block traffic even if service is running
explicit rules are required to allow inbound access
systematic debugging avoids guesswork
```