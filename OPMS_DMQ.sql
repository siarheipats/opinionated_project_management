-- CREATE
INSERT INTO Customers VALUES (:emailInput, :cellInput, :firstNameInput, :lastNameInput, :customerPasswordInput);
INSERT INTO Teams VALUES (:teamNameInput);
INSERT INTO CustomerTeams (customerId, teamsId) VALUES (:customerIdInput, :teamIdInput);
INSERT INTO CustomerWorkspaces (customerId, workspaceId) VALUES (:customerIdInput, :teamIdInput);
INSERT INTO Workspaces (teamId) VALUES (:teamIdInput, :workspaceNameInput, :dueDateInput);
INSERT INTO Boards (workspaceId) VALUES (:workspaceIdInput, :boardNameInput, :boardDescriptionInput);
INSERT INTO Tasks (boardId) VALUES (:boardIdInput, :taskNameInput, :taskInfoInput, :taskDueDateInput);

-- READ
SELECT * FROM Customers;
SELECT * FROM Teams;
SELECT * FROM CustomerTeams;
SELECT * FROM CustomerWorkspaces;
SELECT * FROM Workspaces;
SELECT * FROM Boards;
SELECT * FROM Tasks;

-- UPDATE
UPDATE Customers SET email = :emailInput, cell = :cellInput, firstName = :firstNameInput, lastName = :lastNameInput, customerPassword = :customerPasswordInput WHERE customerId = :customerIdInput;
UPDATE Teams SET teamName = :teamNameInput WHERE teamId = :teamIdInput;
UPDATE CustomerTeams SET customerId = :customerIdInput, teamId = :teamIdInput WHERE customerTeamId = :customerTeamIdInput;
UPDATE CustomerWorkspaces SET customerId = :customerIdInput, teamId = :teamIdInput WHERE customerWorkspaceId = :customerWorkspaceIdInput;
UPDATE Workspaces SET teamId = :teamIdInput, workspaceName = :workspaceNameInput, dueDate = :dueDateInput WHERE workspaceId = :workspaceIdInput;
UPDATE Boards SET workspaceId = :workspaceIdInput, boardName = :boardNameInput, boardDescription = :boardDescriptionInput WHERE boardId = :boardIdInput;
UPDATE Tasks SET boardId = :boardIdInput, taskName = :taskNameInput, taskInfo = :taskInfoInput, taskDueDate = :taskDueDateInput WHERE taskId = :taskIdInput;

-- DELETE
DELETE FROM Customers WHERE customerId = :customerIdInput;
DELETE FROM Teams WHERE teamId = :teamIdInput;
DELETE FROM CustomerTeams WHERE customerId = :customerIdInput AND teamId = :teamIdInput;
DELETE FROM CustomerWorkspaces WHERE customerId = :customerIdInput AND workspaceId = :workspaceIdInput;
DELETE FROM Workspaces WHERE workspaceId = :workspaceIdInput;
DELETE FROM Boards WHERE boardId = :boardIdInput;
DELETE FROM Tasks WHERE taskId = :taskIdInput;