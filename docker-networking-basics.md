Learned today :

docker network ls
docker network inspect
bridge / host / none
container private IP
gateway
MAC address
outbound connectivity from container
host-to-container via port mapping
container-to-container via IP
user-defined bridge network
container-name DNS on user-defined network


default docker network listing:

docker network ls.

common default networks:

bridge → default isolated container network
host   → container shares host network stack
none   → container has no normal network connectivity


Inspecting a bridge:

docker network inspect bridge

important fields:

Name
Driver
Subnet
Gateway
Containers

Example ideas:

Subnet  → Docker internal IP range
Gateway → bridge gateway on host side

Containers attached to bridge network:

docker run -d --name nettest nginx
Docker automatically attaches it to the default bridge network and assigns a private IP.

Commands used to extract selected network details:

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{.Gateway}} {{.MacAddress}}{{end}}' nettest

This prints:

container IP
Gateway
MAC address

Network Connectivity from Inside Container

entering a container:

docker exec -it nettest bash

Checking outbound traffic via :

apt update

This proves the container can access external networks through the docker bridge gateway.

Container-to-Container Communication on Default Bridge

Running second container to check:

docker run -d --name nettest2 ubuntu sleep 300

Retreiving first container IP by:

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nettest

then entering second container:

docker exec -it nettest2 bash

Installing curl and testing connectivity:

apt update
apt install -y curl
curl http://<nettest_ip>

This worked, proving containers on the same bridge network can communicate using private IP addresses.

Container name lookup on default bridge did not work.

curl http://nettest


User-Defined Bridge Network
Then created custom network by :

docker network create mynet


running first container on custom network:

docker run -d --name app1 --network mynet nginx 

Running second container on same network:

docker run -it --name app2 --network mynet ubuntu bash.

>Inside container ran below cmds:

apt update
apt install -y curl
curl http://app1

This worked because user-defined bridge networks provide built-in Docker DNS for container name resolution.

Key Difference:

>>default bridge network
→ communication by IP works
→ name-based communication is not reliable

user-defined bridge network
→ communication by IP works
→ communication by container name works





















