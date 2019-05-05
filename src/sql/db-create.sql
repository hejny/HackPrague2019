SET NAMES utf8;

DROP TABLE IF EXISTS `File`;
CREATE TABLE `File` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record` int(11) NOT NULL,
  `mime` varchar(1000) COLLATE utf8_bin NOT NULL,
  `name` varchar(1000) COLLATE utf8_bin,
  `hash` char(64) COLLATE utf8_bin NOT NULL,
  `content` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `record` (`record`),
  KEY `mime` (`mime`),
  KEY `name` (`name`),
  KEY `hash` (`hash`),
  CONSTRAINT `File_ibfk_1` FOREIGN KEY (`record`) REFERENCES `Record` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Record`;
CREATE TABLE `Record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8_bin NOT NULL,
  `owner` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `recorded` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `coords_latitude` float(10,5) NOT NULL,
  `coords_longitude` float(10,5) NOT NULL,
  `geojson` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `ratings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `owner` (`owner`),
  KEY `created` (`created`),
  KEY `recorded` (`recorded`),
  KEY `coords` (`coords`(25)),
  CONSTRAINT `Record_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `Log`;
CREATE TABLE `Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `endpoint` varchar(1000) COLLATE utf8_bin NOT NULL,
  `apiKey` varchar(1000) COLLATE utf8_bin NOT NULL,
  `statusCode` char(3) COLLATE utf8_bin NOT NULL,
  `request` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created` (`created`),
  KEY `endpoint` (`endpoint`),
  KEY `apiKey` (`apiKey`),
  KEY `statusCode` (`statusCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8_bin NOT NULL,
  `mail` varchar(1000) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid` (`uuid`),
  KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

