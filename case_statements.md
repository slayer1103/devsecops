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





