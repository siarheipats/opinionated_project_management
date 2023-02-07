DROP TABLE IF EXISTS `Customers`;
DROP TABLE IF EXISTS `Teams`;
DROP TABLE IF EXISTS `customerTeams`;
DROP TABLE IF EXISTS `customerWorkspaces`;
DROP TABLE IF EXISTS `Workspaces`;
DROP TABLE IF EXISTS `Boards`;
DROP TABLE IF EXISTS `Tasks`;

CREATE TABLE IF NOT EXISTS `Workspaces` (

	`customerId` int(9) NOT NULL AUTO_INCREMENT,
    
	`email` varchar(255) NOT NULL,
    
	`cell` int(10) NOT NULL, 
    
    `firstName` varchar(255) NOT NULL,
    
    `lastName` varchar(255) NOT NULL,
    
    `customerPassword` varchar(255),

	PRIMARY KEY (`customerId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Teams` (

	`teamId` int(9) NOT NULL AUTO_INCREMENT,
    
    `teamName` varchar(255) NOT NULL,

	PRIMARY KEY (`teamId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `customerTeams` (

	`customerTeamId` int(11) NOT NULL AUTO_INCREMENT,
    
	`teamId` int(9) NOT NULL, 
    
    `customerId` int(9) NOT NULL,

	PRIMARY KEY (`workspaceId`),

	FOREIGN KEY (`teamId`) REFERENCES `Teams` (`teamId`),
    
    FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `customerWorkspaces` (

	`customerWorkspaceId` int(11) NOT NULL AUTO_INCREMENT,
    
	`workspaceId` int(9) NOT NULL, 
    
    `customerId` int(9) NOT NULL,

	PRIMARY KEY (`workspaceId`),

	FOREIGN KEY (`workspaceId`) REFERENCES `Workspaces` (`workspaceId`),
    
    FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Workspaces` (

	`workspaceId` int(9) NOT NULL AUTO_INCREMENT,
    
    `teamId` int(9) NOT NULL,
    
	`workspaceName` varchar(255) NOT NULL,
    
    `dueDate` datetime DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (`workspaceId`),

	FOREIGN KEY (`teamId`) REFERENCES `Teams` (`teamId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Boards` (

	`boardId` int(9) NOT NULL AUTO_INCREMENT,
    
	`workspaceId` int(9) NOT NULL, 
    
    `boardName` varchar(255) NOT NULL,
    
    `boardDescription` text(65535) NOT NULL,

	PRIMARY KEY (`boardId`),

	FOREIGN KEY (`workspaceId`) REFERENCES `Workspaces` (`workspaceId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Tasks` (

	`taskId` int(9) NOT NULL AUTO_INCREMENT,
    
	`boardId` int(9) NOT NULL, 
    
    `taskName` varchar(255) NOT NULL,
    
    `taskInfo` text(65535) NOT NULL,
    
    `taskDueDate` datetime DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (`taskId`),

	FOREIGN KEY (`boardId`) REFERENCES `Boards` (`boardId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DESCRIBE `Customers`;
DESCRIBE `Teams`;
DESCRIBE `customerTeams`;
DESCRIBE `customerWorkspaces`;
DESCRIBE `Workspaces`;
DESCRIBE `Boards`;
DESCRIBE `Tasks`;