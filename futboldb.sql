-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-12-2025 a las 04:36:12
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `futboldb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador`
--

DROP TABLE IF EXISTS `entrenador`;
CREATE TABLE IF NOT EXISTS `entrenador` (
  `ent_id` int NOT NULL AUTO_INCREMENT,
  `ent_nombre` varchar(100) NOT NULL,
  `ent_nacionalidad` varchar(50) DEFAULT NULL,
  `ent_edad` int DEFAULT NULL,
  `equ_id` int DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`ent_id`),
  UNIQUE KEY `equ_id` (`equ_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `entrenador`
--

INSERT INTO `entrenador` (`ent_id`, `ent_nombre`, `ent_nacionalidad`, `ent_edad`, `equ_id`, `usu_id`) VALUES
(3, 'DT 03', 'Argentina', 50, 3, 1),
(4, 'DT 04', 'Uruguay', 47, 4, 1),
(5, 'DT 05', 'Chile', 52, 5, 1),
(6, 'DT 06', 'Perú', 44, 6, 1),
(7, 'DT 07', 'Brasil', 49, 7, 1),
(8, 'DT 08', 'Paraguay', 46, 8, 1),
(9, 'DT 09', 'Venezuela', 51, 9, 1),
(10, 'DT 10', 'México', 43, 10, 1),
(11, 'DT 11', 'Ecuador', 55, 11, 1),
(12, 'DT 12', 'Colombia', 42, 12, 1),
(13, 'DT 13', 'Argentina', 53, 13, 1),
(14, 'DT 14', 'Uruguay', 41, 14, 1),
(15, 'DT 15', 'Chile', 56, 15, 1),
(16, 'DT 16', 'Perú', 45, 16, 1),
(17, 'DT 17', 'Brasil', 47, 17, 1),
(18, 'DT 18', 'Paraguay', 52, 18, 1),
(19, 'DT 19', 'Venezuela', 49, 19, 1),
(20, 'DT 20', 'México', 43, 20, 1),
(21, 'DT 21', 'Ecuador', 46, 21, 1),
(22, 'DT 22', 'Colombia', 51, 22, 1),
(23, 'DT 23', 'Argentina', 48, 23, 1),
(24, 'DT 24', 'Uruguay', 50, 24, 1),
(25, 'DT 25', 'Chile', 44, 25, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

DROP TABLE IF EXISTS `equipo`;
CREATE TABLE IF NOT EXISTS `equipo` (
  `equ_id` int NOT NULL AUTO_INCREMENT,
  `equ_nombre` varchar(100) NOT NULL,
  `equ_ciudad` varchar(100) DEFAULT NULL,
  `equ_estadio` varchar(100) DEFAULT NULL,
  `equ_fundacion` year DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`equ_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`equ_id`, `equ_nombre`, `equ_ciudad`, `equ_estadio`, `equ_fundacion`, `usu_id`) VALUES
(3, 'Leones Dorados', 'Quito', 'Estadio Central', '2000', 1),
(4, 'Delfines 04', 'Ciudad A4', 'Estadio A4', '1993', 1),
(5, 'Estelares 05', 'Ciudad A5', 'Estadio A5', '1994', 1),
(6, 'Fénix 06', 'Ciudad A6', 'Estadio A6', '1995', 1),
(7, 'Gladiadores 07', 'Ciudad A7', 'Estadio A7', '1996', 1),
(8, 'Héroes 08', 'Ciudad A8', 'Estadio A8', '1997', 1),
(9, 'Imperiales 09', 'Ciudad A9', 'Estadio A9', '1998', 1),
(10, 'Jaguares 10', 'Ciudad A10', 'Estadio A10', '1999', 1),
(11, 'Kraken 11', 'Ciudad A11', 'Estadio A11', '2000', 1),
(12, 'Leones 12', 'Ciudad A12', 'Estadio A12', '2001', 1),
(13, 'Montañeses 13', 'Ciudad A13', 'Estadio A13', '2002', 1),
(14, 'Navales 14', 'Ciudad A14', 'Estadio A14', '2003', 1),
(15, 'Orcas 15', 'Ciudad A15', 'Estadio A15', '2004', 1),
(16, 'Piratas 16', 'Ciudad A16', 'Estadio A16', '2005', 1),
(17, 'Quimeras 17', 'Ciudad A17', 'Estadio A17', '2006', 1),
(18, 'Ráfagas 18', 'Ciudad A18', 'Estadio A18', '2007', 1),
(19, 'Samuráis 19', 'Ciudad A19', 'Estadio A19', '2008', 1),
(20, 'Toros 20', 'Ciudad A20', 'Estadio A20', '2009', 1),
(21, 'Unión 21', 'Ciudad A21', 'Estadio A21', '2010', 1),
(22, 'Vikingos 22', 'Ciudad A22', 'Estadio A22', '2011', 1),
(23, 'Wolves 23', 'Ciudad A23', 'Estadio A23', '2012', 1),
(24, 'Xenón 24', 'Ciudad A24', 'Estadio A24', '2013', 1),
(25, 'Yacarés 25', 'Ciudad A25', 'Estadio A25', '2014', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadistica_jugador`
--

DROP TABLE IF EXISTS `estadistica_jugador`;
CREATE TABLE IF NOT EXISTS `estadistica_jugador` (
  `est_id` int NOT NULL AUTO_INCREMENT,
  `par_id` int DEFAULT NULL,
  `jug_id` int DEFAULT NULL,
  `est_minutos_jugados` int DEFAULT NULL,
  `est_goles` int DEFAULT NULL,
  `est_asistencias` int DEFAULT NULL,
  `est_tarjetas_amarillas` int DEFAULT NULL,
  `est_tarjetas_rojas` int DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`est_id`),
  KEY `par_id` (`par_id`),
  KEY `jug_id` (`jug_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estadistica_jugador`
--

INSERT INTO `estadistica_jugador` (`est_id`, `par_id`, `jug_id`, `est_minutos_jugados`, `est_goles`, `est_asistencias`, `est_tarjetas_amarillas`, `est_tarjetas_rojas`, `usu_id`) VALUES
(3, 3, 3, 90, 0, 0, 0, 0, 1),
(4, 4, 4, 90, 0, 0, 1, 0, 1),
(5, 5, 5, 76, 1, 0, 0, 0, 1),
(6, 6, 6, 83, 0, 1, 2, 0, 1),
(7, 7, 7, 90, 0, 0, 1, 0, 1),
(8, 8, 8, 90, 0, 0, 0, 0, 1),
(9, 9, 9, 90, 2, 0, 0, 0, 1),
(10, 10, 10, 84, 0, 1, 1, 0, 1),
(11, 11, 11, 90, 1, 0, 0, 0, 1),
(12, 12, 12, 90, 0, 0, 0, 0, 1),
(13, 13, 13, 78, 0, 1, 1, 0, 1),
(14, 14, 14, 90, 1, 0, 0, 0, 1),
(15, 15, 15, 90, 0, 0, 2, 0, 1),
(16, 16, 16, 90, 0, 0, 0, 0, 1),
(17, 17, 17, 85, 1, 1, 0, 0, 1),
(18, 18, 18, 90, 0, 0, 0, 0, 1),
(19, 19, 19, 90, 1, 0, 1, 0, 1),
(20, 20, 20, 82, 0, 1, 0, 0, 1),
(21, 21, 21, 90, 2, 0, 0, 0, 1),
(22, 22, 22, 90, 0, 0, 1, 0, 1),
(23, 23, 23, 90, 0, 1, 0, 0, 1),
(24, 24, 24, 86, 1, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugador`
--

DROP TABLE IF EXISTS `jugador`;
CREATE TABLE IF NOT EXISTS `jugador` (
  `jug_id` int NOT NULL AUTO_INCREMENT,
  `jug_nombre` varchar(100) NOT NULL,
  `jug_posicion` varchar(50) DEFAULT NULL,
  `jug_nacionalidad` varchar(50) DEFAULT NULL,
  `jug_edad` int DEFAULT NULL,
  `equ_id` int DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`jug_id`),
  KEY `equ_id` (`equ_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `jugador`
--

INSERT INTO `jugador` (`jug_id`, `jug_nombre`, `jug_posicion`, `jug_nacionalidad`, `jug_edad`, `equ_id`, `usu_id`) VALUES
(3, 'Jugador 03', 'Defensa', 'Argentina', 26, 3, 1),
(4, 'Jugador 04', 'Portero', 'Uruguay', 28, 4, 1),
(5, 'Jugador 05', 'Delantero', 'Chile', 21, 5, 1),
(6, 'Jugador 06', 'Mediocampista', 'Perú', 23, 6, 1),
(7, 'Jugador 07', 'Defensa', 'Brasil', 27, 7, 1),
(8, 'Jugador 08', 'Portero', 'Paraguay', 29, 8, 1),
(9, 'Jugador 09', 'Delantero', 'Venezuela', 25, 9, 1),
(10, 'Jugador 10', 'Mediocampista', 'México', 24, 10, 1),
(11, 'Jugador 11', 'Defensa', 'Ecuador', 26, 11, 1),
(12, 'Jugador 12', 'Portero', 'Colombia', 28, 12, 1),
(13, 'Jugador 13', 'Delantero', 'Argentina', 22, 13, 1),
(14, 'Jugador 14', 'Mediocampista', 'Uruguay', 24, 14, 1),
(15, 'Jugador 15', 'Defensa', 'Chile', 26, 15, 1),
(16, 'Jugador 16', 'Portero', 'Perú', 28, 16, 1),
(17, 'Jugador 17', 'Delantero', 'Brasil', 23, 17, 1),
(18, 'Jugador 18', 'Mediocampista', 'Paraguay', 25, 18, 1),
(19, 'Jugador 19', 'Defensa', 'Venezuela', 27, 19, 1),
(20, 'Jugador 20', 'Portero', 'México', 29, 20, 1),
(21, 'Jugador 21', 'Delantero', 'Ecuador', 21, 21, 1),
(22, 'Jugador 22', 'Mediocampista', 'Colombia', 23, 22, 1),
(23, 'Jugador 23', 'Defensa', 'Argentina', 25, 23, 1),
(24, 'Jugador 24', 'Portero', 'Uruguay', 27, 24, 1),
(25, 'Jugador 25', 'Delantero', 'Chile', 24, 25, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

DROP TABLE IF EXISTS `partido`;
CREATE TABLE IF NOT EXISTS `partido` (
  `par_id` int NOT NULL AUTO_INCREMENT,
  `par_fecha` date DEFAULT NULL,
  `equ_local_id` int DEFAULT NULL,
  `equ_visitante_id` int DEFAULT NULL,
  `par_goles_local` int DEFAULT NULL,
  `par_goles_visitante` int DEFAULT NULL,
  `tor_id` int DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`par_id`),
  KEY `equ_local_id` (`equ_local_id`),
  KEY `equ_visitante_id` (`equ_visitante_id`),
  KEY `tor_id` (`tor_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `partido`
--

INSERT INTO `partido` (`par_id`, `par_fecha`, `equ_local_id`, `equ_visitante_id`, `par_goles_local`, `par_goles_visitante`, `tor_id`, `usu_id`) VALUES
(3, '2025-01-03', 3, 4, 0, 0, 3, 1),
(4, '2025-01-04', 4, 5, 3, 2, 4, 1),
(5, '2025-01-05', 5, 6, 1, 2, 5, 1),
(6, '2025-01-06', 6, 7, 2, 2, 6, 1),
(7, '2025-01-07', 7, 8, 0, 1, 7, 1),
(8, '2025-01-08', 8, 9, 4, 3, 8, 1),
(9, '2025-01-09', 9, 10, 2, 0, 9, 1),
(10, '2025-01-10', 10, 11, 1, 1, 10, 1),
(11, '2025-01-11', 11, 12, 3, 0, 11, 1),
(12, '2025-01-12', 12, 13, 2, 3, 12, 1),
(13, '2025-01-13', 13, 14, 0, 2, 13, 1),
(14, '2025-01-14', 14, 15, 1, 0, 14, 1),
(15, '2025-01-15', 15, 16, 2, 2, 15, 1),
(16, '2025-01-16', 16, 17, 3, 1, 16, 1),
(17, '2025-01-17', 17, 18, 1, 3, 17, 1),
(18, '2025-01-18', 18, 19, 0, 0, 18, 1),
(19, '2025-01-19', 19, 20, 2, 1, 19, 1),
(20, '2025-01-20', 20, 21, 1, 2, 20, 1),
(21, '2025-01-21', 21, 22, 4, 1, 21, 1),
(22, '2025-01-22', 22, 23, 0, 1, 22, 1),
(23, '2025-01-23', 23, 24, 2, 2, 23, 1),
(24, '2025-01-24', 24, 25, 3, 2, 24, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneo`
--

DROP TABLE IF EXISTS `torneo`;
CREATE TABLE IF NOT EXISTS `torneo` (
  `tor_id` int NOT NULL AUTO_INCREMENT,
  `tor_nombre` varchar(100) NOT NULL,
  `tor_temporada` varchar(20) DEFAULT NULL,
  `tor_pais` varchar(50) DEFAULT NULL,
  `usu_id` int DEFAULT NULL,
  PRIMARY KEY (`tor_id`),
  KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `torneo`
--

INSERT INTO `torneo` (`tor_id`, `tor_nombre`, `tor_temporada`, `tor_pais`, `usu_id`) VALUES
(1, 'Torneo 01', '2024-2025', 'Ecuador', 1),
(2, 'Torneo 02', '2024-2025', 'Ecuador', 1),
(3, 'Torneo 03', '2024-2025', 'Ecuador', 1),
(4, 'Torneo 04', '2024-2025', 'Ecuador', 1),
(5, 'Torneo 05', '2024-2025', 'Ecuador', 1),
(6, 'Torneo 06', '2024-2025', 'Ecuador', 1),
(7, 'Torneo 07', '2024-2025', 'Ecuador', 1),
(8, 'Torneo 08', '2024-2025', 'Ecuador', 1),
(9, 'Torneo 09', '2024-2025', 'Ecuador', 1),
(10, 'Torneo 10', '2024-2025', 'Ecuador', 1),
(11, 'Torneo 11', '2024-2025', 'Ecuador', 1),
(12, 'Torneo 12', '2024-2025', 'Ecuador', 1),
(13, 'Torneo 13', '2024-2025', 'Ecuador', 1),
(14, 'Torneo 14', '2024-2025', 'Ecuador', 1),
(15, 'Torneo 15', '2024-2025', 'Ecuador', 1),
(16, 'Torneo 16', '2024-2025', 'Ecuador', 1),
(17, 'Torneo 17', '2024-2025', 'Ecuador', 1),
(18, 'Torneo 18', '2024-2025', 'Ecuador', 1),
(19, 'Torneo 19', '2024-2025', 'Ecuador', 1),
(20, 'Torneo 20', '2024-2025', 'Ecuador', 1),
(21, 'Torneo 21', '2024-2025', 'Ecuador', 1),
(22, 'Torneo 22', '2024-2025', 'Ecuador', 1),
(23, 'Torneo 23', '2024-2025', 'Ecuador', 1),
(24, 'Torneo 24', '2024-2025', 'Ecuador', 1),
(25, 'Torneo 25', '2024-2025', 'Ecuador', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_id` int NOT NULL AUTO_INCREMENT,
  `usu_nombre` varchar(100) NOT NULL,
  `usu_email` varchar(100) NOT NULL,
  `usu_password` varchar(255) NOT NULL,
  `usu_rol` enum('admin','editor','viewer') DEFAULT 'viewer',
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `usu_email` (`usu_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usu_id`, `usu_nombre`, `usu_email`, `usu_password`, `usu_rol`) VALUES
(1, 'andres', 'andresbone@gmail.com', '$2a$12$4lS8zt5BjC/W.7T/tz/R6eqmtVwuuIso17uQ/GOuFNGtnTgfWB61q', 'admin');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD CONSTRAINT `entrenador_ibfk_2` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `entrenador_ibfk_3` FOREIGN KEY (`equ_id`) REFERENCES `equipo` (`equ_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_entrenador_equipo` FOREIGN KEY (`equ_id`) REFERENCES `equipo` (`equ_id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `estadistica_jugador`
--
ALTER TABLE `estadistica_jugador`
  ADD CONSTRAINT `estadistica_jugador_ibfk_3` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `estadistica_jugador_ibfk_4` FOREIGN KEY (`par_id`) REFERENCES `partido` (`par_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `estadistica_jugador_ibfk_5` FOREIGN KEY (`jug_id`) REFERENCES `jugador` (`jug_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_estadistica_jugador` FOREIGN KEY (`jug_id`) REFERENCES `jugador` (`jug_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_estadistica_partido` FOREIGN KEY (`par_id`) REFERENCES `partido` (`par_id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `jugador`
--
ALTER TABLE `jugador`
  ADD CONSTRAINT `fk_jugador_equipo` FOREIGN KEY (`equ_id`) REFERENCES `equipo` (`equ_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`equ_id`) REFERENCES `equipo` (`equ_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `jugador_ibfk_2` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `partido`
--
ALTER TABLE `partido`
  ADD CONSTRAINT `fk_partido_local` FOREIGN KEY (`equ_local_id`) REFERENCES `equipo` (`equ_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_partido_visitante` FOREIGN KEY (`equ_visitante_id`) REFERENCES `equipo` (`equ_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `partido_ibfk_1` FOREIGN KEY (`tor_id`) REFERENCES `torneo` (`tor_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `partido_ibfk_2` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `partido_ibfk_3` FOREIGN KEY (`equ_local_id`) REFERENCES `equipo` (`equ_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `partido_ibfk_4` FOREIGN KEY (`equ_visitante_id`) REFERENCES `equipo` (`equ_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `torneo`
--
ALTER TABLE `torneo`
  ADD CONSTRAINT `torneo_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usuario` (`usu_id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
