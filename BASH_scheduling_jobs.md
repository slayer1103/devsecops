1. at — One-time scheduled jobs

Used to execute a command once at a specific time in the future.
Install and enable service:

sudo apt install at
sudo systemctl enable --now atd

Check Service: 
systemctl status atd

Schedule a Job:

at now + 1 minute

inside at prompt:
date >> /home/slayer/time.log
after that ctrl+D to exit and schedule one time job.

view scheduled jobs:

"atq"

Example output:

3   Sun Mar 8 07:05:00 2026 a slayer

Remove a schduled job: 

atrm <jobid>

Key-ID: 

at → run command once later

2. cron — Repeating scheduled jobs

Used for tasks that must run regularly or repeatedly.

edit cron job:

crontab -e

view current cron jobs:

crontab -l

cron system format: 

minute hour day_of_month month day_of_week command

example: 
* * * * * bash /home/slayer/system_report.sh >> /home/slayer/report.log 2>&1

Meaning: 
run system_report.sh every minute
append output to report.log
capture errors as well

cron field order: 

minute hour day_of_month month day_of_week

Key Idea: 

cron → run commands repeatedly based on schedule


Best practice:

use absolute paths
specify interpreter (bash / script.sh)
redirect output to log files
verify jobs with crontab -l

Automation Workflow:

write script
↓
schedule with cron or at
↓
automatic execution
↓
output stored in logs




















