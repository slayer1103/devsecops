# Linux — Creating & Managing a Custom systemd Service

## Concept

A custom script can be managed as a background service using `systemd`.

```text
script → systemd service → supervised execution
```

This allows:
- automatic start/stop
- restart on failure
- centralized logging

---

## Step 1 — Create Script

Path:

```text
/home/slayer/hello.sh
```

Contents:

```bash
#!/bin/bash

while true
do
  echo "Service running at $(date)" >> /home/slayer/hello.log
  sleep 5
done
```

---

## Step 2 — Make Executable

```bash
chmod +x ~/hello.sh
```

---

## Step 3 — Create Service Unit File

Path:

```text
/etc/systemd/system/hello.service
```

Contents:

```ini
[Unit]
Description=Hello Test Service

[Service]
ExecStart=/home/slayer/hello.sh
Restart=always
User=slayer

[Install]
WantedBy=multi-user.target
```

---

## Step 4 — Reload systemd

```bash
sudo systemctl daemon-reload
```

```text
required after creating or modifying service files
```

---

## Step 5 — Start Service

```bash
sudo systemctl start hello
```

---

## Step 6 — Verify Status

```bash
sudo systemctl status hello
```

### Observe

```text
Active (running)
Main PID
Logs
```

---

## Step 7 — Test Restart Behavior

Kill process:

```bash
kill -9 <PID>
```

### Result

```text
new PID created
service restarted automatically
```

---

## Restart Policy

```ini
Restart=always
```

```text
ensures service restarts after crash or manual kill
```

---

## View Logs

```bash
journalctl -u hello -n 10
```

### Meaning

```text
-u → filter by service
-n 10 → show last 10 logs
```

---

## Observations

```text
logs tied to service unit
lifecycle events recorded
crashes and restarts visible
```

---

## Service Behavior

```text
runs independently of terminal
continues after logout
managed entirely by systemd
```

---

## Key Takeaways

```text
custom scripts → can become system services
systemd supervises and restarts processes
daemon-reload is mandatory after changes
journalctl provides centralized logging
services are independent of shell sessions
```

---

## Execution Flow

```text
create script
↓
create service file
↓
daemon-reload
↓
start service
↓
systemd supervises execution
↓
logs available via journalctl
```