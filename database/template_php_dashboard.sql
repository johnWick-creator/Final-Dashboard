-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2022 at 03:10 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `template_php_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(50) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `P_no` int(23) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `P_no`) VALUES
(130, 'aaasdas', 'sssasdasas', 131351312),
(131, 'aaasdas', 'sssasdasas', 131351312),
(142, 'aaasdas', 'sssasdasas', 131351312);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `shortname` text NOT NULL,
  `filename` text NOT NULL,
  `sidebar` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(255) NOT NULL DEFAULT 'bi-speedometer2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `shortname`, `filename`, `sidebar`, `icon`) VALUES
(1, 'dashboard', 'dashboard.php', 0, 'bi-speedometer2'),
(2, 'users', 'users.php', 0, 'bi-person-circle'),
(3, 'adduser', 'addUser.php', 1, 'bi-speedometer2'),
(4, 'edituser', 'editUser.php', 1, 'bi-speedometer2');

-- --------------------------------------------------------

--
-- Table structure for table `translation`
--

CREATE TABLE `translation` (
  `id` int(11) NOT NULL,
  `word` text NOT NULL,
  `fr` text DEFAULT NULL,
  `en` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `translation`
--

INSERT INTO `translation` (`id`, `word`, `fr`, `en`) VALUES
(1, 'username', 'Nom d\'utilisateur', 'Username'),
(2, 'mytasks', 'Mes taches', 'My tasks'),
(3, 'users', 'Utilisateurs', 'Users'),
(4, 'dashboard', 'Tableau de bord', 'Dashboard'),
(5, 'email', 'Adresse mail', 'Email'),
(6, 'password', 'Mot de passe', 'Password'),
(7, 'userRole', 'Type d\'utilisateur', 'User role'),
(8, 'generatePassword', 'Générer un mot de passe', 'Generate password'),
(9, 'addUser', 'Ajouter un utilisateur', 'Add a user'),
(10, 'EditUser', 'Modifier un utilisateur', 'Edit a user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `firstname`, `lastname`, `type`, `is_deleted`, `date_created`) VALUES
(1, 'admin', '$2y$10$unj2PCgfWvt7ai9lqQyRKOLidc52vBhxw4F2HLGAfyXBESNpSrsjW', 'admin@gmail.com', 'admin', 'admin', 1, 0, '2022-02-20 21:21:18');

-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `id` int(11) NOT NULL,
  `short_name` varchar(255) NOT NULL,
  `pretty_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertypes`
--

INSERT INTO `usertypes` (`id`, `short_name`, `pretty_name`) VALUES
(1, 'admin', 'Admin'),
(2, 'manager', 'Manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `translation`
--
ALTER TABLE `translation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userType` (`type`);

--
-- Indexes for table `usertypes`
--
ALTER TABLE `usertypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `translation`
--
ALTER TABLE `translation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `userType` FOREIGN KEY (`type`) REFERENCES `usertypes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
