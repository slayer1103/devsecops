A Python HTTP server was running and accessible locally, but external access from another device failed. The goal was to understand why.


We started the service by using : python3 -m http.server 8000

verified from : ss -tulnp | grep 8000

output showed: 0.0.0.0:8000
Meaning:
	•	Service is in LISTEN state.
	•	Bound to all network interfaces.

  Then We did local testing using:

  curl http://localhost:8000
  curl http://<VM IP>:8000

  VM ip is found using ip addr

  Conclusion:
	•	Application layer working.
	•	Binding layer correct.

  Then we tested from Externally

  http://<VM IP>:8000
: The connection failed.
:So the external connection were blocked.

Next we checked Firewall status.

By: sudo ufw status verbose

Observed:
	•	Status: active
	•	Default: deny (incoming)
	•	Default: allow (outgoing)

Meaning:
Incoming connections are blocked unless explicitly allowed.

Then we allowed specific port

sudo ufw allow 8000

Retested from MAC: http://<VM-IP>:8000

Service was accessible externally.

Key Concepts Learned
	1.	A service must be running and in LISTEN state.
	2.	Binding to 0.0.0.0 allows all interfaces.
	3.	Firewall rules can block inbound traffic even if service is running.
	4.	Default deny incoming blocks external access.
	5.	Allowing specific ports enables controlled exposure.
	6.	Debugging follows layered analysis:
	•	Is process running?
	•	Is port listening?
	•	Is binding correct?
	•	Is firewall blocking?

  Mental Model

Service accessibility depends on multiple layers:

Application → Process → Port → Bind Address → Firewall → Client

Failure at any layer prevents access.



