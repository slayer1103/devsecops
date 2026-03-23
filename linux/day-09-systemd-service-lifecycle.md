ps -p 1 -o comm=

its output showed : systemd

Meaning:
	•	systemd is PID 1.
	•	It is the root of the process tree.
	•	It manages all other services.

Next we checked the running services:

systemctl list-units --type=service

displays active services such as : 

cron 
dbus
systemmd-journald

These are background processes (daemons)

after that we inspected a service name cron by

systemctl status cron

Observed:
	•	Active state (active / inactive / failed)
	•	Main PID
	•	Uptime
	•	Recent log entries

This connects:
Service → Process → Logs


then we stopped it and started it again by 

sudo systemctl stop cron
sudo systemctl start cron

stop affects runtime state only
service can be restarted manually.

Then we learnt difference between enable and start.

We understood:

•	start → runs now.
	•	enable → starts automatically at boot.

Next we learnt about viewing service logs like event viewer from windows.

journalctl -u cron --no-pager

Meaning:

-u -> filter by service.
--no-pager -> print directly to terminal

To view recent logs:

journalctl -u cron -n 10

oberserved

service stop event 
service start event 
Log entries tied to lifecycle changes.

Key Concepts Learned
	•	systemd is PID 1 and manages all services.
	•	Services are controlled via systemctl.
	•	Active ≠ Enabled.
	•	Logs are accessible through journalctl.
	•	Service failures should be diagnosed via:
	•	Exit code
	•	Log messages

Debugging Model

If a service fails:
	1.	systemctl status <service>
	2.	Check exit code / result.
	3.	Inspect recent logs via journalctl.
	4.	Fix root cause instead of blindly restarting.
















