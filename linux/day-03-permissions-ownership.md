On this day we used below commands for learning.

ls- this is used for printing files with permissions details.
chmod - used for modifying perissions
chown = changes file ownership
mkdir - creating directories in specified path
touch - created empty files.
cat - display file contents

Key Observations
	•	Removing execute from a directory blocks access even if file inside has permissions.
	•	chmod 000 removes all access.
	•	Directory x = ability to enter.
	•	File x = ability to execute.
	•	Ownership and permission bits are separate mechanisms.

Mistakes made on that day

  •	Removed own read permission and couldn’t open file.
	•	Confusion between ownership and permissions.
	•	Initially misunderstood how path traversal works.


Numeric permissions practiced.
Number  meaning         usage 
755     rwx r-x r-x     Directories / executables
770     rwx rwx —       Shared group directory
