-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2022 at 01:45 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webii`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `boszorkanyfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO boszorkany VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `falusifeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO falusi VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `farkasfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO farkas VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `felhasznalofeltoltes` (IN `inemail` VARCHAR(100), IN `injelszo` VARCHAR(250), IN `infelhasznalonev` VARCHAR(50))  INSERT INTO felhasznalo VALUES (inemail, injelszo, infelhasznalonev)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `latnokfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO latnok VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `vedelmezofeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO vedelmezo VALUES(infelhasznalonev, inpont, NOW())$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `boszorkany`
--

CREATE TABLE `boszorkany` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `falusi`
--

CREATE TABLE `falusi` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `falusi`
--

INSERT INTO `falusi` (`felhasznalonev`, `pont`, `datum`) VALUES
('probababa', 4, '2022-05-04 12:32:10'),
('probababa', 3, '2022-05-04 12:34:20');

-- --------------------------------------------------------

--
-- Table structure for table `farkas`
--

CREATE TABLE `farkas` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `farkas`
--

INSERT INTO `farkas` (`felhasznalonev`, `pont`, `datum`) VALUES
('probababa', 2, '2022-05-04 12:30:18');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(250) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalo`
--

INSERT INTO `felhasznalo` (`email`, `jelszo`, `felhasznalonev`) VALUES
('asdfg@jklmn.hu', '$2b$10$5HTAa6W.Ew67nQdGOLT/ju0OQm8DmgPfZB2oed70bLIOZ68RF4K6W', 'username'),
('jozsiaszexmester@gmail.com', '$2b$10$wIxt/X1Ve0xhdL5gkeaG8Omto6WWzcm9ZWUGmNvuNsTHisK/KfNci', 'jozsiaszexmester'),
('proba@email.com', 'proba', 'probababa'),
('sex@sex.hu', 'semmixdd', 'valamisemmi'),
('tsokiix33@gmail.com', '$2b$10$82cLL07v5Kr61pEla8KPbO.CKsWS3t.5bSPdUwPMdRjV0JS3t/5.u', 'sajtoskenyer'),
('valami', '$2b$10$QrRHaj2ijYzvc7DiuTM2xedeqYYDEKhwkYS5YDa6r5sA0c0dFqg9.', 'semmi'),
('valamicucc@semi.hu', '$2b$10$TvhcQwzIaNcR1dyH2Tf5L.3tNpduH3k.pPugb9pBiOsZIg6y4Tqj.', 'userame'),
('valamicucc@semmi.hu', '$2b$10$ksDntEtTrkKMJGIsA5Eyi.MIXTjJEqzElY8nPKZxiYDEXF2zXcNFm', 'felhasznalo');

-- --------------------------------------------------------

--
-- Table structure for table `latnok`
--

CREATE TABLE `latnok` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vedelmezo`
--

CREATE TABLE `vedelmezo` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boszorkany`
--
ALTER TABLE `boszorkany`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Indexes for table `falusi`
--
ALTER TABLE `falusi`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Indexes for table `farkas`
--
ALTER TABLE `farkas`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Indexes for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`);

--
-- Indexes for table `latnok`
--
ALTER TABLE `latnok`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Indexes for table `vedelmezo`
--
ALTER TABLE `vedelmezo`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boszorkany`
--
ALTER TABLE `boszorkany`
  ADD CONSTRAINT `boszorkany_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Constraints for table `falusi`
--
ALTER TABLE `falusi`
  ADD CONSTRAINT `falusi_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Constraints for table `farkas`
--
ALTER TABLE `farkas`
  ADD CONSTRAINT `farkas_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Constraints for table `latnok`
--
ALTER TABLE `latnok`
  ADD CONSTRAINT `latnok_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Constraints for table `vedelmezo`
--
ALTER TABLE `vedelmezo`
  ADD CONSTRAINT `vedelmezo_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
