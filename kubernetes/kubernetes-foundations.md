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

---

## Persistent Volumes and Persistent Volume Claims

### Problem Statement

Pods are ephemeral.

When a Pod is deleted:

```text
Pod deleted
    ↓
Container deleted
```

Data stored inside the container filesystem is lost.

This behavior is unsuitable for stateful applications such as:

- PostgreSQL
- MySQL
- MongoDB
- Jenkins

These applications require storage that survives Pod replacement.

---

## Persistent Volume (PV)

Created `pv.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolume

metadata:
  name: demo-pv

spec:
  capacity:
    storage: 1Gi

  accessModes:
    - ReadWriteOnce

  hostPath:
    path: /tmp/demo-pv
```

Applied:

```bash
kubectl apply -f pv.yaml
```

Verified:

```bash
kubectl get pv
```

Initial status:

```text
STATUS = Available
```

---

## Persistent Volume Claim (PVC)

Created `pvc.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim

metadata:
  name: demo-pvc

spec:
  storageClassName: ""

  accessModes:
    - ReadWriteOnce

  resources:
    requests:
      storage: 1Gi
```

Applied:

```bash
kubectl apply -f pvc.yaml
```

Verified:

```bash
kubectl get pvc
kubectl get pv
```

Final status:

```text
PV  = Bound
PVC = Bound
```

---

## StorageClass Troubleshooting

Initial observation:

```text
PV  = Available
PVC = Pending
```

Cause:

```text
PVC requested default StorageClass
PV had no StorageClass configured
```

Resolution:

```yaml
storageClassName: ""
```

Deleted and recreated PVC.

Result:

```text
PV  = Bound
PVC = Bound
```

---

## Understanding PV and PVC

Persistent Volume:

```text
Actual storage resource
```

Persistent Volume Claim:

```text
Request for storage
```

Relationship:

```text
Pod
 ↓
PVC
 ↓
PV
```

---

## Persistent Storage Pod

Created `pvc-pod.yaml`:

```yaml
apiVersion: v1
kind: Pod

metadata:
  name: pvc-demo

spec:
  containers:
    - name: busybox
      image: busybox:1.35

      command:
        - sh
        - -c
        - sleep 3600

      volumeMounts:
        - name: persistent-storage
          mountPath: /data

  volumes:
    - name: persistent-storage
      persistentVolumeClaim:
        claimName: demo-pvc
```

Applied:

```bash
kubectl apply -f pvc-pod.yaml
```

---

## Persistence Verification

Created file:

```bash
echo "persistent data" > /data/test.txt
```

Verified:

```bash
cat /data/test.txt
```

Output:

```text
persistent data
```

Deleted Pod:

```bash
kubectl delete pod pvc-demo
```

Recreated Pod:

```bash
kubectl apply -f pvc-pod.yaml
```

Verified file again:

```bash
cat /data/test.txt
```

Output:

```text
persistent data
```

The file survived Pod replacement.

---

## Storage Comparison

Container Filesystem:

```text
Delete Container
    ↓
Data Lost
```

emptyDir:

```text
Delete Pod
    ↓
Data Lost
```

Persistent Volume:

```text
Delete Pod
    ↓
Data Survives
```

---

## Key Learning

Pods are temporary.

Persistent Volumes are not.

Kubernetes separates:

```text
Compute
```

from:

```text
Storage
```

allowing applications to survive Pod replacement without losing data.

---

## Session Summary

Learned:

- Persistent Volume (PV)
- Persistent Volume Claim (PVC)
- StorageClass troubleshooting
- PV/PVC binding process
- Persistent storage architecture
- Pod-independent storage lifecycle

Verified practically that data survives Pod deletion when stored through a Persistent Volume Claim.

---

## Rolling Updates

### Objective

Update a running application without deleting all Pods simultaneously and causing downtime.

---

## Current Deployment Verification

Verified existing Deployment:

```bash
kubectl get deployment nginx-deployment
kubectl get pods
```

Observed:

```text
READY = 2/2
AVAILABLE = 2
```

Two Pods were running and serving traffic.

---

## Rollout Status Check

Verified Deployment health:

```bash
kubectl rollout status deployment/nginx-deployment
```

Observed:

```text
deployment "nginx-deployment" successfully rolled out
```

---

## Image Update

Updated Deployment image:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.25
```

Observed:

```text
deployment.apps/nginx-deployment image updated
```

---

## Watching the Rolling Update

Monitored Pods in real time:

```bash
kubectl get pods -w
```

Observed sequence:

```text
New Pod created
    ↓
ContainerCreating
    ↓
Running
    ↓
Old Pod terminating
```

Additional observations:

```text
Pending
ContainerCreating
Running
Terminating
Completed
```

Kubernetes gradually replaced old Pods with new Pods.

---

## ReplicaSet Observation

Old Pods:

```text
nginx-deployment-59f86b59ff-*
```

New Pods:

```text
nginx-deployment-5fd577784b-*
```

The ReplicaSet hash changed.

This indicates:

```text
New ReplicaSet created
Old ReplicaSet scaled down
New ReplicaSet scaled up
```

---

## Final Verification

Verified final state:

```bash
kubectl get pods
kubectl rollout status deployment/nginx-deployment
```

Observed:

```text
2/2 Pods Running
Deployment successfully rolled out
```

New Pods:

```text
nginx-deployment-5fd577784b-spzqq
nginx-deployment-5fd577784b-wrrf6
```

Old Pods were removed.

---

## Rolling Update Workflow

```text
Deployment
      ↓
Create New ReplicaSet
      ↓
Create New Pod
      ↓
Wait Until Ready
      ↓
Terminate Old Pod
      ↓
Repeat Until Complete
```

---

## Key Learning

Kubernetes does not update Pods in place.

Instead:

```text
Old ReplicaSet
      ↓
Scaled Down

New ReplicaSet
      ↓
Scaled Up
```

This allows application upgrades with minimal or no downtime.

---

## Session Summary

Learned:

- Rolling Updates
- Deployment image updates
- Real-time rollout monitoring
- ReplicaSet replacement strategy
- Zero/minimal downtime deployment concept

Verified practically that Kubernetes replaces application Pods gradually while maintaining service availability.

---

## Helm Fundamentals

### Objective

Understand how Helm simplifies Kubernetes application deployment by packaging multiple Kubernetes resources into reusable charts.

---

## What Problem Helm Solves

Without Helm, deploying an application often requires manually creating:

- Deployment
- Service
- ConfigMap
- Secret
- Ingress
- PersistentVolumeClaim
- RBAC resources

This results in multiple YAML files that must be maintained separately.

Helm packages these resources into a reusable application bundle called a Chart.

---

## Core Concepts

### Chart

A Chart is a packaged Kubernetes application.

Examples:

- bitnami/nginx
- bitnami/postgresql
- bitnami/jenkins
- bitnami/grafana

A Chart contains Kubernetes templates and default configuration values.

---

### Release

A Release is a deployed instance of a Chart.

Example:

```text
Chart: bitnami/nginx
Release: my-nginx
```

The same Chart can be installed multiple times using different release names.

---

## Verify Helm Installation

Verified Helm installation:

```bash
helm version
```

Helm was already installed and operational.

---

## Repository Configuration

Added Bitnami repository:

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
```

Updated repositories:

```bash
helm repo update
```

Observed:

```text
Successfully got an update from the "bitnami" chart repository
```

---

## Searching Charts

Searched for nginx charts:

```bash
helm search repo nginx
```

Observed nginx-related charts available in the repository.

Important fields:

```text
Chart Version
App Version
```

Example:

```text
Chart Version = Helm package version
App Version   = Actual application version
```

---

## Installing First Helm Release

Installed nginx:

```bash
helm install my-nginx bitnami/nginx
```

Where:

```text
my-nginx      = Release Name
bitnami/nginx = Chart
```

Observed:

```text
STATUS = deployed
```

---

## Verification

Checked installed releases:

```bash
helm list
```

Observed:

```text
NAME      NAMESPACE STATUS
my-nginx  default   deployed
```

---

## Kubernetes Resources Created

Verified:

```bash
kubectl get all
```

Helm automatically created:

```text
Deployment
ReplicaSet
Pod
Service
```

without manually writing Kubernetes YAML manifests.

---

## Useful Helm Commands

View release status:

```bash
helm status my-nginx
```

View custom values:

```bash
helm get values my-nginx
```

Upgrade release:

```bash
helm upgrade my-nginx bitnami/nginx
```

Rollback release:

```bash
helm rollback my-nginx 1
```

Remove release:

```bash
helm uninstall my-nginx
```

---

## Helm Workflow

```text
Repository
    ↓
Chart
    ↓
Release
    ↓
Kubernetes Resources
```

Example:

```text
Bitnami Repository
        ↓
nginx Chart
        ↓
my-nginx Release
        ↓
Deployment + Service + Pod + ReplicaSet
```

---

## Key Learning

Helm is the package manager for Kubernetes.

Comparison:

```text
apt  → Linux Packages
pip  → Python Packages
npm  → Node.js Packages
helm → Kubernetes Applications
```

Helm reduces the need to manually maintain large collections of Kubernetes YAML files and provides a standardized way to install, upgrade, rollback, and remove applications.

---

## Session Summary

Learned:

- Helm fundamentals
- Charts
- Releases
- Helm repositories
- Chart discovery
- Helm installation workflow
- Helm upgrade and rollback concepts

Verified that Helm can deploy a complete Kubernetes application using a single command while automatically creating the required Kubernetes resources.