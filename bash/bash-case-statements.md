BASH case statement: 

Purpose: Used to handle multiple conditions in a cleaner way than many if-blocks.

Structure: 

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

Example: 

#!//bin/bash

echo "What do you want to view cheif?"

echo "Show current user?"
echo "Show current directory?"
echo "Show system uptime?"

read choice;

case $choice in 
     1) whoami;;
     2) pwd;;
     3) uptime;;
     *) echo "Invalid Choice"
esac
 
Example Use Case

A menu script that lets the user choose actions like:
	•	show current user
	•	show current directory
	•	show system uptime



  Key Points
	•	case compares a variable against multiple patterns.
	•	Each pattern ends with ).
	•	;; stops execution of that branch.
	•	* acts as the default case.
	•	esac ends the block (case reversed).

Common Usage
	•	CLI menu scripts
	•	user input handling
	•	automation scripts
	•	system administration utilities

  Behaviour for case: 


  Display menu
↓
Read user input
↓
Case evaluates input
↓
Matching command executes
↓
Default case handles invalid input






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