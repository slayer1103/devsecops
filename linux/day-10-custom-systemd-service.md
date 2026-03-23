Created a custom Bash script and converted it into a systemd-managed service.
Learned how systemd supervises, restarts, and logs services.


Script name: ~/hello.sh
Script contents:
#!/bin/bash
while true
do
    echo "Service running at $(date)" >> /home/slayer/hello.log
    sleep 5
done


Changed its permissions to make it executable:

chmod +x ~/hello.sh

Then We created a service unit file:
Path: /etc/systemd/system/hello.service

File contents: 

[Unit]
Description=Hello Test Service

[Service]
ExecStart=/home/slayer/hello.sh
Restart=always
User=slayer

[Install]
WantedBy=multi-user.target


Reloaded the daemon:
sudo systemctl daemon-reload

Next we started and verified the service.

sudo systemctl start hello

sudo systemctl status hello

Observed:
	•	Active (running)
	•	Main PID
	•	Logs integrated

We killed the process to check if it restarts automatically

kill -9 <PID>

Observed:
	•	New PID created
	•	Service automatically restarted

Confirmed:
	•	Restart=always works
	•	systemd supervises processes

after that we inspected the logs using:

journalctl -u hello -n 10

Learned:
	•	Logs tied to service unit
	•	Lifecycle events recorded
	•	Crashes and restarts visible


  Key Concepts Learned
	•	systemd is PID 1 and manages services.
	•	Custom scripts can be converted into persistent services.
	•	Restart policies control resilience.
	•	Services are independent of shell sessions.
	•	Logs are centralized via journalctl.
	•	daemon-reload required after modifying unit files.









