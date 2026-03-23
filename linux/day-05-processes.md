# Linux — Day 05: Processes

## Concept

A process is a running instance of a program.

```text
command → process → managed by kernel
```

Every command executed in Linux becomes a process scheduled and controlled by the kernel.

---

## Commands Covered

### 1. `ps` — View Processes (Current Session)

```bash
ps
```

```text
shows processes attached to current terminal
```

---

### 2. `ps aux` — View All Processes

```bash
ps aux
```

```text
lists all running processes in the system
```

### Important Columns

```text
USER   → process owner
PID    → process ID
%CPU   → CPU usage
%MEM   → memory usage
COMMAND → program being executed
```

---

### 3. `top` — Real-Time Monitoring

```bash
top
```

```text
interactive view of system processes
updates in real time
```

### Observations

```text
load average → system demand over time
CPU usage    → user / system / idle
memory usage → RAM consumption
process list → live resource usage
```

Exit:

```text
press q
```

---

### 4. Generate CPU Load

```bash
yes > /dev/null
```

```text
creates continuous CPU usage
output discarded to /dev/null
used for testing system behavior
```

---

### 5. `kill` — Stop Process

```bash
kill <PID>
```

```text
sends termination signal to process
used to stop running processes
```

---

## Process Behavior

```text
each process has unique PID
processes are managed by kernel scheduler
processes can be monitored and controlled
```

---

## Key Observations

```text
every program runs as a process
load average ≠ CPU percentage
high CPU usage → compute-heavy processes
killing process reduces system load
processes form parent-child hierarchy
```

---

## Mistakes / Corrections

```text
typed "tap" instead of "top"
misunderstood load average as CPU %
installed unrelated package initially
```

---

## Key Takeaways

```text
kernel manages process lifecycle
ps → snapshot view
top → real-time monitoring
kill → process control
system behavior can be observed and reproduced
```

---

## Execution Flow

```text
run command
↓
process created
↓
monitor using ps / top
↓
generate load (yes)
↓
control using kill
```
