# Bash Scripting — Functions, Arguments, and Redirection

## Concept

Bash scripting allows automation by combining commands, functions, and inputs.

Core ideas covered:
- Functions → reusable blocks of code
- Arguments → dynamic input to scripts/functions
- Redirection → control where output goes

---

# 1. Bash Functions

## Purpose

Functions group commands under a single name so they can be reused.

---

## Syntax

```bash
function_name() {
  commands
}
```

---

## Example

```bash
square() {
  num=$1
  result=$((num * num))
  echo "Result: $result"
}
```

Call the function:

```bash
square 4
```

Output:

```text
Result: 16
```

---

## Key Points

- `$1` → first argument passed to function  
- Functions improve readability and reuse  
- Avoid repeating the same logic  

---

# 2. Function Arguments

## Concept

Functions can accept input values (arguments).

---

## Example

```bash
square() {
  num=$1
  echo $((num * num))
}

square 5
```

Output:

```text
25
```

---

## Key Points

```text
$1 → first argument
$2 → second argument
```

Functions behave like mini-scripts inside a script.

---

# 3. Script Arguments

## Concept

Scripts accept arguments from the command line.

---

## Example

Run script:

```bash
./math_tool.sh 4
```

Inside script:

```bash
$1 → 4
```

---

## Example Script

```bash
square() {
  num=$1
  echo $((num * num))
}

cube() {
  num=$1
  echo $((num * num * num))
}

echo "Square: $(square $1)"
echo "Cube: $(cube $1)"
```

---

## Output

```text
Square: 16
Cube: 64
```

---

## Best Practice

Validate input before execution:

```bash
if [ -z "$1" ]; then
  echo "Usage: $0 <number>"
  exit 1
fi
```

---

# 4. Redirection (Basics)

## Concept

Linux uses three standard data streams:

```text
stdin  → input
stdout → normal output
stderr → error output
```

---

## Examples

```bash
echo "hello" > file.txt        # overwrite
echo "world" >> file.txt       # append
ls invalid 2> error.log        # capture errors
command > output.log 2>&1      # capture both output and errors
```

---

## Use Cases

```text
logging script output
debugging errors
storing results of automation
```

---

# Key Takeaways

```text
functions → reuse logic
arguments → dynamic input
scripts → accept user input
redirection → control output
```

---

# Automation Workflow

```text
write script
↓
accept arguments
↓
use functions for logic
↓
redirect output to logs
↓
automate tasks
```
