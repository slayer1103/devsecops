Started a simple Python HTTP server and investigated how services bind to ports and become reachable.

python3 -m http.server 8000

Verified running process via : ps aux | grep python

Checked Listening ports: ss -tulnp | grep 8000

observed : 0.0.0.0:8000
Meaning:
	•	Service was listening on port 8000.
	•	Bound to all network interfaces.

We Tested Locally by: curl http://localhost:8000
It retunrned html response, confirming service accesssibility.

Next we checked binding behaviour restarted server with : 
python3 -m http.server 8000 --bind 127.0.0.1

observed: 
127.0.0.1:8000

Meaning:
	•	Service accessible only from local machine.
	•	Not reachable externally.

  Then we checked starting server on different port: 
  python3 -m http.server 9000

  Then Tested: 
  curl http://localhost:8000

  Result connection refused.
Conclusion: 
No process was listening on port 8000.

Key Concepts Learned
	•	A service must be in LISTEN state to accept connections.
	•	0.0.0.0 means listen on all interfaces.
	•	127.0.0.1 means listen only locally.
	•	If no process listens on a port, connection is refused.
	•	Service reachability troubleshooting follows layered checks:
	1.	Is process running?
	2.	Is port listening?
	3.	Is binding correct?
	4.	Is traffic allowed?

What This Connects To
	•	Docker port mappings
	•	Firewall rules
	•	Reverse proxies
	•	Cloud security groups
	•	Real-world service debugging


  
