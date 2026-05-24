# Kubernetes Foundations

## Environment Setup

Installed:

```bash
brew install kind
brew install kubectl
```

Verified:

```bash
kind --version
kubectl version --client
```

---

## Kubernetes Cluster Creation

Created local Kubernetes cluster using kind:

```bash
kind create cluster --name devsecops-lab
```

Verified cluster status:

```bash
kubectl get nodes
```

Observed:

```text
STATUS = Ready
```

---

## Understanding kind

kind creates:

```text
Kubernetes nodes running inside Docker containers
```

This provides a lightweight local Kubernetes environment for learning and testing.

---

## First Kubernetes Pod

Created `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: nginx-pod

spec:
  containers:
    - name: nginx
      image: nginx:latest

      ports:
        - containerPort: 80
```

Applied Pod:

```bash
kubectl apply -f pod.yaml
```

---

## Pod Lifecycle Observation

Verified Pod:

```bash
kubectl get pods
```

Observed states:

```text
ContainerCreating
Running
```

Inspected Pod details:

```bash
kubectl describe pod nginx-pod
```

Observed:
- image information
- assigned node
- events
- container state
- Pod IP

---

## Pod Deletion Test

Deleted Pod manually:

```bash
kubectl delete pod nginx-pod
```

Verified:

```bash
kubectl get pods
```

Observed:

```text
No resources found
```

---

## Key Learning

Standalone Pods are:

```text
ephemeral workloads
```

Deleting a manually created Pod does NOT trigger automatic recovery.

Reason:
- no Deployment exists
- no ReplicaSet exists
- no controller maintains desired state

---

## Important Realization

Kubernetes only recreates workloads automatically when a higher-level controller exists.

Examples:
- Deployment
- ReplicaSet
- StatefulSet

Without those controllers:

```text
desired state = no Pod
```

after deletion.

---

## Operational Limitation of Standalone Pods

Manually managed Pods are unsuitable for production because they lack:
- self-healing
- rollout coordination
- scaling abstraction
- replica management
- desired-state enforcement

---

## Concept Mapping

| Kubernetes Object | Purpose |
|---|---|
| Pod | Running workload |
| Deployment | Desired-state manager |
| Service | Stable networking layer |

---

## Next Step

Learn:
- Deployment
- ReplicaSet
- self-healing behavior
- desired-state reconciliation

---

## Deployment and ReplicaSet

Created `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  replicas: 2

  selector:
    matchLabels:
      app: nginx

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
        - name: nginx
          image: nginx:latest

          ports:
            - containerPort: 80
```

Applied Deployment:

```bash
kubectl apply -f deployment.yaml
```

Verified:

```bash
kubectl get deployments
kubectl get pods
```

Observed:

```text
READY 2/2
AVAILABLE 2
```

---

## Self-Healing Demonstration

Deleted one Pod managed by the Deployment:

```bash
kubectl delete pod <pod-name>
```

Observed:

```text
Old Pod terminated
New Pod created automatically
```

Important observation:

```text
The deleted Pod was not restarted.
A completely new Pod was created.
```

The replacement Pod received:
- a new Pod name
- a new lifecycle
- a new IP address

---

## Desired State Reconciliation

Deployment maintained:

```text
Desired Replicas = 2
```

After Pod deletion:

```text
Actual Replicas = 1
```

ReplicaSet detected the mismatch and automatically created a replacement Pod.

This behavior is called:

```text
Desired-State Reconciliation
```

---

## Service Creation

Created `service.yaml`:

```yaml
apiVersion: v1
kind: Service

metadata:
  name: nginx-service

spec:
  selector:
    app: nginx

  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

  type: ClusterIP
```

Applied Service:

```bash
kubectl apply -f service.yaml
```

Verified:

```bash
kubectl get svc
kubectl get endpoints
```

---

## Endpoint Update Observation

Initial endpoints:

```text
10.244.0.5:80
10.244.0.6:80
```

After deleting one Pod:

```text
10.244.0.6:80
10.244.0.7:80
```

Observed:
- old Pod IP disappeared
- new Pod received a different IP
- Service updated endpoints automatically

No Service modification was required.

---

## Labels and Selectors

Pods created by the Deployment contained:

```yaml
labels:
  app: nginx
```

Service used:

```yaml
selector:
  app: nginx
```

This allowed Kubernetes to automatically discover matching Pods.

---

## Key Learning

```text
Pods are temporary.
Services are stable.
```

Applications should connect to Services, not directly to Pod IP addresses.

Reason:
- Pod IPs change
- Pod names change
- Pods can be replaced at any time
- Service remains stable

---

## Architecture Flow

```text
Deployment
    ↓
ReplicaSet
    ↓
Pods

Service
    ↓
Endpoints
    ↓
Pods
```

---

## Session Summary

Learned:
- Deployment
- ReplicaSet
- desired-state reconciliation
- self-healing
- Service
- Endpoints
- labels and selectors
- stable networking abstraction

Verified practically that Kubernetes maintains application availability by replacing failed Pods and updating Service endpoints automatically.

---

## Ingress Controller Installation

Installed NGINX Ingress Controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Verified controller status:

```bash
kubectl get pods -n ingress-nginx
```

Observed:

```text
ingress-nginx-controller
STATUS = Running
READY = 1/1
```

Waited for controller readiness:

```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

Observed:

```text
condition met
```

---

## Understanding Ingress

Ingress provides:

```text
External routing rules
```

Ingress Controller provides:

```text
Execution of routing rules
```

Relationship:

```text
Ingress Resource = Routing Configuration
Ingress Controller = Component Processing Requests
```

---

## Ingress Resource Creation

Created `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress

metadata:
  name: nginx-ingress

spec:
  ingressClassName: nginx

  rules:
    - host: nginx.local

      http:
        paths:
          - path: /
            pathType: Prefix

            backend:
              service:
                name: nginx-service

                port:
                  number: 80
```

Applied:

```bash
kubectl apply -f ingress.yaml
```

Verified:

```bash
kubectl get ingress
kubectl describe ingress nginx-ingress
```

---

## Ingress Routing Observation

Ingress rule:

```text
Host: nginx.local
Path: /
Backend: nginx-service:80
```

Observed backend endpoints:

```text
10.244.0.3:80
10.244.0.6:80
```

This confirmed:

```text
Ingress -> Service -> Endpoints -> Pods
```

---

## Endpoint Update Through Ingress

Deleted one Deployment-managed Pod:

```bash
kubectl delete pod <pod-name>
```

Observed:

Before replacement:

```text
10.244.0.3:80
10.244.0.6:80
```

After replacement:

```text
10.244.0.3:80
10.244.0.10:80
```

Findings:

- deleted Pod IP disappeared
- replacement Pod received a new IP
- Service updated endpoints automatically
- Ingress immediately reflected updated endpoints
- no configuration changes were required

---

## Kubernetes Networking Stack

Architecture built during the lab:

```text
Browser
    ↓
Ingress Controller
    ↓
Ingress Rule
    ↓
Service
    ↓
Endpoints
    ↓
Pods
```

---

## Comparison With Docker Compose

Docker Compose:

```text
Browser
    ↓
Nginx Reverse Proxy
    ↓
Backend Container
```

Kubernetes:

```text
Browser
    ↓
Ingress Controller
    ↓
Service
    ↓
Pods
```

Core networking concept remains the same:

```text
Entry Point
    ↓
Routing Layer
    ↓
Application Workloads
```

---

## Key Learning

```text
Deployment maintains replica count.
Service maintains stable networking.
Ingress maintains external routing.
```

Together they provide:

- self-healing
- service discovery
- endpoint management
- external traffic routing
- application availability

---

## Session Summary

Learned:

- Ingress Controller
- Ingress Resource
- external traffic routing
- Service to Ingress integration
- dynamic endpoint updates
- complete Kubernetes networking path

Verified practically that Pod replacement automatically updates Service endpoints and that Ingress continues routing traffic without manual intervention.
