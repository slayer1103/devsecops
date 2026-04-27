# CI Debugging: nginx + Docker Routing Issue

## Problem
Pipeline failed at API validation:
- Expected: JSON
- Got: HTML

## Symptoms
- /health worked
- /api/user returned frontend HTML
- Pipeline failed at validation step

## Root Cause
nginx inside container did not include /api route

Reason:
- nginx.conf updated locally
- but container was using old config
- image rebuild/cache issue

## Debugging Steps
1. Checked CI logs → saw HTML instead of JSON
2. Verified nginx config inside container:
   docker exec -it <container> cat /etc/nginx/conf.d/default.conf
3. Found missing /api route
4. Verified backend connectivity from container
5. Fixed nginx config
6. Rebuilt image with --no-cache
7. Verified again inside container

## Fix
Added:

location /api {
    proxy_pass http://backend:6000;
}

## Key Learnings
- Local file ≠ container state
- Always verify inside container
- Logs reveal truth, not assumptions
- Routing must match system design (/api → backend)

## Final Architecture
/        → frontend
/health  → backend
/api     → backend