Concept 

>> A dockerfile is a blueprint used to build a docker image.

Flow:
>>Dockerfile
↓
docker build
↓
image created
↓
docker run
↓
container starts

First dockerfile example:

>Created a file named dockerfile:
>>FROM ubuntu
>>CMD ["echo", "Hello from my first Docker image"]

Build image:

>> docker build -t myfirstimage .

Run image:
docker run myfirstimage

Output:

Hello from my first Docker image

>>Meaning of FROM

>FROM Ubuntu
FROM defines the base image used to build the new image.

Meaning :
start building from Ubuntu image

>>Meaning of CMD

>CMD ["echo", "Hello from my first Docker image"]
CMD defines the default command run when the container starts.

Example:
docker run myfirstimage
;uses the Dockerfile CMD

>>Overring CMD
A command passed in docker run overrides the Dockerfile CMD.

Example:
docker run myfirstimage echo "Overridden command"

Output:
Overridden command

So: 
CMD= default, not fixed.


>>Second Dockerfile Example with COPY

Create a file:
echo "This text came from a file inside the image" > message.txt

Update Dockerfile:
FROM ubuntu
COPY message.txt /message.txt
CMD ["cat", "/message.txt"]

Build:
docker build -t myfileimage .

Run:

docker run myfileimage

Output is the file content copied into the image.

>>Meaning of COPY

COPY message.txt /message.txt

Meaning:

copy message.txt from build context
into the image at /message.txt

Build Context:

command used:
docker build -t myfileimage .

the "." Means:

current directory is the build context

Docker can access files from that directory during build.

>>Image layers:

Inspect Image history:

"docker history myfileimage"

This shows that images are built in layers based on dockerfile instructions.

Key idea:

image = layered build result

>>Key concept learned

FROM = base image
COPY = put files into image
CMD  = default startup command

