# Bash Case Statement

## Concept

The `case` statement is used to handle multiple conditions in a clean and readable way.

It is an alternative to writing multiple `if-else` blocks when comparing a single variable against multiple values.

---

## Purpose

```text
handle multiple conditions efficiently
improve readability over nested if-else
used for menu-driven scripts
```

---

## Syntax

```bash
case variable in
  pattern1)
    command
    ;;
  pattern2)
    command
    ;;
  *)
    default command
    ;;
esac
```

---

## Example

```bash
#!/bin/bash

echo "Select an option:"
echo "1) Show current user"
echo "2) Show current directory"
echo "3) Show system uptime"

read choice

case $choice in
  1) whoami ;;
  2) pwd ;;
  3) uptime ;;
  *) echo "Invalid choice" ;;
esac
```

---

## Explanation

```text
read → takes user input
case → evaluates input against patterns
1,2,3 → matching conditions
;; → stops execution of current block
* → default case (fallback)
esac → ends case block
```

---

## Execution Flow

```text
display menu
↓
read user input
↓
case evaluates input
↓
matching command executes
↓
default handles invalid input
```

---

## Key Points

- `case` compares one variable against multiple patterns  
- Each pattern ends with `)`  
- `;;` prevents fall-through  
- `*` acts as default case  
- `esac` closes the block (`case` reversed)  

---

## Common Use Cases

```text
CLI menu scripts
user input handling
automation scripts
system administration tools
```

---

## Comparison with if-else

```text
if-else → better for complex conditions
case → better for matching fixed values
```

---

## Key Takeaways

```text
case → cleaner multi-condition handling
improves script readability
ideal for menus and user input logic
```