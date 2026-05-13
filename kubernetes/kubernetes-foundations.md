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
