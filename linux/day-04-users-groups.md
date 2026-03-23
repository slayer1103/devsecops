Today we learned User and groups.

id - shows UID,Primary GID, Secondary groups.
Used to verify user identity and group membership

groups -
Displays groups a users belongs to.

sudo adduser devuser
above commands creates a new user.
it helps simulating a seperate identity.
observations once user is created that it does not directly has the sudo privileges.

Sudo groupadd projectgroup
creates a new group
it was used in our simulation for demonstrating access control

sudo usermod  -aG projectgroup devuser
- it used to add users to groups.
  
-a -> appends
-G -> specify group

why used: To grant group-level access to shared directory.
Mistake encountered:
Running this as devuser failed because devuser is not listed in sudoers, as in not in administrative group.

su -devuser
- using to switch specified to user.
Used for testing access restrictions in production.

sudo chown :projectgroup /srv/project
changes group ownership only.
used for ensuring group based permissions only.

chmod 770 /srv/project

sets:
owner - full access
group - full access
other - no access

used for restricting to only owner and group members only.

Mistakes Encountered
	1.	Tried using sudo as devuser → denied (not in sudoers).
	2.	Tried accessing shared directory inside home directory → failed.
	3.	Realized parent directory (/home/yourusername) had 700 permissions.
	4.	Understood that execute permission is required on all parent directories.

Key Learning
	•	Users represent identities.
	•	Groups represent roles.
	•	Ownership determines which permission set applies.
	•	Sudo is restricted to authorized users.
	•	Path traversal requires execute permission on all directories in the path.
	•	Linux enforces hierarchy strictly.

Traversal logic

Linux evaluates directory access step-by-step from root to the target path.
A user must have execute (x) permission on every parent directory to reach the final file or folder.

<img width="969" height="564" alt="image" src="https://github.com/user-attachments/assets/97ee1a8f-8ff9-4151-984d-c93cbfd70f92" />
















