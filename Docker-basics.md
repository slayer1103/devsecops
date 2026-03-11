Docker basics

Container concept:
containers provide a lightweight method of runnning applications in isolated environments.

A container includes as below:

application
dependencies
runtime environment

Containers share the host operating system kernel,making them lighter than virtual machines.

Image vs container

Image: 

read-only template
contains application + filesystem
used to create containers

Example:
ubuntu
hello-world
nginx

for listing images: 
docker images


Container:
running instance of an image.


Containers execute a process defined by the image.

Example lifecyle:

docker run ubuntu
↓
container created
↓
process runs
↓
process exits
↓
container stops

for listing running containers:

docker ps 

for listing all containers:

docker ps -a

running a container 
docker run -it ubuntu bash

options for running :

-i → interactive mode
-t → allocate terminal

This starts an ubuntu container and opens a shell inside it.

Container lifecycle:

create and running:
docker run 

restart container:
docker start <container-id>

remove container:
docker rm <container-id>

Container isolation:

containers run in isolated  environments using linux kernel features:

namespaces
cgroups

isolation includes:

filesystem
process space
network
hostname

example observation:

ls /

shows filesystem from the container image, not the host VM.


docker architecture:

docker CLI
↓
docker daemon
↓
image pulled from registry
↓
container created
↓
process executed



docker images are pulled from below when not available locally:

docker.hub 
















