CREATE TABLE `activity` (
	`actID` INT(10,0) NOT NULL AUTO_INCREMENT,
	`title` CHAR(20) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`startDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`location` CHAR(30) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`price` SMALLINT(5,0) NOT NULL DEFAULT '0',
	`capacity` SMALLINT(5,0) NOT NULL DEFAULT -1,
	`imgs` CHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`additionalInfo` JSON NULL,
	`description` VARCHAR(200) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`userJoined` JSON NOT NULL,
	PRIMARY KEY (`actID`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
