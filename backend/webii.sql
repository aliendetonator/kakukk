-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Jún 17. 11:53
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webii`
--

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `boszorkanyfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO boszorkany VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteLobbies` ()  BEGIN
	DELETE FROM connected;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `falusifeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO falusi VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `farkasfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO farkas VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `felhasznalofeltoltes` (IN `inemail` VARCHAR(100), IN `injelszo` VARCHAR(250), IN `infelhasznalonev` VARCHAR(50))  INSERT INTO felhasznalo VALUES (inemail, injelszo, infelhasznalonev)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getboszorkanytop` (IN `inlimit` INT, IN `inoffset` INT)  SELECT felhasznalonev, SUM(pont) AS pont
FROM boszorkany
GROUP BY felhasznalonev
ORDER BY pont DESC
LIMIT inlimit
OFFSET inoffset$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getfalusitop` (IN `inlimit` INT, IN `inoffset` INT)  SELECT felhasznalonev, SUM(pont) AS pont
FROM falusi
GROUP BY felhasznalonev
ORDER BY pont DESC
LIMIT inlimit
OFFSET inoffset$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getfarkastop` (IN `inlimit` INT, IN `inoffset` INT)  SELECT felhasznalonev, SUM(pont) AS pont
FROM farkas
GROUP BY felhasznalonev
ORDER BY pont DESC
LIMIT inlimit
OFFSET inoffset$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getlatnoktop` (IN `inlimit` INT, IN `inoffset` INT)  SELECT felhasznalonev, SUM(pont) AS pont
FROM latnok
GROUP BY felhasznalonev
ORDER BY pont DESC
LIMIT inlimit
OFFSET inoffset$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLobby` (IN `lID` VARCHAR(6))  BEGIN
    SELECT username
    FROM connected
    WHERE `lobby` = lID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLobbyByUsername` (IN `uName` VARCHAR(30))  BEGIN
    SELECT lobby
    FROM connected
    WHERE `username` = uName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserGamesboszorkany` (IN `infelhasznalonev` VARCHAR(100))  select pont,datum from boszorkany
where felhasznalonev = infelhasznalonev
order by datum desc
LIMIT 10$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserGamesfalusi` (IN `infelhasznalonev` VARCHAR(100))  select pont,datum from falusi
where felhasznalonev = infelhasznalonev
order by datum desc
limit 10$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserGamesfarkas` (IN `infelhasznalonev` VARCHAR(100))  select pont,datum from farkas
where felhasznalonev = infelhasznalonev
order by datum desc
limit 10$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserGameslatnok` (IN `infelhasznalonev` VARCHAR(100))  select pont,datum from latnok
where felhasznalonev = infelhasznalonev
order by datum desc
limit 10$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserGamesvedelmezo` (IN `infelhasznalonev` VARCHAR(100))  select pont,datum from vedelmezo
where felhasznalonev = infelhasznalonev
order by datum desc
limit 10$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserSumboszorkany` (IN `infelhasznalonev` VARCHAR(100))  select SUM(pont) from boszorkany
where felhasznalonev = infelhasznalonev$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserSumfalusi` (IN `infelhasznalonev` VARCHAR(100))  select SUM(pont) from falusi
where felhasznalonev = infelhasznalonev$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserSumfarkas` (IN `infelhasznalonev` VARCHAR(100))  select SUM(pont) from farkas
where felhasznalonev = infelhasznalonev$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserSumlatnok` (IN `infelhasznalonev` VARCHAR(100))  select SUM(pont) from latnok
where felhasznalonev = infelhasznalonev$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserSumvedelmezo` (IN `infelhasznalonev` VARCHAR(100))  select SUM(pont) from vedelmezo
where felhasznalonev = infelhasznalonev$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getvedelmezotop` (IN `inlimit` INT, IN `inoffset` INT)  SELECT felhasznalonev, SUM(pont) AS pont
FROM vedelmezo
GROUP BY felhasznalonev
ORDER BY pont DESC
LIMIT inlimit
OFFSET inoffset$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `JoinLobby` (IN `uName` VARCHAR(30), IN `lID` VARCHAR(6))  BEGIN
    INSERT INTO connected
    VALUES (uName, lID);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `latnokfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO latnok VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RemoveFromLobby` (IN `uName` VARCHAR(30))  BEGIN
    DELETE FROM connected
    WHERE `username` = uName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `vedelmezofeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO vedelmezo VALUES(infelhasznalonev, inpont, NOW())$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `boszorkany`
--

CREATE TABLE `boszorkany` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `boszorkany`
--

INSERT INTO `boszorkany` (`felhasznalonev`, `pont`, `datum`) VALUES
('felhasznalo', 2, '2022-05-25 14:55:54');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `connected`
--

CREATE TABLE `connected` (
  `username` varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `lobby` varchar(6) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `falusi`
--

CREATE TABLE `falusi` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `falusi`
--

INSERT INTO `falusi` (`felhasznalonev`, `pont`, `datum`) VALUES
('probababa', 4, '2022-05-04 12:32:10'),
('probababa', 3, '2022-05-04 12:34:20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `farkas`
--

CREATE TABLE `farkas` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `farkas`
--

INSERT INTO `farkas` (`felhasznalonev`, `pont`, `datum`) VALUES
('probababa', 2, '2022-05-04 12:30:18'),
('kutyavagyok', 1, '2022-05-22 17:24:24'),
('jozsiaszexmester', 12, '2022-05-22 17:24:24'),
('kutyavagyok', 1, '2022-05-22 17:24:24'),
('jozsiaszexmester', 12, '2022-05-22 17:24:24'),
('valamisemmi', 2, '2022-05-25 15:02:15'),
('felhasznalo', 4, '2022-05-25 15:02:22'),
('userame', 2, '2022-05-25 15:02:22'),
('semmi', 21, '2022-05-25 15:02:59'),
('kurtakutya', 12, '2022-05-25 15:07:17'),
('Cilamila', 1, '2022-05-25 15:07:17'),
('sajtoskenyer', 21, '2022-05-25 15:08:20'),
('userame', 0, '2022-05-25 15:08:20'),
('sajtoskenyer', 21, '2022-05-25 15:08:20'),
('userame', 3, '2022-05-25 15:08:20'),
('username', 12, '2022-05-25 15:09:21'),
('userame', 4, '2022-05-25 15:09:21'),
('valamisemmi', 23, '2022-05-25 15:10:38'),
('carbonara', 2, '2022-06-16 19:31:38');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(250) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`email`, `jelszo`, `felhasznalonev`) VALUES
('asdfg@jklmn.hu', '$2b$10$5HTAa6W.Ew67nQdGOLT/ju0OQm8DmgPfZB2oed70bLIOZ68RF4K6W', 'username'),
('Dorombolo@meowmeow.wau', '$2b$10$4Ba7dcQtPxASHCfQpHf/aerv.YPkqpWtWAX/XJgdUqV2VFbWRdQtS', 'Cilamila'),
('jozsiaszexmester@gmail.com', '$2b$10$wIxt/X1Ve0xhdL5gkeaG8Omto6WWzcm9ZWUGmNvuNsTHisK/KfNci', 'jozsiaszexmester'),
('kurtafarkukutya@wauawu.meow', '$2b$10$qn4tkngF5yrUKCuVwPvdSeKmBIbZnRHTLDRr3Ehl.2ltsi8HEr/KO', 'kurtakutya'),
('kutyavagyok@gmail.com', '$2b$10$CBlKFEc8lMJq5Vqvq/FUBuq.2u3pjSoeFQIoBqa56ctD4bI2r2JOi', 'kutyavagyok'),
('makaroni@cs.go', '$2b$10$XY5s9hXzJHbZEIm.rdkjQuIRkpcOIn6BpUR12.3eKYd4QLD5NjCR6', 'carbonara'),
('proba@email.com', 'proba', 'probababa'),
('sex@sex.hu', 'semmixdd', 'valamisemmi'),
('tsokiix33@gmail.com', '$2b$10$82cLL07v5Kr61pEla8KPbO.CKsWS3t.5bSPdUwPMdRjV0JS3t/5.u', 'sajtoskenyer'),
('valami', '$2b$10$QrRHaj2ijYzvc7DiuTM2xedeqYYDEKhwkYS5YDa6r5sA0c0dFqg9.', 'semmi'),
('valamicucc@semi.hu', '$2b$10$TvhcQwzIaNcR1dyH2Tf5L.3tNpduH3k.pPugb9pBiOsZIg6y4Tqj.', 'userame'),
('valamicucc@semmi.hu', '$2b$10$ksDntEtTrkKMJGIsA5Eyi.MIXTjJEqzElY8nPKZxiYDEXF2zXcNFm', 'felhasznalo');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `latnok`
--

CREATE TABLE `latnok` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `latnok`
--

INSERT INTO `latnok` (`felhasznalonev`, `pont`, `datum`) VALUES
('kutyavagyok', 5, '2022-05-26 18:43:12');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vedelmezo`
--

CREATE TABLE `vedelmezo` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `vedelmezo`
--

INSERT INTO `vedelmezo` (`felhasznalonev`, `pont`, `datum`) VALUES
('semmi', 5, '2022-05-26 18:43:35');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `boszorkany`
--
ALTER TABLE `boszorkany`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `connected`
--
ALTER TABLE `connected`
  ADD PRIMARY KEY (`username`);

--
-- A tábla indexei `falusi`
--
ALTER TABLE `falusi`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `farkas`
--
ALTER TABLE `farkas`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `latnok`
--
ALTER TABLE `latnok`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `vedelmezo`
--
ALTER TABLE `vedelmezo`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `boszorkany`
--
ALTER TABLE `boszorkany`
  ADD CONSTRAINT `boszorkany_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Megkötések a táblához `falusi`
--
ALTER TABLE `falusi`
  ADD CONSTRAINT `falusi_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Megkötések a táblához `farkas`
--
ALTER TABLE `farkas`
  ADD CONSTRAINT `farkas_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Megkötések a táblához `latnok`
--
ALTER TABLE `latnok`
  ADD CONSTRAINT `latnok_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);

--
-- Megkötések a táblához `vedelmezo`
--
ALTER TABLE `vedelmezo`
  ADD CONSTRAINT `vedelmezo_ibfk_1` FOREIGN KEY (`felhasznalonev`) REFERENCES `felhasznalo` (`felhasznalonev`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
