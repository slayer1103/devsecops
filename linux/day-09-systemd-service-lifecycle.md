# Linux — systemd & Service Lifecycle Management

## Concept

`systemd` is the init system responsible for managing services and processes on Linux.

```text
systemd (PID 1) → manages all services and processes
```

---

## Verify Init System

```bash
ps -p 1 -o comm=
```

### Output

```text
systemd
```

### Meaning

```text
PID 1 → first process started by kernel
systemd → root of process tree
controls all services
```

---

## List Running Services

```bash
systemctl list-units --type=service
```

### Example Services

```text
cron
dbus
systemd-journald
```

### Meaning

```text
services = background processes (daemons)
managed by systemd
```

---

## Inspect a Service

```bash
systemctl status cron
```

### Observe

```text
Active state (active / inactive / failed)
Main PID
Uptime
Recent logs
```

### Mapping

```text
Service → Process → Logs
```

---

## Start and Stop Services

```bash
sudo systemctl stop cron
sudo systemctl start cron
```

### Key Point

```text
stop/start → affects runtime only
does NOT persist across reboot
```

---

## Start vs Enable

```text
start  → run service immediately
enable → start automatically at boot
```

---

## View Logs (journalctl)

```bash
journalctl -u cron --no-pager
```

### Meaning

```text
-u → filter by service
--no-pager → print directly
```

---

## View Recent Logs

```bash
journalctl -u cron -n 10
```

### Observations

```text
service stop events
service start events
lifecycle-related logs
```

---

## Debugging Workflow

If a service fails:

```text
1. systemctl status <service>
2. check state and exit code
3. inspect logs using journalctl
4. identify root cause
5. fix issue (do not blindly restart)
```

---

## Key Takeaways

```text
systemd → PID 1 (service manager)
systemctl → control services
journalctl → view logs
active ≠ enabled
logs are essential for debugging
```
