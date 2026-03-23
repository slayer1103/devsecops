# Bash Scheduling Jobs — at & cron

## Concept

Task scheduling allows commands or scripts to run automatically at a specific time or repeatedly.

Two main tools:
- `at` → one-time execution
- `cron` → recurring execution

---

# 1. at — One-Time Scheduled Jobs

## Purpose

Used to execute a command once at a specific time in the future.

---

## Installation & Setup

```bash
sudo apt install at
sudo systemctl enable --now atd
```

Check service:

```bash
systemctl status atd
```

---

## Scheduling a Job

```bash
at now + 1 minute
```

Inside the prompt:

```bash
date >> /home/slayer/time.log
```

Exit and schedule:

```text
Ctrl + D
```

---

## View Scheduled Jobs

```bash
atq
```

Example output:

```text
3   Sun Mar 8 07:05:00 2026 a slayer
```

---

## Remove Scheduled Job

```bash
atrm <job_id>
```

---

## Key Takeaway

```text
at → execute command once at a specific time
```

---

# 2. cron — Repeating Scheduled Jobs

## Purpose

Used for tasks that must run regularly (e.g., backups, monitoring, reports).

---

## Manage Cron Jobs

Edit cron jobs:

```bash
crontab -e
```

View current jobs:

```bash
crontab -l
```

---

## Cron Syntax

```text
minute hour day_of_month month day_of_week command
```

---

## Example

```bash
* * * * * bash /home/slayer/system_report.sh >> /home/slayer/report.log 2>&1
```

---

## Meaning

```text
* * * * * → every minute
bash script → runs system_report.sh
>> → append output
2>&1 → capture errors in same log
```

---

## Field Breakdown

```text
minute        (0–59)
hour          (0–23)
day_of_month  (1–31)
month         (1–12)
day_of_week   (0–7) (Sunday = 0 or 7)
```

---

## Key Takeaway

```text
cron → execute commands repeatedly based on schedule
```

---

## Best Practices

- Use absolute paths  
- Specify interpreter (`bash script.sh`)  
- Redirect output to log files  
- Verify jobs using `crontab -l`  

---

## Automation Workflow

```text
write script
↓
schedule with cron / at
↓
automatic execution
↓
logs for verification
```
