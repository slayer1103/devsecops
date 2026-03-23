# Docker Compose – Environment Variables

## Concept
Environment variables are used to pass runtime configuration into containers.

Instead of hardcoding values inside the application, values are injected at runtime.

Example:
APP_ENV=production  
DB_HOST=database  
API_KEY=xyz  

These are defined at the YAML file level.

---

## YAML Example

```yaml
services:
  app:
    image: ubuntu
    command: bash
    stdin_open: true
    tty: true
    environment:
      - APP_ENV=development
      - APP_NAME=demo_app
```

---

## Verification

Enter container:
```bash
docker exec -it <container_name> bash
```

Check variables:
```bash
env | grep APP
```

---

## Key Point
Environment variables = runtime configuration  
No need to modify image or code

---

# Docker Compose – depends_on

## Concept
depends_on is used to control the startup order of services.

---

## Problem
Some services depend on others.

Example:
Backend depends on database

If backend starts first → connection fails

---

## YAML Example

```yaml
services:
  db:
    image: nginx

  app:
    image: curlimages/curl
    command: sleep 300
    depends_on:
      - db
```

---

## Behavior

When running:
```bash
docker compose up
```

Order:
- db starts first  
- app starts after  

---

## Important Limitation

depends_on does NOT wait for service readiness  

Meaning:
Container started ≠ Service ready  

It only ensures:
Startup order

---

## Verification

Enter app container:
```bash
docker exec -it <app_container> sh
```

Test connection:
```bash
curl http://db
```

---

## Final Summary

environment → configuration  
depends_on → startup order  
