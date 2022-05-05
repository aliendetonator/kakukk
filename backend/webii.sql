-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Máj 04. 12:38
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.11

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `falusifeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO falusi VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `farkasfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO farkas VALUES(infelhasznalonev, inpont, NOW())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `felhasznalofeltoltes` (IN `inemail` VARCHAR(100), IN `injelszo` VARCHAR(20), IN `infelhasznalonev` VARCHAR(50))  INSERT INTO felhasznalo VALUES (inemail, injelszo, infelhasznalonev)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `latnokfeltoltes` (IN `infelhasznalonev` VARCHAR(50), IN `inpont` INT)  INSERT INTO latnok VALUES(infelhasznalonev, inpont, NOW())$$

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
('probababa', 2, '2022-05-04 12:30:18');

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
('proba@email.com', 'proba', 'probababa');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `latnok`
--

CREATE TABLE `latnok` (
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `pont` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

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
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `boszorkany`
--
ALTER TABLE `boszorkany`
  ADD KEY `felhasznalonev` (`felhasznalonev`);

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