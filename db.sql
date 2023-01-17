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
  PRIMARY KEY (`workspaceId`)
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