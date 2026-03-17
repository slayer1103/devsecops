Concept:

>> Docker Compose is used to define and run multi-container applications using a single configuration file.
>> Instead of running multiple docker run commands manually:
>> Example:
>> backend
>>database
>>frontend
>>
>> Compose allows defining all services in one file:
>> compose.yaml.
>>
>> Basic Compose file:
>>
>> services:
  web:
    image: nginx
    ports:
      - "8081:80"
>> For running it:
>>
>> docker compose up
>> This will:
>> create network
>>create container
>>start service

>>Running in background:
>>docker compose up -d
>>-d detached mode (runs in background)
>>
>>Stopping and removing:
>>
>>docker compose down.
>>
>>This will:
>>stop containers
>>remove containers
>>remove network

>>Example Multiple services:
>>services:
  web:
    image: nginx
    ports:
      - "8081:80"

  helper:
    image: curlimages/curl
    command: sleep 300

    This Creates:
    2 containers
    1 shared network

  >>Service Communication
>  >Inside one container:
>  >curl http://web
>  >
>  >work because:
>  >web = service name
↓
Docker DNS resolves it
↓
request reaches nginx container .
>  >All services are connected to this network.
>  >
>  >Key rule:
>  >Service Name = hostname.
>  >
>  No Need for:
>manual IP lookup
>manual network creation

>> Difference from manual docker:
>> docker run + docker network create → manual setup ; docker compose → automatic setup

>>When to use compose :
>multi-container applications
>local development setups
>testing service interactions

>>Commands summary:
>>docker compose up
>>docker compose up -d
>>docker compose down
>>docker ps
>>docker exec -it <container> sh
>>
>>Key concepts Learned:
>>
>>multi-container management
>>automatic networking
>>service-to-service communication
>>Docker DNS








