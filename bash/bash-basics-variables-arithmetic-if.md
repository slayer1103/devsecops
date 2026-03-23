Today we learned the Bash scripting and its some helpful commands


expr is used for any mathematical problem
like
expre 10+10
expre 10 /* 247
other commands are same just the symbol changes

after that we learned variable.

example: 

we used file=$(pwd)
by above variable we were printing the printing directory.

after that we learned the if statement

syntax:

if [ condition ]
then
    echo "statement"
else
    echo "statement"
fi

in above syntax else is also used for running commands if first condition is not met to check the second condition.

Thanks!

# Bash Basics — Variables, Arithmetic, and Conditionals

## Concept

Bash scripting allows automation using variables, commands, and control flow.

This section covers:
- Arithmetic operations
- Variables
- Conditional statements (`if`)

---

# 1. Arithmetic in Bash

## Concept

Bash can perform basic mathematical operations using commands like `expr` or arithmetic expansion.

---

## Using `expr`

```bash
expr 10 + 10
expr 10 \* 5
expr 20 / 4
```

### Important

```text
* must be escaped as \*
spaces are required between operands
```

---

## Using Arithmetic Expansion (Preferred)

```bash
echo $((10 + 10))
echo $((10 * 5))
echo $((20 / 4))
```

---

## Key Takeaway

```text
use $(( )) instead of expr for cleaner syntax
```

---

# 2. Variables

## Concept

Variables store values that can be reused in scripts.

---

## Example

```bash
current_dir=$(pwd)
echo $current_dir
```

---

## Explanation

```text
$(pwd) → command substitution
stores output of pwd into variable
```

---

## Rules

- No spaces around `=`  
- Use `$variable` to access value  

---

# 3. Conditional Statements (if)

## Concept

`if` statements allow decision-making in scripts.

---

## Syntax

```bash
if [ condition ]
then
  command
else
  command
fi
```

---

## Example

```bash
num=10

if [ $num -gt 5 ]
then
  echo "Number is greater than 5"
else
  echo "Number is 5 or less"
fi
```

---

## Common Operators

```text
-eq → equal
-ne → not equal
-gt → greater than
-lt → less than
-ge → greater or equal
-le → less or equal
```

---

## Key Points

- Conditions must be inside `[ ]`  
- Use spaces around brackets  
- `else` is optional  

---

# Key Takeaways

```text
expr → basic arithmetic (older method)
$(( )) → preferred arithmetic method
variables → store command output or values
if → control script logic
```

---

# Automation Flow

```text
store values in variables
↓
perform operations
↓
apply conditions
↓
execute logic
```