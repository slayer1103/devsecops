# Linux — Day 06: Package Management & Binaries

## Concept

Linux commands are executable binary files stored in system directories.

```text
command typed → shell searches $PATH → binary found → executed as process
```

---

## Binary Locations

Common directories:

```text
/bin       → essential system binaries
/usr/bin   → user-level binaries
/sbin      → system/admin binaries
/usr/sbin  → advanced administrative binaries
```

---

## Commands Covered

### 1. `which` — Locate Binary

```bash
which ls
```

```text
shows full path of command binary
```

---

### 2. `$PATH` — Search Directories

```bash
echo $PATH
```

```text
list of directories shell searches for executables
search happens in order
first match is executed
```

---

### 3. Inspect Binary Directories

```bash
ls /bin
ls /usr/bin
ls /sbin
ls /usr/sbin
```

```text
reveals where commands are stored
```

---

## Package Management (APT)

### Update Package Index

```bash
sudo apt update
```

```text
refreshes package metadata
does not install upgrades
```

---

### Install Package

```bash
sudo apt install tree
```

### What Happens

```text
downloads package
resolves dependencies
places binaries in system directories
updates package database
```

---

### Remove Package

```bash
sudo apt remove tree
```

```text
removes installed package and binaries
```

---

## Package Inspection (dpkg)

### Find Package Owning a File

```bash
dpkg -S /bin/ls
```

```text
identifies which package owns the file
example: coreutils
```

---

### List Installed Packages

```bash
dpkg -l | grep bash
```

```text
filters installed packages related to bash
```

---

### View Dependencies

```bash
apt depends bash
```

```text
shows package dependency tree
```

---

## Key Observations

```text
every command is a binary file
shell uses $PATH to locate executables
package installation places files into system directories
dpkg tracks installed packages
```

---

## Key Takeaways

```text
Linux is modular (many small programs)
commands = binaries executed by kernel
APT handles install/remove operations
dependencies are automatically resolved
package manager = structured software lifecycle
```

---

## Execution Flow

```text
user runs command
↓
shell searches $PATH
↓
binary located
↓
process created by kernel
↓
packages installed via apt manage binaries
```