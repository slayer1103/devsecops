# Linux — Day 04: Users & Groups

## Concept

Linux manages access using identities and roles:

```text
user  → identity
group → role / shared access
```

Permissions are applied based on ownership:

```text
user (owner) | group | others
```

---

## Commands Covered

### 1. `id` — User Identity

```bash
id
```

```text
shows UID, primary GID, secondary groups
```

---

### 2. `groups` — Group Membership

```bash
groups
```

```text
lists groups a user belongs to
```

---

### 3. `adduser` — Create User

```bash
sudo adduser devuser
```

```text
creates a new user account
no sudo privileges by default
```

---

### 4. `groupadd` — Create Group

```bash
sudo groupadd projectgroup
```

```text
creates a new group
used for shared access control
```

---

### 5. `usermod` — Add User to Group

```bash
sudo usermod -aG projectgroup devuser
```

```text
-a → append (do not overwrite existing groups)
-G → target group
```

```text
grants group-level access to resources
```

---

### 6. `su` — Switch User

```bash
su - devuser
```

```text
switch to another user account
used to test access restrictions
```

---

### 7. `chown` — Change Group Ownership

```bash
sudo chown :projectgroup /srv/project
```

```text
changes group ownership only
```

---

### 8. `chmod` — Set Permissions

```bash
chmod 770 /srv/project
```

```text
owner → full access
group → full access
others → no access
```

---

## Access Control Setup (Example)

```text
create user → devuser
create group → projectgroup
add user to group
assign group ownership to directory
set permissions (770)
```

---

## Key Observations

```text
new users do not have sudo access
group membership controls shared access
ownership determines permission application
```

---

## Common Mistakes

```text
using sudo as non-sudo user → denied
accessing directory inside restricted parent → failed
ignoring parent directory permissions
```

---

## Path Traversal Logic

```text
Linux checks access from root → target directory
user must have execute (x) permission on ALL parent directories
```

### Example

```text
/home/user/project/file
```

User needs `x` permission on:

```text
/home
/home/user
/home/user/project
```

---

## Key Takeaways

```text
users → identities
groups → shared roles
sudo → restricted administrative access
permissions depend on ownership
directory traversal requires execute permission at every level
```