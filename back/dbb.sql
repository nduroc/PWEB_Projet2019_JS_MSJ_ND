-- phpMyAdmin SQL Dump
-- version 3.1.2deb1ubuntu0.2
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Lun 20 Janvier 2020 à 12:39
-- Version du serveur: 5.0.75
-- Version de PHP: 5.2.6-3ubuntu4.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `nduroc`
--

-- --------------------------------------------------------

--
-- Structure de la table `actors`
--

CREATE TABLE IF NOT EXISTS `actors` (
  `actorId` int(11) unsigned NOT NULL,
  `actorName` text collate utf8_unicode_ci NOT NULL,
  `actorCountryName` text collate utf8_unicode_ci NOT NULL,
  `actorCountryCode` text collate utf8_unicode_ci NOT NULL,
  `actorSexe` text collate utf8_unicode_ci NOT NULL,
  `actorUrlMediumImage` text collate utf8_unicode_ci NOT NULL,
  `actorUrlOriginalImage` text collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`actorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `actors_serie`
--

CREATE TABLE IF NOT EXISTS `actors_serie` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `actorId` int(10) unsigned NOT NULL,
  `serieId` int(10) unsigned NOT NULL,
  `characterId` int(10) unsigned NOT NULL,
  `characterName` text collate utf8_unicode_ci NOT NULL,
  `characterUrlMediumImage` text collate utf8_unicode_ci NOT NULL,
  `characterUrlOriginalImage` text collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `actorId` (`actorId`),
  KEY `serieId` (`serieId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1744 ;

-- --------------------------------------------------------

--
-- Structure de la table `episode`
--

CREATE TABLE IF NOT EXISTS `episode` (
  `id` int(10) unsigned NOT NULL,
  `name` text collate utf8_unicode_ci,
  `outDate` text collate utf8_unicode_ci,
  `seasonNumber` int(10) unsigned NOT NULL,
  `episodeNumber` int(10) unsigned NOT NULL,
  `urlMediumImage` text collate utf8_unicode_ci NOT NULL,
  `urlOriginalImage` text collate utf8_unicode_ci NOT NULL,
  `summary` text collate utf8_unicode_ci,
  `runtime` int(11) NOT NULL,
  `seasonId` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `seasonId` (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `season`
--

CREATE TABLE IF NOT EXISTS `season` (
  `id` int(10) unsigned NOT NULL,
  `numberSeasonInshow` int(11) NOT NULL,
  `name` text collate utf8_unicode_ci,
  `nbEpisode` int(11) NOT NULL,
  `urlMediumImage` text collate utf8_unicode_ci NOT NULL,
  `urlOriginalImage` text collate utf8_unicode_ci NOT NULL,
  `summary` text collate utf8_unicode_ci,
  `serieId` int(11) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `serieId` (`serieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `serie`
--

CREATE TABLE IF NOT EXISTS `serie` (
  `id` int(10) unsigned NOT NULL,
  `name` text collate utf8_unicode_ci NOT NULL,
  `type` text collate utf8_unicode_ci NOT NULL,
  `genre` text collate utf8_unicode_ci NOT NULL,
  `status` text collate utf8_unicode_ci NOT NULL,
  `start` text collate utf8_unicode_ci NOT NULL,
  `officialSite` text collate utf8_unicode_ci NOT NULL,
  `urlMediumImage` text collate utf8_unicode_ci,
  `urlOriginalImage` text collate utf8_unicode_ci NOT NULL,
  `rate` text collate utf8_unicode_ci NOT NULL,
  `summary` text collate utf8_unicode_ci NOT NULL,
  `network` text collate utf8_unicode_ci NOT NULL,
  `countryName` text collate utf8_unicode_ci NOT NULL,
  `countryCode` text collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(50) collate utf8_unicode_ci NOT NULL,
  `email` varchar(255) collate utf8_unicode_ci NOT NULL,
  `password` varchar(255) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Structure de la table `user_serie`
--

CREATE TABLE IF NOT EXISTS `user_serie` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `userId` int(10) unsigned NOT NULL,
  `serieId` int(10) unsigned NOT NULL,
  `current_saison` int(10) unsigned NOT NULL,
  `current_episode` int(10) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `userId` (`userId`,`serieId`),
  KEY `serieId` (`serieId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=141 ;

-- --------------------------------------------------------

--
-- Structure de la table `user_serie_episode`
--

CREATE TABLE IF NOT EXISTS `user_serie_episode` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `user_serie_id` int(10) unsigned NOT NULL,
  `episode_id` int(10) unsigned NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `user_serie_id` (`user_serie_id`,`episode_id`),
  KEY `episode_id` (`episode_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=187 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `actors_serie`
--
ALTER TABLE `actors_serie`
  ADD CONSTRAINT `actors_serie_ibfk_3` FOREIGN KEY (`actorId`) REFERENCES `actors` (`actorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `actors_serie_ibfk_4` FOREIGN KEY (`serieId`) REFERENCES `serie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`seasonId`) REFERENCES `season` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `season_ibfk_1` FOREIGN KEY (`serieId`) REFERENCES `serie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_serie`
--
ALTER TABLE `user_serie`
  ADD CONSTRAINT `user_serie_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_serie_ibfk_4` FOREIGN KEY (`serieId`) REFERENCES `serie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_serie_episode`
--
ALTER TABLE `user_serie_episode`
  ADD CONSTRAINT `user_serie_episode_ibfk_2` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_serie_episode_ibfk_1` FOREIGN KEY (`user_serie_id`) REFERENCES `user_serie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
