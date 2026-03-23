# Bash — Loops & Conditions

## Concept

Control flow in Bash allows scripts to repeat actions and make decisions.

This includes:
- loops (`while`)
- conditions (`if`)
- arithmetic operations

---

## While Loop

### Syntax

```bash
while [ condition ]
do
    commands
done
```

---

### Example

```bash
var=1

while [ $var -le 10 ]
do
    echo $var
    var=$(( var + 1 ))
done
```

---

### Key Points

```text
loop must update controlling variable
no update → infinite loop
always identify termination condition
```

---

## Arithmetic in Bash

### Syntax

```bash
$(( expression ))
```

---

### Examples

```bash
echo $((10 / 3))
square=$((var * var))
sum=$((sum + var))
```

---

### Rules

```text
bash supports integer math only
$ is required before (())
no spaces inside variable names
no floating point support
```

---

## If Conditions

### 1. Test Bracket Style

```bash
if [ $var -le 10 ]
then
    echo "True"
fi
```

---

### Numeric Operators

```text
-eq → equal
-ne → not equal
-lt → less than
-le → less than or equal
-gt → greater than
-ge → greater than or equal
```

---

### 2. Arithmetic Style (Preferred)

```bash
if (( var % 2 == 0 ))
then
    echo "Even"
fi
```

---

### Key Difference

```text
(( )) → no $ needed
uses == instead of -eq
cleaner for math operations
```

---

## Modulo Operator

```bash
var % 2
```

---

### Use Cases

```text
even check → var % 2 == 0
multiple of 3 → var % 3 == 0
```

---

## Patterns

### Accumulator Pattern

```bash
sum=0

while condition
do
    sum=$((sum + value))
done
```

```text
used for totals and aggregation
```

---

### Counter Pattern

```bash
even_count=0
odd_count=0

if condition
then
    even_count=$((even_count + 1))
else
    odd_count=$((odd_count + 1))
fi
```

```text
counters must start at 0
increment inside loop
```

---

## Common Mistakes

```text
missing increment → infinite loop
wrong $ usage inside (( ))
missing do in while loop
printing inside loop unnecessarily
not initializing variables
incorrect spacing in conditions
```

---

## Key Takeaways

```text
while → repetition
if → decision making
(( )) → arithmetic logic
patterns → reusable thinking
```