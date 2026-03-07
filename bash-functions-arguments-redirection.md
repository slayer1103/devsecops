Bash scripting - functions and arguements

1.Bash functions

function_name() {
      commands
}

example: 
square() {
    num=$1
    results=$((num*num))
    echo "Result:$results"
}

calling the functions as at the last: 
square 4
Result: 16

2.functions arguements:

square() {
    num=$1
    echo $(( num * num ))
}
square 5
o/p: 25

3.script arguements:

Scripts accept arguments when executing.

./math_tool.sh 4

inside script:
$1 -> 4

Example sript:

square() {
    num=$1
    echo $(( num * num ))
}

cube() {
    num=$1
    echo $(( num * num * num ))
}

square $1
cube $1

Execution: ./math_tool.sh 4

Output: Square: 16
Cube: 64

Key Points

• Functions allow grouping commands under a single name so they can be reused instead of repeating the same code multiple times.

• Functions improve script organization and make scripts easier to read and maintain.

• Scripts can receive input from the command line using positional parameters such as $1, $2, etc.

• Using script arguments makes automation scripts flexible because the same script can work with different inputs.

• It is important to validate input arguments before running the main logic of a script to avoid unexpected results.

• Linux commands use three standard data streams: standard input, standard output, and standard error.

• Output redirection allows saving command output or errors into files for logging and debugging.

• Combining functions, arguments, loops, and conditions allows the creation of reusable and automated system scripts.

• Bash scripting is commonly used to automate system administration tasks such as log processing, backups, monitoring, and batch operations.

⸻















