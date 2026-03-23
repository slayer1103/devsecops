Linux commands are executable binary files stored in system directories.
When a command is typed, the shell searches directories listed in $PATH, finds the matching binary, and executes it as a process.


commands used: 

which ls - used to identify where a command binary is located

echo $PATH - displays the list of directories the shell searches for executables.
When a command is typed, Linux searches these directories in order and executes the first match found.

ls /bin - lists essential binary and also contains critical system programs required for basic operation.

ls /usr/bin - lists user-level binaries, a direcotory where all standard user commands are located.

ls /sbin and ls /usr/sbin - contains administrative and system level binaries. 
Typically used by root or admins.

sudo apt update - updates the package metadata.
It refreshes available package information but does not install upgrades.

sudo apt install tree

Installs a package.

Process:
	•	Downloads package
	•	Resolves dependencies
	•	Places binary in system directory
	•	Registers package in package database

  sudo apt remove tree - removes installed package and its binaries


dpkg -S /bin/ls - identifies which package owns a specific file.
Example: ls belongs to the coreutil package.

dpkg -l | grep bash

lists installed packages related to bash.
used to verify installed software.

apt depends bash
Shows package dependencies.
Demonstrates how Linux packages rely on other packages.


Key Observations
	•	Every command is an executable file stored on disk.
	•	The shell uses $PATH to locate binaries.
	•	Installing a package places files into system directories.
	•	Removing a package removes those files.
	•	The system tracks installed packages using dpkg.
	•	Software lifecycle in Linux is managed through package managers.


  What I Learned
	•	Linux is modular, composed of many small programs.
	•	Commands are binaries executed by the kernel.
	•	Package management handles installation, dependencies, and file placement.
	•	There is no magic behind apt install; it is structured file deployment.

⸻










  
