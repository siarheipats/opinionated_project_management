-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 11, 2023 at 03:34 PM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opm`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customerId` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CustomerWorkspaces`
--

CREATE TABLE `CustomerWorkspaces` (
  `customerWorkspacesId` int NOT NULL,
  `customerId` int NOT NULL,
  `workspaceId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Workspaces`
--

CREATE TABLE `Workspaces` (
  `workspaceId` int NOT NULL,
  `workspaceName` varchar(45) DEFAULT NULL,
  `dateCreated` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `CustomerWorkspaces`
--
ALTER TABLE `CustomerWorkspaces`
  ADD PRIMARY KEY (`customerWorkspacesId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `workspaceId` (`workspaceId`);

--
-- Indexes for table `Workspaces`
--
ALTER TABLE `Workspaces`
  ADD PRIMARY KEY (`workspaceId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customerId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CustomerWorkspaces`
--
ALTER TABLE `CustomerWorkspaces`
  MODIFY `customerWorkspacesId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Workspaces`
--
ALTER TABLE `Workspaces`
  MODIFY `workspaceId` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CustomerWorkspaces`
--
ALTER TABLE `CustomerWorkspaces`
  ADD CONSTRAINT `CustomerWorkspaces_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CustomerWorkspaces_ibfk_2` FOREIGN KEY (`workspaceId`) REFERENCES `Workspaces` (`workspaceId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
