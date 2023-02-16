CREATE TABLE `opm`.`Customers` (
  `customerId` INT AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`customerId`)
);

CREATE TABLE `opm`.`Workspaces` (
  `workspaceId` INT AUTO_INCREMENT,
  `workspaceName` VARCHAR(45) NULL,
  `dateCreated` VARCHAR(45) NULL,
  `teamId` INT NOT NULL,
  PRIMARY KEY (`workspaceId`),
  FOREIGN KEY (`teamId`) REFERENCES `Teams` (`teamId`)
);

CREATE TABLE `opm`. `Teams` (
	`teamId` int NOT NULL AUTO_INCREMENT,
    `teamName` varchar(255) NULL,
	PRIMARY KEY (`teamId`)
);
CREATE TABLE CustomerTeams (
	customerTeamsId INT AUTO_INCREMENT,
    customerId INT NOT NULL,
    teamId INT NOT NULL,
    PRIMARY KEY (customerTeamsId),
    FOREIGN KEY (customerId)
		REFERENCES Customers (customerId)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (teamId)
		REFERENCES Teams (teamId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE TABLE CustomerWorkspaces (
	customerWorkspacesId INT AUTO_INCREMENT,
    customerId INT NOT NULL,
    workspaceId INT NOT NULL,
    PRIMARY KEY (customerWorkspacesId),
    FOREIGN KEY (customerId)
		REFERENCES Customers (customerId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (workspaceId)
		REFERENCES Workspaces (workspaceId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `opm`.`Boards` (
	`boardId` int NOT NULL AUTO_INCREMENT,
	`workspaceId` int NOT NULL, 
	`boardName` varchar(255) NULL,
	`boardDescription` text(65535) NULL,
	PRIMARY KEY (`boardId`),
	FOREIGN KEY (`workspaceId`) REFERENCES `Workspaces` (`workspaceId`)
);

CREATE TABLE `opm`.`Tasks` (
	`taskId` int NOT NULL AUTO_INCREMENT,
	`boardId` int NOT NULL, 
	`taskName` varchar(255),
	`taskInfo` text(65535),
	`taskDueDate` datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`taskId`),
	FOREIGN KEY (`boardId`) REFERENCES `Boards` (`boardId`)
);