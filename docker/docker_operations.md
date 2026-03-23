Docker container operations

docker run -d --name test_container ubuntu sleep 300

Options: 

-d → run container in background
--name → assign container name
sleep 300 → keep container alive for 300 seconds

Verifying if running by : 

docker ps

Inspecting container metadata:

docker inspect test_container

important fields:

Container ID
Image
Network settings
IP address
Mounts
Environment variables


Executing commands inside container:

docker exec -it test_container bash

example commands:

hostname
ps aux
This shows process running inside the container.

Conatiner logs:

docker logs test_container
Logs show the stdout and stderr of the containers main process.

for following logs in real time:
docker logs -f test_container

For stopping running container we use:
docker stop test_container

Removing the container:

docker rm test_container

Removes rm test_container
Removes container metadata and writable filesystem

For verifying removal

docker ps -a




























