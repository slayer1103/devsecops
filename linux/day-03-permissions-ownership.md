# Linux — Day 03: Permissions & Ownership

## Concept

Linux uses a permission model to control access to files and directories.

```text
user (owner)
group
others
```

Each has:

```text
r → read
w → write
x → execute
```

---

## Commands Covered

### 1. `ls -l` — View Permissions

```bash
ls -l
```

```text
displays permissions, ownership, and file details
```

---

### 2. `chmod` — Change Permissions

```bash
chmod 755 file.txt
chmod 000 file.txt
```

```text
modifies permission bits
```

---

### 3. `chown` — Change Ownership

```bash
sudo chown user:group file.txt
```

```text
changes file owner and group
```

---

### 4. `mkdir` — Create Directory

```bash
mkdir folder
```

---

### 5. `touch` — Create File

```bash
touch file.txt
```

---

### 6. `cat` — View File Content

```bash
cat file.txt
```

---

## Permission Behavior

### Directory vs File

```text
directory x → ability to enter (cd)
file x      → ability to execute
```

---

### Critical Observation

```text
removing execute permission from directory
→ blocks access to all files inside
```

Even if file permissions allow access.

---

### Example

```bash
chmod 000 file.txt
```

```text
removes all access (read, write, execute)
```

---

## Numeric Permissions

```text
755 → rwx r-x r-x → common for directories/executables
770 → rwx rwx --- → shared group access
```

---

## Key Observations

```text
permissions and ownership are separate
directory permissions affect file access
path traversal depends on directory execute bit
```

---

## Mistakes Made

```text
removed own read permission → file inaccessible
confused ownership vs permissions
misunderstood directory traversal behavior
```

---

## Key Takeaways

```text
chmod → controls access
chown → controls ownership
directory permissions affect accessibility
execute bit has different meaning for files vs directories
```
