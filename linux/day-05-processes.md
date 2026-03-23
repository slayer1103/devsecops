A process is a running instance of a program.
Every command executed in Linux becomes a process managed by the kernel.

ps:
Displays processes attached to the current terminal session.
Used to view active processes quickly.

ps aux

Displays all running processes in the system.

Columns observed:
	•	USER → owner of process
	•	PID → unique identifier assigned by kernel
	•	%CPU → CPU usage
	•	%MEM → memory usage
	•	COMMAND → program being executed

Used to inspect system-wide activity.

top:
Real-time monitoring tool.
Observed:
	•	Load average (number of runnable processes over time)
	•	CPU usage breakdown (user, system, idle)
	•	Memory usage
	•	Live process consumption

Exited using q.

yes > /dev/null:
Creates a CPU-bound process by continuously writing output discarded to /dev/null.
Used to intentionally generate CPU load.

kill <PID>:
Sends a termination signal to a process.
Used to stop CPU-heavy or background processes.

Key Observations
	•	Every running program is a process.
	•	Each process has a unique PID.
	•	Load average measures demand, not percentage.
	•	CPU spikes correlate to compute-heavy processes.
	•	Killing a process immediately reduces system load.
	•	Processes form a hierarchical tree structure.

  Mistakes / Corrections
	•	Typed tap instead of top.
	•	Initially misunderstood load average as CPU percentage.
	•	Installed unrelated package before correcting command.

  What I Learned
	•	The Linux kernel schedules and manages processes.
	•	System resource usage can be monitored in real time.
	•	Process control is deliberate and reversible.
	•	Cause and effect in system load can be reproduced and observed.



