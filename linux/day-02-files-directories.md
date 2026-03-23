# Linux — Day 02: Files & Directories

## Concept

Understanding how to create, manage, and navigate files and directories in the Linux filesystem.

---

## Commands Covered

### 1. `mkdir` — Create Directory

```bash
mkdir folder_name
```

```text
Creates a new directory
```

---

### 2. `touch` — Create File

```bash
touch file.txt
```

```text
Creates an empty file
```

---

### 3. `cp` — Copy Files

```bash
cp source.txt destination.txt
cp file.txt /path/to/directory/
```

```text
copies files or directories
```

---

### 4. `mv` — Move / Rename Files

```bash
mv file.txt newfile.txt
mv file.txt /path/to/directory/
```

```text
moves files or renames them
```

---

### 5. `cat` — View File Content

```bash
cat file.txt
```

```text
displays full file content
```

---

### 6. `head` — View Top Lines

```bash
head file.txt
head -n 5 file.txt
```

```text
shows first 10 lines by default
```

---

### 7. `tail` — View Bottom Lines

```bash
tail file.txt
tail -n 5 file.txt
```

```text
shows last 10 lines by default
```

---

### 8. `find` — Search Files

```bash
find . -name "file.txt"
find . -type f
```

```text
search files and directories
can filter by name or type
```

---

## Practice Performed

```text
created directories using mkdir
created files using touch
copied and moved files using cp and mv
viewed file content using cat, head, tail
searched files using find
```

---

## Key Takeaways

```text
Linux filesystem is hierarchical
files and directories are managed via commands
cp and mv are core file operations
find is powerful for searching files
```