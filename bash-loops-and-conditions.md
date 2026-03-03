while loop structure

while [ condition ]
do
    commands
done

Key learning:
	•	A loop must modify the controlling variable.
	•	If the variable does not change → infinite loop.
	•	Always identify what variable controls loop termination.

example: 
var=1

while [ $var -le 10 ]
do
    echo $var
    var=$(( var + 1 ))
done

Arithmetic expression

BASH does integer math only

$(( expression ))

Example: 

echo $(( 10/3 ))
square=$(( var * var ))
sum=$(( sum + var ))

Important:
	•	$ goes before (())
	•	No spaces inside variable names
	•	Bash does not handle decimals natively

If condition loop styles

1: Test Brackets

if [ $var -le 10 ]
then
    echo "True"
fi

Numeric comparisons:
	•	-eq equal
	•	-ne not equal
	•	-lt less than
	•	-le less than or equal
	•	-gt greater than
	•	-ge greater than or equal

  2:(Arithmetic Style – Recommended for Math)

  if (( var % 2 == 0 ))
  then
      echo "Even"
  fi

  Important:
	•	No $ inside (( ))
	•	Use == instead of -eq
	•	Cleaner for mathematical conditions

Modulo operator

var % 2
if result equals 0 -> divisble evenly.

examples:

Examples:
	•	Even check → var % 2 == 0
	•	Multiple of 3 → var % 3 == 0


Accumulator Pattern
sum=0

while condition
do 
   sum=$(( sum + value ))
done

Used for:
	•	Sum of even numbers
	•	Running totals
	•	Counting events

Counter Pattern

even_count=0
odd_count=0

if condition
then 
    even_count=$(( even_count + 1 ))
else
    odd_count=$(( odd_count + 1 ))
fi

Important:
	•	Counters must be initialized to 0.
	•	Increment must be inside the loop.

7. Common Mistakes Encountered
	1.	Infinite loop due to missing increment.
	2.	Using $ incorrectly inside arithmetic condition.
	3.	Forgetting do after while.
	4.	Printing values inside loop instead of after it.
	5.	Not initializing counters before use.
	6.	Missing space in if (( condition )) syntax.




