-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 16, 2022 at 10:12 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MSTExpress`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `seller_driver`
-- (See below for the actual view)
--
CREATE TABLE `seller_driver` (
`ID` int(11) unsigned
,`braID` int(11) unsigned
,`name` varchar(100)
,`phone` varchar(250)
,`email` varchar(250)
,`passwords` varchar(250)
,`address` varchar(500)
,`document` varchar(250)
,`type` char(100)
,`productType` varchar(100)
,`bankName` varchar(100)
,`bankAccountNumber` varchar(100)
,`bankAccountName` varchar(100)
,`status_` tinyint(4)
,`typeAccount` varchar(6)
,`image` varchar(250)
);

-- --------------------------------------------------------

--
-- Table structure for table `tblBranch`
--

CREATE TABLE `tblBranch` (
  `braAutoID` int(10) UNSIGNED NOT NULL,
  `braName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `braPhone` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `braEmail` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `braBranchName` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `braBranchPhone` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `braLocation` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `braAddress` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `braPercentageOutput` decimal(10,2) NOT NULL DEFAULT '0.00',
  `braPercentageInput` decimal(10,2) NOT NULL DEFAULT '0.00',
  `braHeadStatus` tinyint(1) NOT NULL DEFAULT '0',
  `braParentID` int(10) DEFAULT NULL,
  `braLocationPoint` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `braStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblBranch`
--

INSERT INTO `tblBranch` (`braAutoID`, `braName`, `braPhone`, `braEmail`, `braBranchName`, `braBranchPhone`, `braLocation`, `braAddress`, `braPercentageOutput`, `braPercentageInput`, `braHeadStatus`, `braParentID`, `braLocationPoint`, `braStatus`) VALUES
(1, 'MSTExpress', '0314499555', 'admin@mstexpress.com', 'MST Head office', '0314499555', 'Phnom Penh', 'អាសយដ្ឋានៈ ផ្លូវលេខ 1928 ភូមិ ក្រុងថ្មី ,\nសង្កាត់គោកឃ្លាំង ,ខណ្ឌសែនសុខ ,រាជធានីភ្នំពេញ។\n', '0.00', '0.00', 1, NULL, NULL, 1),
(4, 'Rachhen', '0962000263', 'rachhen@mstexpress', 'Rachhen', '0962000263', 'ផ្លូវកម្ពុជាក្រោម', 'ផ្លូវកម្ពុជាក្រោម', '30.00', '30.00', 0, NULL, '11.551562191330655, 104.90317378757086', 1),
(5, 'Smey', '0962000263', 'smey@mstexpress', 'Smey', '0962000263', 'ស្ទឹងមានជ័យ', 'ស្ទឹងមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(6, 'សាខា ស្រុកស្ទោង', '070866688', 'stong@mst-express.com', 'សាខាស្រុកស្ទោង', '070866688', 'ស្រុកស្ទោង', 'អាសយដ្ឋានៈភូមិ លាបទង ឃុំកំពង់ចិនត្បួង ស្រុកស្ទោង ខេត្តកំពង់ធំ', '30.00', '20.00', 0, NULL, NULL, 1),
(7, 'សាខា ក្រុងព្រះវិហារ', '0977619068', 'preahvihea@mst-express.com', 'សាខាក្រុងព្រះវិហារ', '0977210184', 'ក្រុងព្រះវិហារ', 'អាសយដ្ឋានៈ ភូមិអណ្ដូងពោធិ៍ សង្កាត់កំពង់ប្រណាក ក្រុងព្រះវិហារ ខេត្តព្រះវិហារ', '30.00', '20.00', 0, NULL, NULL, 1),
(9, 'សាខា ឃុំថ្មីគូលេន', '0889688168', 'kulenpreahvihea@mst-express.com', 'សាខាឃុំថ្មី គូលេន', '0889688168', 'ឃុំថ្មី គូលេន', 'អាសយដ្ឋានៈ ភូមិថ្នល់បែក ឃុំថ្មី ស្រុកគូលេន ខេត្តព្រះវិហារ', '30.00', '20.00', 0, NULL, NULL, 1),
(10, 'សាខា ក្រុងសៀមរាប', '0969727373', 'seimreap001@mst-express.com', 'ក្រុងសៀមរាប', '0969727373', 'ក្រុងសៀមរាប', 'អាសយដ្ឋានៈ ក្រុងសៀមរាប ខេត្តសៀមរាប', '30.00', '20.00', 0, NULL, NULL, 1),
(11, 'សាខា ឃុំព្រះនេត្រព្រះ', '0976875687', 'preahnetpreag01@mst-express.com', 'សាខាឃុំព្រះនេត្រព្រះ', '0976875687', 'ឃុំព្រះនេត្រព្រះ', 'អាសយដ្ឋានៈ ភូមិជើងវត្ត ឃុំព្រះនេត្រព្រះ ស្រុកព្រះនេត្រព្រះ ខេត្តបន្ទាយមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(12, 'សាខា ស្រុកកំរៀង', '085868285', 'komreng@mst-express.com', 'សាខាស្រុកកំរៀង', '085868285', 'សាខាស្រុកកំរៀង', 'អាសយដ្ឋានៈ ឃុំបឹងរាំង ស្រុកកំរៀង ខេត្តបាត់ដំបង', '30.00', '20.00', 0, NULL, NULL, 1),
(13, 'សាខា ក្រុងបាត់ដំបង', '095885584', 'battambangkrung@mst-express.com', 'សាខាក្រុងបាត់ដំបង', '095885584', 'ក្រុងបាត់ដំបង', 'អាសយដ្ឋានៈ ភូមិរំចេក៤ សង្កាត់រតនៈ ក្រុហបាត់ដំបង ខេត្តបាត់ដំបង', '30.00', '20.00', 0, NULL, NULL, 1),
(14, 'សាខា ក្រុងសំរោង(ឧត្តរមានជ័យ)', '017551065', 'sreynath01@mst-express.com', 'សាខាក្រុងសំរោង', '017551065', 'ខេត្តឧត្តមមានជ័យ', 'ភូមិដូនកែវ សង្កាត់ក្រុងសំរោង ខេត្តឧត្តមមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(15, 'សាខា សន្ទុក', '0974442289', 'sorntok001@mst-express.com', 'សាខា សន្ទុក', '0974442289', 'កំពង់ធំ', 'អាសយដ្ឋានៈភូមិធន់មោង ឃុំកំពង់ថ្ម ស្រុកសន្ទុក ខេត្តកំពង់ធំ', '30.00', '20.00', 0, NULL, NULL, 1),
(16, 'សាខា ស្រុកកំពង់ស្វាយ', '070402136', 'kampongsvay@mst-express.com', 'សាខា ស្រុកកំពង់ស្វាយ', '070402136', 'សាខា ស្រុកកំពង់ស្វាយ', 'អាសយដ្ឋានៈភូមិ ព្រៃគុយ ឃុំព្រៃគុយ ស្រុកកំពង់ស្វាយ ខេត្តកំពង់ធំ ', '30.00', '20.00', 0, NULL, NULL, 1),
(17, 'សាខា សង្កាត់ស្វាយប៉ោ(btb)', '069295265', 'songkatsvaybbt@mst-express.com', 'សាខា សង្កាត់ស្វាយប៉ោ', '069295265', 'សាខា សង្កាត់ស្វាយប៉ោ', 'អាសយដ្ឋានៈ ភូមិដួងមា ឃុំព្រែកនរិន្ទ ស្រុកឯកភ្នំ ខេត្តបាត់ដំបង', '30.00', '20.00', 0, NULL, NULL, 1),
(18, 'សាខា ប្រាសាទបល្ល័ង្គ', '070359551', 'chanthakampongthom@mst-express.com', 'សាខា ស្រុកប្រាសាទបល្ល័ង្គ', '070359551', 'សាខា ស្រុកប្រាសាទបល្ល័ង្គ', 'អាសយដ្ឋានៈ ភូមិខ្មាក់ ឃុំសាលាវិស័យ ស្រុកប្រាសាទបល្ល័ង្គ ខេត្តកំពង់ធំ ', '30.00', '20.00', 0, NULL, NULL, 1),
(19, 'សាខា ឃុំបឹងរាំង', '0716642954', 'mstexpresskamrieng01@mst-express.com', 'សាខា ឃុំបឹងរាំង', '0716642954', 'សាខា ឃុំបឹងរាំង', 'អាសយដ្ឋានៈ ភូមិស្វាយ ឃុំបឹងរាំង ស្រុកកំរៀង ខេត្តបាត់ដំបង', '20.00', '15.00', 0, NULL, NULL, 1),
(20, 'សាខា ស្រុកភ្នំព្រឹក', '069680155', 'phnompreruk@mst-express.com', 'សាខាស្រុកភ្នំព្រឹក', '069680155', 'សាខា ស្រុកភ្នំព្រឹក', 'អាសយដ្ឋានៈ ភូមិអូរ ឃុំពេជ្រចិន្តា ស្រុកភ្នំព្រឹក ខេត្តបាត់ដំបង', '30.00', '20.00', 0, NULL, NULL, 1),
(21, 'សាខា ស្រុកម៉ាឡៃ', '086441119', 'malaimst@mst-express.com', 'សាខា ស្រុកម៉ាឡៃ', '086441119', 'សាខា ស្រុកម៉ាឡៃ', 'អាសយដ្ឋានៈ ភូមិសង្កែ ឃុំបឹងបេង ស្រុកម៉ាឡៃ ខេត្តបន្ទាយមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(23, 'សាខា ក្រុងប៉ោយប៉ែត', '0967033336', 'mstexpresspeypet@mst-express.com', 'សាខា ប៉ោយប៉ែត', '0967033336', 'សាខា ប៉ោយប៉ែត', 'អាសយដ្ឋានៈ ភូមិមិត្តភាព សង្កាត់ប៉ោយប៉ែត ក្រុងប៉ោយប៉ែត ខេត្តបន្ទាយមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(24, 'សាខា ស្ទឹងថ្មី (Sr)', '010819198', 'seimreap09@mst-express.com', 'សាខា ស្ទឹងថ្មី សៀមរាម', '01081919', 'សាខា ស្ទឹងថ្មី សៀមរាម', 'អាសយដ្ឋានៈ ភូមិស្ទឹងថ្មី សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប ខេត្តសៀមរាប', '20.00', '15.00', 0, NULL, NULL, 1),
(25, 'សាខា ឃុំអូប្រាសាទ', '081944507', 'mongkolbory@mst-express.com', 'សាខា ឃុំអូរប្រាសាទ', '081944507', 'សាខា ឃុំអូប្រាសាទ', 'អាសយដ្ឋាៈ ភូមិភ្នំប្រាសាទ', '30.00', '20.00', 0, NULL, NULL, 1),
(26, 'សាខា ស្រុកភ្នំស្រុក', '0978593373', 'phnomsrok09@mst-exoress.com', 'សាខា ស្រុកភ្នំស្រុក', '0978593373', 'សាខា ស្រុកភ្នំស្រុក', 'អាសយដ្ឋានៈ ភូមិពន្លៃ ឃុំភ្នំដី ស្រុកភ្នំស្រុក ខេត្តបន្ទាយមានជ័យ', '30.00', '20.00', 0, NULL, NULL, 1),
(28, 'សាខាស្រុកស្ទោង ១', '123', 'RITH', 'សាខាស្រុកស្ទោង ១', '070594606', '12321', 'ASDDSA', '30.00', '20.00', 0, 6, NULL, 1),
(29, 'RITH', '070594606', 'rith@gamil.com', 'Rith', '070594606', 'ផ្សារដើមគរ', 'ផ្សារដើមគរ', '30.00', '30.00', 0, 4, '11.451562191330655, 104.90317378757086', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblBuyer`
--

CREATE TABLE `tblBuyer` (
  `buyAutoID` int(10) UNSIGNED NOT NULL,
  `buy_braAutoID` int(10) UNSIGNED NOT NULL,
  `buyName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `buyPhone` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `buyPassword` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyAddress` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `buyStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblDriver`
--

CREATE TABLE `tblDriver` (
  `driAutoID` int(10) UNSIGNED NOT NULL,
  `dri_braAutoID` int(10) UNSIGNED NOT NULL,
  `driName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `driPhone` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `driEmail` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driPassword` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driAddress` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `driDocument` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driType` char(100) COLLATE utf8_unicode_ci NOT NULL,
  `driStatus` tinyint(1) NOT NULL DEFAULT '0',
  `driImage` char(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driPushyToken` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `driLastShipDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `driBusy` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblDriver`
--

INSERT INTO `tblDriver` (`driAutoID`, `dri_braAutoID`, `driName`, `driPhone`, `driEmail`, `driPassword`, `driAddress`, `driDocument`, `driType`, `driStatus`, `driImage`, `driPushyToken`, `driLastShipDateTime`, `driBusy`) VALUES
(1, 1, 'Driver Testing', '85585995530', 'smeykeo@gmail.com', '123456', 'Phnom Penh', '', '', 1, '1_7rRe8NKA9JXy3PTOUOOO.png', 'cTO0RsBHQn6L-JHYRu8UX_:APA91bFJuYeH3XJLZTh3NurzE80wtUzRssR9aGqPfD4Q1GbRU6MA8ptWXZEqu7cGXySpPrlc5L8zgUQt-IWhG3rEM9eYUdc-DnjF4apkEe-_pdYrvonCf_Vm0PhtbZYQKtEDFG0p_dR8', '2021-08-07 14:07:24', 0),
(2, 1, 'PENG SOPHY', '85593870066', 'sophypeng01@mst-express.com', '098870066', 'PHNOM PENH', '', '1', 1, NULL, 'fhfxirPdQgqMj5pqRNLU2t:APA91bHajeqvtiC4iP_CYvpejTTur3Ut-aUS_29ylOm_zvY9ZsSdxEri2ZrgBiwFA_nS5rSCI5PsW_ksm5GXeI9Hm7mpQtGzsAoVBuycDDYwFjrUmZkHlkNMk7XDt0_agVQJIYHRQNyV', '2021-08-17 01:41:05', 1),
(3, 5, 'Smey', '0962000263', 'smey@gmail.com', '123', 'ស្ទឹងមានជ័យ', '', '', 1, NULL, NULL, '2021-10-11 06:19:43', 0),
(4, 4, 'Rachhen', '0962000263', 'rachhen@gmain.com', '123', 'Takeo', '', '3', 1, NULL, NULL, '2021-10-11 08:59:09', 0),
(5, 1, 'TANG TONGNHA', '855965616671', 'tangtongnha@mst-express', '0975616671', 'PHNOM PENH', '', '1', 1, NULL, 'fsxsngrURSKj7kGWcLWInV:APA91bFVhg_M54kEMegFzI6QLKwkGU1R0dd9MVkksveMQYfswOs2f25wosDNohWsWiKgEN8rfYVHshwtN9L3Fh5n4c_8QumIHhR24ipEvKN384sC1n7sNm7p2C2dIIGx1qmoTU3TwsAG', '2021-12-09 02:32:39', 1),
(6, 1, 'NAT PUTHEA', '85593830026', 'puthea@mst-express.com', '99991111', '7makara', '', '1', 1, NULL, 'cEC0xR-CQnO46ep7C9U6ho:APA91bFiTzfU2ssy7P3zqvMdyaGLJt8PCKVgc6OI6WHIHzQ2Z_Qk1a5YmEhFrxW3Vobva3pIhQdOgozxGZe1bfHG1fOf3MQd-XTaH_Zg9LsI3yLlq6odwZF-5XcVfRX7odZ7ilG5qKFR', '2021-12-19 08:34:28', 1),
(7, 1, 'SUON SOVANNARA', '85593919373', 'sovanara@mst-express.com', '098919373', 'PHNOM PENH', '', '', 1, NULL, 'c6ADan9qQBui24WMor8ZkQ:APA91bHt0quULou6UUJ9JaJXlNCymOeULXIP5mD69lai7S7F_WSAbnULFh_vbY1P9MmRrqJiNj3og-RikmEJFWk0-n70vfhUQYVKtAD2AI9ciZHpWJguUchZyjEZrW96n0KZQLuPwvS5', '2021-12-30 15:19:45', 0),
(8, 1, 'SREU SOKLIM', '85586433279', 'soklim@msr-express.com', '098797767', 'PHNOM PENH', '', '', 1, NULL, 'czDXEr7VSWOypAUP5ButiY:APA91bFMvWaVSv_K40Bch6UHUKTHv2VKaL2s_IDNIHLeUOI8h14_5zfWeiJdDGh6vo4b8ZR6LSNuvgAbrg8zimIJcVC4gX8FSHsuTd7S2oCu87gznNA4xBguAS0vIfscASJXC3DRbC1G', '2021-12-30 15:23:32', 0),
(9, 1, 'MST004DM', '85560797767', 'mst@mst-express.com', '99991111', 'កំពង់ថ្ម', '', '', 1, NULL, NULL, '2021-12-31 02:54:11', 0),
(10, 1, 'MST005DM', '85570402136', 'kampongsvay@mst-express.com', '070402136', 'កំពង់ស្វាយ', '', '2', 1, NULL, NULL, '2022-01-04 02:26:51', 1),
(11, 1, 'MST006DM', '85569295265', 'songkatsvaybbt@mst-express.com', '000111999', 'សង្កាត់ស្វាយប៉ោ', '', '2', 1, NULL, 'fWc_krvwQWiBLNtCJX4LvV:APA91bGp7GQCETUc5Twgy8ymgN2c63rsMpG_crxcybUVeT-v2oZ-tbx8w_dL-w_x9uJHLodmGd1D6zvY8Hk3_tzesCU2SDgl166QScC7-QcdvC9pM_Qipguv42vhQAjwTdt8YrGX_UoY', '2022-01-04 08:27:51', 1),
(12, 1, 'MST007DM', '85570359551', 'chanthamst@mst-express.com', '060797767', 'សាខាស្រុកប្រាសាទបល្ល័ង្គ', '', '', 1, NULL, 'enkj7xWbRTS653_QRSQqRt:APA91bGLA0xgR01zPuVT7r_kHDsbMqO1tgMwqsuW_oPKFMI1nh5BoQylZ924LZ8YHyHy73FnWrjvEOC_uMbHfk1blY132U4GPQDF8d6fLd6sl0PChxd1-kzrB_AWl0AxZ8BOdBZJknpY', '2021-12-31 10:24:11', 0),
(13, 1, 'MST010DM', '855716642954', 'mstkamrieng@mst-express.com', '070797767', 'សាខាឃុំបឹងរាំង', '', '2', 1, NULL, 'enT__nYeT-ielxanFPouUY:APA91bFyYfM62wZ8T4dq_RPNoDUsHWlxQ5bPl73grPZypd86clyz2aetpI4Wb6eKDW6jtMIKCoaivdgN0CUgWbFNTSA16ZfcuthC3ta6UTq5U7Egacow1UjY5EuZS568vMiFraGX8cOK', '2022-01-05 06:50:37', 1),
(14, 1, 'MST009DM', '85560797767', 'malai@mst-express.com', '00001111', 'សាខា ស្រុកម៉ាឡៃ', '', '2', 1, NULL, NULL, '2022-01-01 06:57:18', 0),
(15, 29, 'ម៉ូតូ', '070594606', 'moto@gmail.com', '123', 'moto', '', '', 1, NULL, NULL, '2022-01-11 07:32:30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblEnterData`
--

CREATE TABLE `tblEnterData` (
  `endAutoID` int(10) UNSIGNED NOT NULL,
  `end_braAutoID` int(10) UNSIGNED NOT NULL,
  `end_usaAutoID` int(10) UNSIGNED DEFAULT NULL,
  `end_driAutoID` int(10) UNSIGNED DEFAULT NULL,
  `end_selAutoID` int(10) UNSIGNED DEFAULT NULL,
  `end_invAutoID` int(10) UNSIGNED DEFAULT NULL,
  `endBraIdInput` int(10) UNSIGNED DEFAULT NULL,
  `endBraIdOutput` int(10) UNSIGNED DEFAULT NULL,
  `endBranchIdParent` int(11) DEFAULT NULL,
  `endPickUpID` int(10) DEFAULT NULL,
  `end_DriverActiveDate` datetime DEFAULT NULL,
  `endDatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDateTimeOut` datetime DEFAULT NULL,
  `endStoreName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `endPhone` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endSenderPhone` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endReceiverPhone` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `endReceiverName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endLocation` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endZone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endReceiverAddress` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `endDriverFeeStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endDriverStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endProductType` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `endCarType` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endProductPriceKH` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endProductPriceEN` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endMoneyGetCustomerKH` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endMoneyGetCustomerEN` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endMoneyGotCustomerKH` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endMoneyGotCustomerEN` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endSenderFeeEN` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endSenderFeeKH` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endSenderFeeStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endSenderStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endDriverFeeEN` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endDriverFeeKH` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endNote` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endNoteDelivery` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endStatusProductPrice` tinyint(1) NOT NULL DEFAULT '0',
  `endReceiveStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endPrintStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endDoneStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endClearStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endDateTimeClear` date DEFAULT NULL,
  `endReturned` tinyint(1) NOT NULL DEFAULT '0',
  `endReturnedNote` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `endReturnedDate` date DEFAULT NULL,
  `endDoneReport` tinyint(1) NOT NULL DEFAULT '0',
  `endDownStatus` tinyint(1) NOT NULL DEFAULT '0',
  `endDateTimeDrive` date DEFAULT NULL,
  `endPercentageInput` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endPercentageOutput` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endParentPerson` decimal(10,2) NOT NULL DEFAULT '0.00',
  `endDelayDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblEnterData`
--

INSERT INTO `tblEnterData` (`endAutoID`, `end_braAutoID`, `end_usaAutoID`, `end_driAutoID`, `end_selAutoID`, `end_invAutoID`, `endBraIdInput`, `endBraIdOutput`, `endBranchIdParent`, `endPickUpID`, `end_DriverActiveDate`, `endDatetime`, `endDateTimeOut`, `endStoreName`, `endPhone`, `endSenderPhone`, `endReceiverPhone`, `endReceiverName`, `endLocation`, `endZone`, `endReceiverAddress`, `endDriverFeeStatus`, `endDriverStatus`, `endProductType`, `endCarType`, `endProductPriceKH`, `endProductPriceEN`, `endMoneyGetCustomerKH`, `endMoneyGetCustomerEN`, `endMoneyGotCustomerKH`, `endMoneyGotCustomerEN`, `endSenderFeeEN`, `endSenderFeeKH`, `endSenderFeeStatus`, `endSenderStatus`, `endDriverFeeEN`, `endDriverFeeKH`, `endNote`, `endNoteDelivery`, `endStatusProductPrice`, `endReceiveStatus`, `endPrintStatus`, `endDoneStatus`, `endClearStatus`, `endDateTimeClear`, `endReturned`, `endReturnedNote`, `endReturnedDate`, `endDoneReport`, `endDownStatus`, `endDateTimeDrive`, `endPercentageInput`, `endPercentageOutput`, `endParentPerson`, `endDelayDate`) VALUES
(1, 29, 28, 15, NULL, 8, 29, 29, 4, NULL, NULL, '2022-01-12 02:08:18', '2022-01-12 09:23:27', 'TEST1', NULL, '070594606', '070594606', NULL, 'phnomPenh', 'រាជធានី ភ្នំពេញ', 'PP', 0, 0, 'Test1', '', '0.00', '10.00', '6000.00', '10.00', '0.00', '11.50', '0.00', '0.00', 0, 0, '0.00', '6000.00', '', NULL, 1, 1, 0, 1, 1, '2022-01-12', 0, NULL, NULL, 0, 0, '2022-01-12', '30.00', '30.00', '10.00', NULL),
(2, 29, 28, 15, NULL, 8, 29, 29, 4, NULL, NULL, '2022-01-12 02:13:44', '2022-01-12 09:23:27', 'TEST1', NULL, '070594606', '070594606', NULL, 'phnomPenh', 'ទីក្រុងភ្នំពេញ', 'PP', 0, 0, 'Test1', '', '0.00', '10.00', '6000.00', '10.00', '0.00', '11.50', '0.00', '0.00', 0, 0, '0.00', '6000.00', '', NULL, 1, 1, 0, 1, 1, '2022-01-12', 0, NULL, NULL, 0, 0, '2022-01-12', '30.00', '30.00', '10.00', NULL),
(3, 29, 28, NULL, NULL, NULL, 29, NULL, 4, NULL, NULL, '2022-01-12 02:16:50', NULL, 'PP', NULL, '070594606', '070594606', NULL, 'phnomPenh', 'បងរ៉ាឆេន', 'PP', 0, 0, 'Test1', '', '0.00', '10.00', '6000.00', '10.00', '0.00', '0.00', '0.00', '0.00', 0, 0, '0.00', '6000.00', '', NULL, 1, 0, 0, 0, 0, NULL, 0, NULL, NULL, 0, 0, NULL, '30.00', '0.00', '10.00', NULL),
(4, 4, 3, 1, NULL, NULL, 4, NULL, NULL, NULL, NULL, '2022-01-12 02:20:21', NULL, 'PP', NULL, '070695045', '070695045', NULL, 'phnomPenh', 'ផ្សារដើមគរ', 'PP', 0, 0, 'អាវ', '', '0.00', '10.00', '10000.00', '10.00', '0.00', '0.00', '0.00', '0.00', 0, 0, '0.00', '10000.00', '', NULL, 1, 0, 0, 0, 0, NULL, 0, NULL, NULL, 0, 0, '2022-01-14', '30.00', '0.00', '0.00', NULL),
(5, 1, 1, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, '2022-01-14 06:50:39', NULL, 'Ravy Beauty and Fashion ', NULL, '1', '070594606', NULL, 'phnomPenh', '', 'PP', 0, 0, 'Test1', '', '0.00', '10.00', '6000.00', '10.00', '0.00', '0.00', '0.00', '0.00', 0, 0, '0.00', '6000.00', '', NULL, 1, 0, 0, 0, 0, NULL, 0, NULL, NULL, 0, 0, NULL, '0.00', '0.00', '0.00', NULL),
(6, 1, 1, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, '2022-01-14 07:25:48', NULL, 'Ravy Beauty and Fashion ', NULL, '070594606', '070594606', NULL, 'phnomPenh', 'ក្រុង បាត់ដំបង', 'PP', 0, 0, 'Test1', '', '0.00', '9.00', '6000.00', '9.00', '0.00', '0.00', '0.00', '0.00', 0, 0, '0.00', '6000.00', '', NULL, 1, 0, 0, 0, 0, NULL, 0, NULL, NULL, 0, 0, NULL, '0.00', '0.00', '0.00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblInvoice`
--

CREATE TABLE `tblInvoice` (
  `invAutoID` int(10) UNSIGNED NOT NULL,
  `invDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `inv_selAutoID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblInvoice`
--

INSERT INTO `tblInvoice` (`invAutoID`, `invDateTime`, `inv_selAutoID`) VALUES
(1, '2021-10-14 03:55:20', 1),
(2, '2021-10-15 06:34:47', 1),
(3, '2021-12-30 14:25:04', 962000263),
(4, '2022-01-10 07:24:52', 70594606),
(5, '2022-01-10 07:38:20', 4),
(6, '2022-01-10 09:13:35', 70594606),
(7, '2022-01-11 06:17:01', 70594606),
(8, '2022-01-12 02:23:32', 70594606);

-- --------------------------------------------------------

--
-- Table structure for table `tblMenuAdmin`
--

CREATE TABLE `tblMenuAdmin` (
  `madAutoID` int(10) UNSIGNED NOT NULL,
  `madName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `madPageName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `madIcon` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `madOrder` int(10) NOT NULL,
  `madStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblMenuAdmin`
--

INSERT INTO `tblMenuAdmin` (`madAutoID`, `madName`, `madPageName`, `madIcon`, `madOrder`, `madStatus`) VALUES
(1, 'សិទ្ធក្នុងការប្រើប្រាស់', 'user-permission', 'fa-users', 1, 0),
(2, 'អ្នកប្រើប្រាស់', 'user-admin', 'fa-user', 3, 1),
(3, 'គ្រប់គ្រងមុឺនុយ', 'menu-admin', 'fa-bars', 2, 1),
(6, 'អ្នកទិញ', 'buyer', 'fa-shopping-basket', 4, 1),
(7, 'អ្នកលក់', 'seller', 'fa-male', 5, 1),
(8, 'អ្នកដឹក', 'driver', 'fa-motorcycle', 6, 1),
(9, 'សាខា', 'branch', 'fa-building', 7, 1),
(10, 'បញ្ចូលទិន្នន័យ', 'enter-data', 'fa-paste', 12, 1),
(11, 'របាយការណ៍', 'grant-report', 'fa-list-alt', 8, 1),
(12, 'វិក្កយ័បត្រទូទាត់រួច', 'receipt-paid', 'fa-book', 16, 1),
(13, 'វិក្កយបត្រមិនទាន់ទូទាត់', 'receipt-pending', 'fa-bookmark', 15, 1),
(14, 'បែងចែកទំនិញ', 'carrier-list', 'fa-indent', 13, 1),
(15, 'បញ្ជីរាយទំនិញអ្នកដឹក', 'driver-list', 'fa-list', 14, 1),
(16, 'តំបន់', 'zone', 'fa-map', 7, 1),
(17, 'របាយការណ៍ប្រចាំថ្ងៃ', 'daily-report', 'fa-list-ul', 9, 0),
(18, 'របាយការណ៍ប្រចាំថ្ងៃតាមសាខា', 'daily-report-head', 'fa-list', 10, 0),
(19, 'ទទួលទំនិញពីសាខា', 'change-branch', 'fa-clone', 11, 1),
(20, 'ហាងហៅដឹក', 'required-booking', 'fa-home', 10, 1),
(21, 'ចំនួនដឹកបាន', 'carried-amount', 'fa-truck', 10, 1),
(22, 'ស្លាយ', 'slides', 'fa-image', 7, 1),
(23, 'បរិយាយគេហទំព័រ', 'site-description', 'fa-home', 8, 1),
(24, 'របាយការណ៍ប្រចាំខែ', 'branch-report-monthly', 'fa-list-ul', 9, 1),
(25, 'របាយការណ៍ប្រចាំខែតាមសាខា', 'report-monthly-by-branch', 'fa-list', 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblNotificationAll`
--

CREATE TABLE `tblNotificationAll` (
  `noaAutoID` int(10) NOT NULL,
  `noaDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `noaTitle` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `noaMessage` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `endDriID` int(10) DEFAULT NULL,
  `endSellerID` int(10) DEFAULT NULL,
  `noaSeen` tinyint(1) NOT NULL DEFAULT '0',
  `noaSenderID` int(10) DEFAULT NULL,
  `endAutoID` int(10) DEFAULT NULL,
  `endStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblNotificationAll`
--

INSERT INTO `tblNotificationAll` (`noaAutoID`, `noaDateTime`, `noaTitle`, `noaMessage`, `endDriID`, `endSellerID`, `noaSeen`, `noaSenderID`, `endAutoID`, `endStatus`) VALUES
(1, '2021-05-16 04:27:15', 'Icon', '173 not visible icons. Free vector icons in SVG, PSD, PNG, EPS and ICON FONT.', NULL, 1, 1, NULL, NULL, 1),
(2, '2021-05-16 04:27:15', 'Received', 'Store and sync app data in milliseconds\r\n', NULL, 2, 1, NULL, NULL, 1),
(3, '2021-05-16 04:27:15', 'Icon', '173 not visible icons. Free vector icons in SVG, PSD, PNG, EPS and ICON FONT.', NULL, 2, 1, NULL, NULL, 1),
(4, '2021-05-16 04:27:15', 'Received', 'Store and sync app data in milliseconds\r\n', NULL, 1, 1, NULL, NULL, 1),
(5, '2021-05-16 04:27:15', 'Return', '173 not visible icons. Free vector icons in SVG, PSD, PNG, EPS and ICON FONT.', NULL, 1, 1, NULL, NULL, 1),
(6, '2021-05-16 04:27:15', 'Received', 'Store and sync app data in milliseconds\r\n', NULL, 2, 1, NULL, NULL, 1),
(7, '2021-05-16 04:27:15', 'Delay', '173 not visible icons. Free vector icons in SVG, PSD, PNG, EPS and ICON FONT.', NULL, 2, 1, NULL, NULL, 1),
(8, '2021-05-16 04:27:15', 'Received', 'Store and sync app data in milliseconds\r\n', NULL, 1, 1, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblOnlinePaymentAcoount`
--

CREATE TABLE `tblOnlinePaymentAcoount` (
  `opaAutoID` int(10) NOT NULL,
  `opaName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opaImageQR` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opaImageLogo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opaAccountName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opaAccountNumber` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opaOrder` int(10) NOT NULL,
  `opaStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblOnlinePaymentAcoount`
--

INSERT INTO `tblOnlinePaymentAcoount` (`opaAutoID`, `opaName`, `opaImageQR`, `opaImageLogo`, `opaAccountName`, `opaAccountNumber`, `opaOrder`, `opaStatus`) VALUES
(1, 'ABA', 'aba_qr.jpeg', 'aba.jpg', 'KEO MONIRAKSMEY', '000362164', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblPermissionAdmin`
--

CREATE TABLE `tblPermissionAdmin` (
  `pmaAutoID` int(10) UNSIGNED NOT NULL,
  `pma_usaAutoID` int(10) UNSIGNED NOT NULL,
  `pma_madAutoID` int(10) UNSIGNED NOT NULL,
  `pmaView` tinyint(1) NOT NULL DEFAULT '1',
  `pmaInsert` tinyint(1) NOT NULL DEFAULT '0',
  `pmaDelete` tinyint(1) NOT NULL DEFAULT '0',
  `pmaUpdate` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblPermissionAdmin`
--

INSERT INTO `tblPermissionAdmin` (`pmaAutoID`, `pma_usaAutoID`, `pma_madAutoID`, `pmaView`, `pmaInsert`, `pmaDelete`, `pmaUpdate`) VALUES
(1, 2, 1, 1, 1, 1, 1),
(2, 2, 2, 1, 1, 1, 1),
(3, 2, 3, 1, 1, 1, 1),
(4, 2, 6, 1, 1, 1, 1),
(5, 2, 7, 1, 1, 1, 1),
(6, 2, 8, 1, 1, 1, 1),
(7, 2, 9, 1, 1, 1, 1),
(8, 2, 10, 1, 1, 1, 1),
(9, 2, 11, 1, 1, 1, 1),
(10, 2, 12, 1, 1, 1, 1),
(11, 2, 13, 1, 1, 1, 1),
(12, 2, 14, 1, 1, 1, 1),
(13, 2, 15, 1, 1, 1, 1),
(14, 2, 16, 1, 1, 1, 1),
(15, 2, 17, 1, 1, 1, 1),
(16, 2, 18, 1, 1, 1, 1),
(17, 2, 19, 1, 1, 1, 1),
(18, 2, 20, 1, 1, 1, 1),
(19, 2, 21, 1, 1, 1, 1),
(20, 2, 22, 1, 1, 1, 1),
(21, 2, 23, 1, 1, 1, 1),
(22, 3, 1, 1, 1, 1, 1),
(23, 3, 2, 1, 1, 1, 1),
(24, 3, 3, 1, 1, 1, 1),
(25, 3, 7, 1, 1, 1, 1),
(26, 3, 6, 1, 1, 1, 1),
(27, 3, 8, 1, 1, 1, 1),
(28, 3, 9, 1, 1, 1, 1),
(29, 3, 10, 1, 1, 1, 1),
(30, 3, 11, 1, 1, 1, 1),
(31, 3, 12, 1, 1, 1, 1),
(32, 3, 13, 1, 1, 1, 1),
(33, 3, 14, 1, 1, 1, 1),
(34, 3, 15, 1, 1, 1, 1),
(35, 3, 16, 1, 1, 1, 1),
(36, 3, 17, 1, 1, 1, 1),
(37, 3, 18, 1, 1, 1, 1),
(38, 3, 19, 1, 1, 1, 1),
(39, 3, 20, 1, 1, 1, 1),
(40, 3, 21, 1, 1, 1, 1),
(41, 3, 22, 1, 1, 1, 1),
(42, 3, 24, 1, 1, 1, 1),
(43, 4, 1, 1, 1, 1, 1),
(44, 4, 2, 1, 1, 1, 1),
(45, 4, 3, 1, 1, 1, 1),
(46, 4, 6, 1, 1, 1, 1),
(47, 4, 7, 1, 1, 1, 1),
(48, 4, 8, 1, 1, 1, 1),
(49, 4, 9, 1, 1, 1, 1),
(50, 4, 10, 1, 1, 1, 1),
(51, 4, 11, 1, 1, 1, 1),
(52, 4, 12, 1, 1, 1, 1),
(53, 4, 13, 1, 1, 1, 1),
(54, 4, 14, 1, 1, 1, 1),
(55, 4, 15, 1, 1, 1, 1),
(56, 4, 16, 1, 1, 1, 1),
(57, 4, 17, 1, 1, 1, 1),
(58, 4, 18, 1, 1, 1, 1),
(59, 4, 19, 1, 1, 1, 1),
(60, 4, 20, 1, 1, 1, 1),
(61, 4, 21, 1, 1, 1, 1),
(62, 4, 24, 1, 1, 1, 1),
(63, 5, 1, 1, 1, 1, 1),
(64, 5, 11, 1, 0, 0, 0),
(65, 5, 10, 1, 0, 0, 0),
(66, 5, 19, 1, 0, 0, 0),
(67, 5, 14, 1, 0, 0, 0),
(68, 5, 13, 1, 0, 0, 0),
(69, 5, 12, 1, 0, 0, 0),
(70, 5, 6, 1, 0, 0, 0),
(71, 5, 7, 1, 0, 0, 0),
(72, 5, 8, 1, 0, 0, 0),
(73, 5, 15, 1, 0, 0, 0),
(74, 5, 20, 1, 0, 0, 0),
(75, 5, 16, 1, 0, 0, 0),
(76, 5, 9, 1, 0, 0, 0),
(77, 6, 6, 1, 0, 0, 0),
(78, 6, 7, 1, 0, 0, 0),
(79, 6, 8, 1, 0, 0, 0),
(80, 6, 10, 1, 0, 0, 0),
(81, 6, 11, 1, 0, 0, 0),
(82, 6, 12, 1, 0, 0, 0),
(83, 6, 13, 1, 0, 0, 0),
(84, 6, 14, 1, 0, 0, 0),
(85, 6, 15, 1, 0, 0, 0),
(86, 6, 17, 1, 0, 0, 0),
(87, 6, 19, 1, 0, 0, 0),
(88, 6, 20, 1, 0, 0, 0),
(89, 9, 6, 1, 0, 0, 0),
(90, 9, 7, 1, 0, 0, 0),
(91, 9, 19, 1, 0, 0, 0),
(92, 9, 21, 1, 0, 0, 0),
(93, 9, 17, 1, 0, 0, 0),
(94, 9, 15, 1, 0, 0, 0),
(95, 9, 14, 1, 0, 0, 0),
(96, 9, 13, 1, 0, 0, 0),
(97, 9, 12, 1, 0, 0, 0),
(98, 9, 11, 1, 0, 0, 0),
(99, 9, 10, 1, 0, 0, 0),
(100, 9, 8, 1, 0, 0, 0),
(101, 5, 17, 1, 0, 0, 0),
(102, 9, 20, 1, 0, 0, 0),
(103, 10, 6, 1, 0, 0, 0),
(104, 10, 7, 1, 0, 0, 0),
(105, 10, 21, 1, 0, 0, 0),
(106, 10, 20, 1, 0, 0, 0),
(107, 10, 19, 1, 0, 0, 0),
(108, 10, 17, 1, 0, 0, 0),
(109, 10, 15, 1, 0, 0, 0),
(110, 10, 14, 1, 0, 0, 0),
(111, 10, 13, 1, 0, 0, 0),
(112, 10, 12, 1, 0, 0, 0),
(113, 10, 11, 1, 0, 0, 0),
(114, 10, 10, 1, 0, 0, 0),
(115, 10, 8, 1, 0, 0, 0),
(116, 11, 21, 1, 0, 0, 0),
(117, 11, 19, 1, 0, 0, 0),
(118, 11, 17, 1, 0, 0, 0),
(119, 11, 15, 1, 0, 0, 0),
(120, 11, 14, 1, 0, 0, 0),
(121, 11, 13, 1, 0, 0, 0),
(122, 11, 12, 1, 0, 0, 0),
(123, 11, 11, 1, 0, 0, 0),
(124, 11, 10, 1, 0, 0, 0),
(125, 11, 8, 1, 0, 0, 0),
(126, 11, 7, 1, 0, 0, 0),
(127, 11, 6, 1, 0, 0, 0),
(128, 12, 6, 1, 0, 0, 0),
(129, 12, 7, 1, 0, 0, 0),
(130, 12, 21, 1, 0, 0, 0),
(131, 12, 19, 1, 0, 0, 0),
(132, 12, 17, 1, 0, 0, 0),
(133, 12, 15, 1, 0, 0, 0),
(134, 12, 14, 1, 0, 0, 0),
(135, 12, 13, 1, 0, 0, 0),
(136, 12, 12, 1, 0, 0, 0),
(137, 12, 11, 1, 0, 0, 0),
(138, 12, 10, 1, 0, 0, 0),
(139, 12, 8, 1, 0, 0, 0),
(140, 12, 20, 1, 0, 0, 0),
(141, 13, 21, 1, 0, 0, 0),
(142, 13, 19, 1, 0, 0, 0),
(143, 13, 17, 1, 0, 0, 0),
(144, 13, 15, 1, 0, 0, 0),
(145, 13, 14, 1, 0, 0, 0),
(146, 13, 13, 1, 0, 0, 0),
(147, 13, 12, 1, 0, 0, 0),
(148, 13, 11, 1, 0, 0, 0),
(149, 13, 10, 1, 0, 0, 0),
(150, 13, 8, 1, 0, 0, 0),
(151, 13, 7, 1, 0, 0, 0),
(152, 13, 6, 1, 0, 0, 0),
(153, 13, 20, 1, 0, 0, 0),
(154, 13, 16, 1, 0, 0, 0),
(155, 5, 21, 1, 0, 0, 0),
(156, 14, 6, 1, 0, 0, 0),
(157, 14, 7, 1, 0, 0, 0),
(158, 14, 8, 1, 0, 0, 0),
(159, 14, 10, 1, 0, 0, 0),
(160, 14, 11, 1, 0, 0, 0),
(161, 14, 12, 1, 0, 0, 0),
(162, 14, 13, 1, 0, 0, 0),
(163, 14, 14, 1, 0, 0, 0),
(164, 14, 15, 1, 0, 0, 0),
(165, 14, 17, 1, 0, 0, 0),
(166, 14, 19, 1, 0, 0, 0),
(167, 14, 20, 1, 0, 0, 0),
(168, 14, 21, 1, 0, 0, 0),
(169, 14, 16, 1, 0, 0, 0),
(170, 6, 16, 1, 0, 0, 0),
(171, 6, 21, 1, 0, 0, 0),
(172, 6, 9, 1, 0, 0, 0),
(173, 15, 6, 1, 0, 0, 0),
(174, 15, 7, 1, 0, 0, 0),
(175, 15, 8, 1, 0, 0, 0),
(176, 15, 10, 1, 0, 0, 0),
(177, 15, 11, 1, 0, 0, 0),
(178, 15, 12, 1, 0, 0, 0),
(179, 15, 13, 1, 0, 0, 0),
(180, 15, 14, 1, 0, 0, 0),
(181, 15, 15, 1, 0, 0, 0),
(182, 15, 16, 1, 0, 0, 0),
(183, 15, 17, 1, 0, 0, 0),
(184, 15, 18, 1, 0, 0, 0),
(185, 15, 19, 1, 0, 0, 0),
(186, 15, 21, 1, 0, 0, 0),
(187, 15, 20, 1, 0, 0, 0),
(188, 16, 6, 1, 0, 0, 0),
(189, 16, 7, 1, 0, 0, 0),
(190, 16, 8, 1, 0, 0, 0),
(191, 16, 10, 1, 0, 0, 0),
(192, 16, 11, 1, 0, 0, 0),
(193, 16, 12, 1, 0, 0, 0),
(194, 16, 13, 1, 0, 0, 0),
(195, 16, 14, 1, 0, 0, 0),
(196, 16, 15, 1, 0, 0, 0),
(197, 16, 16, 1, 0, 0, 0),
(198, 16, 17, 1, 0, 0, 0),
(199, 16, 19, 1, 0, 0, 0),
(200, 16, 20, 1, 0, 0, 0),
(201, 16, 21, 1, 0, 0, 0),
(202, 17, 21, 1, 0, 0, 0),
(203, 17, 19, 1, 0, 0, 0),
(204, 17, 17, 1, 0, 0, 0),
(205, 17, 16, 1, 0, 0, 0),
(206, 17, 15, 1, 0, 0, 0),
(207, 17, 14, 1, 0, 0, 0),
(208, 17, 13, 1, 0, 0, 0),
(209, 17, 12, 1, 0, 0, 0),
(210, 17, 11, 1, 0, 0, 0),
(211, 17, 10, 1, 0, 0, 0),
(212, 17, 8, 1, 0, 0, 0),
(213, 17, 7, 1, 0, 0, 0),
(214, 17, 6, 1, 0, 0, 0),
(215, 17, 20, 1, 0, 0, 0),
(216, 18, 6, 1, 0, 0, 0),
(217, 18, 7, 1, 0, 0, 0),
(218, 18, 21, 1, 0, 0, 0),
(219, 18, 20, 1, 0, 0, 0),
(220, 18, 19, 1, 0, 0, 0),
(221, 18, 17, 1, 0, 0, 0),
(222, 18, 16, 1, 0, 0, 0),
(223, 18, 15, 1, 0, 0, 0),
(224, 18, 14, 1, 0, 0, 0),
(225, 18, 13, 1, 0, 0, 0),
(226, 18, 12, 1, 0, 0, 0),
(227, 18, 11, 1, 0, 0, 0),
(228, 18, 10, 1, 0, 0, 0),
(229, 18, 8, 1, 0, 0, 0),
(230, 19, 7, 1, 0, 0, 0),
(231, 19, 6, 1, 0, 0, 0),
(232, 19, 21, 1, 0, 0, 0),
(233, 19, 20, 1, 0, 0, 0),
(234, 19, 19, 1, 0, 0, 0),
(235, 19, 17, 1, 0, 0, 0),
(236, 19, 16, 1, 0, 0, 0),
(237, 19, 15, 1, 0, 0, 0),
(238, 19, 14, 1, 0, 0, 0),
(239, 19, 13, 1, 0, 0, 0),
(240, 19, 12, 1, 0, 0, 0),
(241, 19, 11, 0, 0, 0, 0),
(242, 19, 10, 1, 0, 0, 0),
(243, 19, 8, 1, 0, 0, 0),
(244, 9, 16, 1, 0, 0, 0),
(245, 20, 6, 1, 0, 0, 0),
(246, 20, 7, 1, 0, 0, 0),
(247, 20, 21, 1, 0, 0, 0),
(248, 20, 19, 1, 0, 0, 0),
(249, 20, 18, 0, 0, 0, 0),
(250, 20, 17, 1, 0, 0, 0),
(251, 20, 16, 1, 0, 0, 0),
(252, 20, 15, 1, 0, 0, 0),
(253, 20, 14, 1, 0, 0, 0),
(254, 20, 13, 1, 0, 0, 0),
(255, 20, 12, 1, 0, 0, 0),
(256, 20, 10, 1, 0, 0, 0),
(257, 20, 8, 1, 0, 0, 0),
(258, 20, 20, 1, 0, 0, 0),
(259, 21, 6, 1, 0, 0, 0),
(260, 21, 7, 1, 0, 0, 0),
(261, 21, 21, 1, 0, 0, 0),
(262, 21, 20, 1, 0, 0, 0),
(263, 21, 19, 1, 0, 0, 0),
(264, 21, 17, 1, 0, 0, 0),
(265, 21, 16, 1, 0, 0, 0),
(266, 21, 15, 1, 0, 0, 0),
(267, 21, 14, 1, 0, 0, 0),
(268, 21, 13, 1, 0, 0, 0),
(269, 21, 12, 1, 0, 0, 0),
(270, 21, 11, 1, 0, 0, 0),
(271, 21, 10, 1, 0, 0, 0),
(272, 21, 8, 1, 0, 0, 0),
(273, 22, 7, 1, 0, 0, 0),
(274, 22, 6, 1, 0, 0, 0),
(275, 22, 21, 1, 0, 0, 0),
(276, 22, 20, 1, 0, 0, 0),
(277, 22, 19, 1, 0, 0, 0),
(278, 22, 17, 1, 0, 0, 0),
(279, 22, 16, 1, 0, 0, 0),
(280, 22, 15, 1, 0, 0, 0),
(281, 22, 14, 1, 0, 0, 0),
(282, 22, 13, 1, 0, 0, 0),
(283, 22, 12, 1, 0, 0, 0),
(284, 22, 10, 1, 0, 0, 0),
(285, 22, 11, 1, 0, 0, 0),
(286, 22, 8, 1, 0, 0, 0),
(287, 23, 7, 1, 0, 0, 0),
(288, 23, 6, 1, 0, 0, 0),
(289, 23, 21, 1, 0, 0, 0),
(290, 23, 20, 1, 0, 0, 0),
(291, 23, 19, 1, 0, 0, 0),
(292, 23, 16, 1, 0, 0, 0),
(293, 23, 17, 1, 0, 0, 0),
(294, 23, 15, 1, 0, 0, 0),
(295, 23, 14, 1, 0, 0, 0),
(296, 23, 13, 1, 0, 0, 0),
(297, 23, 12, 1, 0, 0, 0),
(298, 23, 11, 1, 0, 0, 0),
(299, 23, 10, 1, 0, 0, 0),
(300, 23, 8, 1, 0, 0, 0),
(301, 24, 6, 1, 0, 0, 0),
(302, 24, 7, 1, 0, 0, 0),
(303, 24, 21, 1, 0, 0, 0),
(304, 24, 20, 1, 0, 0, 0),
(305, 24, 19, 1, 0, 0, 0),
(306, 24, 17, 1, 0, 0, 0),
(307, 24, 16, 1, 0, 0, 0),
(308, 24, 15, 1, 0, 0, 0),
(309, 24, 14, 1, 0, 0, 0),
(310, 24, 13, 1, 0, 0, 0),
(311, 24, 12, 1, 0, 0, 0),
(312, 24, 11, 1, 0, 0, 0),
(313, 24, 10, 1, 0, 0, 0),
(314, 24, 8, 1, 0, 0, 0),
(315, 25, 7, 1, 0, 0, 0),
(316, 25, 6, 1, 0, 0, 0),
(317, 25, 21, 1, 0, 0, 0),
(318, 25, 20, 1, 0, 0, 0),
(319, 25, 19, 1, 0, 0, 0),
(320, 25, 17, 1, 0, 0, 0),
(321, 25, 16, 1, 0, 0, 0),
(322, 25, 15, 1, 0, 0, 0),
(323, 25, 14, 1, 0, 0, 0),
(324, 25, 13, 1, 0, 0, 0),
(325, 25, 12, 1, 0, 0, 0),
(326, 25, 11, 1, 0, 0, 0),
(327, 25, 10, 1, 0, 0, 0),
(328, 25, 8, 1, 0, 0, 0),
(329, 26, 6, 1, 0, 0, 0),
(330, 26, 7, 1, 0, 0, 0),
(331, 26, 21, 1, 0, 0, 0),
(332, 26, 20, 1, 0, 0, 0),
(333, 26, 19, 1, 0, 0, 0),
(334, 26, 17, 1, 0, 0, 0),
(335, 26, 16, 1, 0, 0, 0),
(336, 26, 15, 1, 0, 0, 0),
(337, 26, 14, 1, 0, 0, 0),
(338, 26, 13, 1, 0, 0, 0),
(339, 26, 12, 1, 0, 0, 0),
(340, 26, 11, 1, 0, 0, 0),
(341, 26, 10, 1, 0, 0, 0),
(342, 26, 8, 1, 0, 0, 0),
(343, 10, 16, 1, 0, 0, 0),
(344, 12, 16, 1, 0, 0, 0),
(345, 27, 6, 1, 0, 0, 0),
(346, 27, 7, 1, 0, 0, 0),
(347, 27, 8, 1, 0, 0, 0),
(348, 27, 10, 1, 1, 1, 1),
(349, 27, 11, 1, 0, 0, 0),
(350, 27, 12, 1, 0, 0, 0),
(351, 27, 13, 1, 0, 0, 0),
(352, 27, 14, 1, 0, 0, 0),
(353, 27, 15, 1, 0, 0, 0),
(354, 27, 16, 1, 0, 0, 0),
(355, 27, 17, 1, 0, 0, 0),
(356, 27, 18, 1, 0, 0, 0),
(357, 27, 19, 1, 0, 0, 0),
(358, 27, 20, 1, 0, 0, 0),
(359, 27, 21, 1, 0, 0, 0),
(360, 27, 22, 1, 0, 0, 0),
(361, 27, 9, 1, 0, 0, 0),
(362, 5, 2, 1, 1, 1, 1),
(363, 27, 24, 1, 1, 1, 1),
(364, 27, 25, 1, 1, 1, 1),
(365, 28, 6, 1, 1, 1, 1),
(366, 28, 7, 1, 1, 1, 1),
(367, 28, 8, 1, 1, 1, 1),
(368, 28, 10, 1, 1, 1, 1),
(369, 28, 11, 1, 1, 1, 1),
(370, 28, 2, 1, 1, 1, 1),
(371, 28, 3, 1, 1, 1, 1),
(372, 28, 9, 1, 0, 0, 0),
(373, 28, 12, 1, 1, 1, 1),
(374, 28, 13, 1, 1, 1, 1),
(375, 28, 14, 1, 1, 1, 1),
(376, 28, 15, 1, 1, 1, 1),
(377, 28, 16, 1, 1, 1, 1),
(378, 28, 17, 1, 1, 1, 1),
(379, 28, 18, 1, 1, 1, 1),
(380, 28, 19, 1, 1, 1, 1),
(381, 28, 20, 1, 1, 1, 1),
(382, 28, 21, 1, 1, 1, 1),
(383, 28, 24, 1, 1, 1, 1),
(384, 28, 25, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblRemain`
--

CREATE TABLE `tblRemain` (
  `rmnAutoID` int(10) NOT NULL,
  `rmn_invAutoID` int(10) NOT NULL,
  `rmn_endAutoID` int(10) NOT NULL,
  `rmnDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblRemain`
--

INSERT INTO `tblRemain` (`rmnAutoID`, `rmn_invAutoID`, `rmn_endAutoID`, `rmnDateTime`) VALUES
(1, 1, 13, '2021-10-14 03:55:24'),
(2, 1, 14, '2021-10-14 03:55:24'),
(3, 1, 15, '2021-10-14 03:55:24'),
(4, 1, 16, '2021-10-14 03:55:24'),
(5, 1, 36, '2021-10-14 03:55:24'),
(6, 1, 37, '2021-10-14 03:55:24'),
(7, 1, 38, '2021-10-14 03:55:24'),
(8, 3, 69, '2021-12-30 14:25:06'),
(9, 7, 5, '2022-01-11 07:40:11'),
(10, 8, 3, '2022-01-12 02:23:33');

-- --------------------------------------------------------

--
-- Table structure for table `tblReportBranch`
--

CREATE TABLE `tblReportBranch` (
  `rpbAutoID` int(10) NOT NULL,
  `rpb_braAutoID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblReportBranch`
--

INSERT INTO `tblReportBranch` (`rpbAutoID`, `rpb_braAutoID`) VALUES
(5, 4),
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tblRequireBooking`
--

CREATE TABLE `tblRequireBooking` (
  `rboAutoID` int(10) NOT NULL,
  `rbo_selAutoID` int(10) NOT NULL,
  `rbo_driAutoID` int(10) UNSIGNED DEFAULT NULL,
  `rboDatetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rboAmount` int(10) NOT NULL,
  `rboLocation` text COLLATE utf8_unicode_ci NOT NULL,
  `rboDriverType` tinyint(1) DEFAULT NULL,
  `rboStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblRequireBooking`
--

INSERT INTO `tblRequireBooking` (`rboAutoID`, `rbo_selAutoID`, `rbo_driAutoID`, `rboDatetime`, `rboAmount`, `rboLocation`, `rboDriverType`, `rboStatus`) VALUES
(1, 1, NULL, '2021-08-05 11:01:37', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(2, 2, NULL, '2021-08-05 11:10:47', 1, '{\"latitude\":11.540899537948395,\"longitude\":104.82978243380785}', NULL, 0),
(3, 9, NULL, '2021-08-06 08:30:49', 1, '{\"latitude\":11.58939849747911,\"longitude\":104.86758766695857}', NULL, 0),
(4, 9, NULL, '2021-08-06 08:31:31', 5, '{\"latitude\":11.589392257106427,\"longitude\":104.86759068444371}', NULL, 0),
(5, 8, NULL, '2021-08-06 08:39:34', 4, '{\"latitude\":11.58939652683512,\"longitude\":104.8675893433392}', NULL, 0),
(6, 8, NULL, '2021-08-06 08:40:44', 1, '{\"latitude\":11.589392913987773,\"longitude\":104.86759034916759}', NULL, 0),
(7, 11, NULL, '2021-08-06 13:38:18', 88000, '{\"latitude\":11.534767571394214,\"longitude\":104.93509517982602}', NULL, 0),
(8, 21, NULL, '2021-08-06 22:35:21', 2, '{\"latitude\":11.993889721660702,\"longitude\":105.45344866812229}', NULL, 0),
(9, 13, NULL, '2021-08-07 12:26:56', 1, '{\"latitude\":11.56794458700071,\"longitude\":104.87484253942966}', NULL, 0),
(10, 16, NULL, '2021-08-08 12:28:13', 3, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(11, 16, NULL, '2021-08-08 13:38:34', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(12, 17, NULL, '2021-08-08 15:47:24', 1, '{\"latitude\":11.502884537713875,\"longitude\":104.93604887276888}', NULL, 0),
(13, 17, NULL, '2021-08-08 15:48:31', 1, '{\"latitude\":11.502896036683428,\"longitude\":104.93605423718691}', NULL, 0),
(14, 18, NULL, '2021-08-08 19:32:17', 1, '{\"latitude\":11.538316381147204,\"longitude\":104.91292253136635}', NULL, 0),
(15, 15, NULL, '2021-08-09 09:10:12', 1, '{\"latitude\":11.540954889145194,\"longitude\":104.81952231377363}', NULL, 0),
(16, 15, NULL, '2021-08-09 09:12:04', 1, '{\"latitude\":11.54093616467421,\"longitude\":104.81952030211687}', NULL, 0),
(17, 18, NULL, '2021-08-09 11:38:59', 1, '{\"latitude\":11.538338062184966,\"longitude\":104.91285782307386}', NULL, 0),
(18, 20, NULL, '2021-08-09 15:50:03', 1, '{\"latitude\":11.56400789432952,\"longitude\":104.89647405222058}', NULL, 0),
(19, 22, NULL, '2021-08-09 21:45:47', 2, '{\"latitude\":13.362784694503294,\"longitude\":103.85107219219208}', NULL, 0),
(20, 23, NULL, '2021-08-10 07:18:31', 3, '{\"latitude\":11.456364578488138,\"longitude\":104.96138887479901}', NULL, 0),
(21, 15, NULL, '2021-08-10 08:33:41', 1, '{\"latitude\":11.540993648142061,\"longitude\":104.81955416500568}', NULL, 0),
(22, 20, 1, '2021-08-10 10:27:08', 1, '{\"latitude\":11.564057166533708,\"longitude\":104.89639827981591}', NULL, 1),
(23, 24, NULL, '2021-08-10 13:56:11', 1, '{\"latitude\":11.583031931118876,\"longitude\":104.90745501592755}', NULL, 0),
(24, 20, NULL, '2021-08-10 15:19:26', 1, '{\"latitude\":11.564006910875875,\"longitude\":104.89648209884763}', NULL, 0),
(25, 15, NULL, '2021-08-11 06:48:10', 3, '{\"latitude\":11.541003341909155,\"longitude\":104.81949716806412}', NULL, 0),
(26, 15, NULL, '2021-08-11 08:17:57', 3, '{\"latitude\":11.541044403051938,\"longitude\":104.81958266347647}', NULL, 0),
(27, 25, NULL, '2021-08-11 10:12:02', 1, '{\"latitude\":11.526312717093855,\"longitude\":104.96077431365848}', NULL, 0),
(28, 16, NULL, '2021-08-11 13:09:06', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(29, 20, NULL, '2021-08-12 12:32:50', 1, '{\"latitude\":11.564057166533708,\"longitude\":104.89639727398753}', NULL, 0),
(30, 16, NULL, '2021-08-14 11:19:01', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(31, 26, NULL, '2021-08-14 11:55:05', 2, '{\"latitude\":11.599721521281086,\"longitude\":104.90371283143759}', NULL, 0),
(32, 26, NULL, '2021-08-14 11:57:22', 2, '{\"latitude\":11.599725298208142,\"longitude\":104.90372255444527}', NULL, 0),
(33, 16, 1, '2021-08-16 12:40:51', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 1),
(34, 28, NULL, '2021-08-16 19:19:31', 1, '{\"latitude\":11.573853293085556,\"longitude\":104.92740277200937}', NULL, 0),
(35, 6, NULL, '2021-08-16 22:29:04', 1, '{\"latitude\":11.601660228120421,\"longitude\":104.91035733371973}', NULL, 0),
(36, 15, 2, '2021-08-17 08:41:05', 1, '{\"latitude\":11.5409860927006,\"longitude\":104.81953606009483}', NULL, 1),
(37, 16, NULL, '2021-08-17 11:50:45', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(38, 9, NULL, '2021-08-17 14:11:22', 1, '{\"latitude\":11.589500310129004,\"longitude\":104.86753419041634}', NULL, 0),
(39, 28, NULL, '2021-08-17 14:18:44', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(40, 39, NULL, '2021-08-18 00:15:00', 1, '{\"latitude\":11.518310475694781,\"longitude\":104.94722798466682}', NULL, 0),
(41, 15, NULL, '2021-08-18 09:26:36', 1, '{\"latitude\":11.540963262125292,\"longitude\":104.81949113309383}', NULL, 0),
(42, 6, NULL, '2021-08-18 11:07:15', 1, '{\"latitude\":11.55137496097051,\"longitude\":104.90171525627375}', NULL, 0),
(43, 6, NULL, '2021-08-18 11:09:50', 1, '{\"latitude\":11.592786999525245,\"longitude\":104.91520274430513}', NULL, 0),
(44, 40, NULL, '2021-08-18 13:16:28', 3, '{\"latitude\":11.594311922664737,\"longitude\":104.9032424390316}', NULL, 0),
(45, 39, NULL, '2021-08-18 13:58:02', 1, '{\"latitude\":11.518257090541862,\"longitude\":104.94710627943277}', NULL, 0),
(46, 6, NULL, '2021-08-19 14:04:27', 1, '{\"latitude\":11.59280440462659,\"longitude\":104.91522520780563}', NULL, 0),
(47, 6, NULL, '2021-08-20 10:09:09', 2, '{\"latitude\":11.592888649380154,\"longitude\":104.9152409657836}', NULL, 0),
(48, 45, NULL, '2021-08-20 12:45:19', 1, '{\"latitude\":11.565345256405418,\"longitude\":104.8960604891181}', NULL, 0),
(49, 16, NULL, '2021-08-20 17:03:02', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(50, 48, NULL, '2021-08-20 18:41:14', 1, '{\"latitude\":11.512830153413237,\"longitude\":104.81982925906777}', NULL, 0),
(51, 50, NULL, '2021-08-21 11:04:48', 1, '{\"latitude\":11.552163324074932,\"longitude\":104.88466646522284}', NULL, 0),
(52, 51, NULL, '2021-08-21 12:51:57', 2, '{\"latitude\":11.573414143155972,\"longitude\":104.92644924670458}', NULL, 0),
(53, 53, NULL, '2021-08-21 13:45:43', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(54, 54, NULL, '2021-08-21 14:20:47', 1, '{\"latitude\":11.545100657457542,\"longitude\":104.86475307494402}', NULL, 0),
(55, 55, NULL, '2021-08-21 18:01:59', 1, '{\"latitude\":11.587949738016327,\"longitude\":104.91512395441532}', NULL, 0),
(56, 57, NULL, '2021-08-21 20:43:40', 3, '{\"latitude\":11.55240163986811,\"longitude\":104.90820351988077}', NULL, 0),
(57, 61, 2, '2021-08-22 11:27:21', 2, '{\"latitude\":11.55330496965566,\"longitude\":104.91510920226574}', NULL, 1),
(58, 56, 2, '2021-08-22 11:31:05', 1, '{\"latitude\":11.526364125713995,\"longitude\":104.91392131894827}', NULL, 1),
(59, 51, 2, '2021-08-22 13:14:43', 1, '{\"latitude\":11.573540764243235,\"longitude\":104.92668695747852}', NULL, 1),
(60, 15, 2, '2021-08-23 13:59:21', 1, '{\"latitude\":11.541026336728976,\"longitude\":104.81954846531153}', NULL, 1),
(61, 42, NULL, '2021-08-24 08:02:46', 4, '{\"latitude\":11.596424243648674,\"longitude\":104.91803247481585}', NULL, 0),
(62, 42, NULL, '2021-08-24 08:33:35', 5, '{\"latitude\":11.596635755449157,\"longitude\":104.91769686341286}', NULL, 0),
(63, 65, NULL, '2021-08-24 09:57:45', 1, '{\"latitude\":11.577139505344647,\"longitude\":104.9200313910842}', NULL, 0),
(64, 65, NULL, '2021-08-24 10:01:00', 1, '{\"latitude\":11.567213421484304,\"longitude\":104.91456823423505}', NULL, 0),
(65, 9, NULL, '2021-08-25 07:47:31', 1, '{\"latitude\":11.589397512157124,\"longitude\":104.86764131113887}', NULL, 0),
(66, 49, NULL, '2021-08-25 11:49:27', 3, '{\"latitude\":11.52271315534977,\"longitude\":104.9158726260066}', NULL, 0),
(67, 45, NULL, '2021-08-26 08:23:55', 1, '{\"latitude\":11.565405694678635,\"longitude\":104.8961865529418}', NULL, 0),
(68, 45, NULL, '2021-08-26 10:23:36', 1, '{\"latitude\":11.56537022451159,\"longitude\":104.89614866673946}', NULL, 0),
(69, 43, NULL, '2021-08-26 17:11:17', 5, '{\"latitude\":12.3508158313215,\"longitude\":103.76038033515215}', NULL, 0),
(70, 45, NULL, '2021-08-27 09:54:17', 1, '{\"latitude\":11.565379257283983,\"longitude\":104.89616241306067}', NULL, 0),
(71, 45, NULL, '2021-08-27 11:12:46', 1, '{\"latitude\":11.565406519724174,\"longitude\":104.89619627594948}', NULL, 0),
(72, 45, NULL, '2021-08-28 08:01:48', 1, '{\"latitude\":11.565397482957493,\"longitude\":104.89613492041826}', NULL, 0),
(73, 45, NULL, '2021-08-28 08:02:10', 1, '{\"latitude\":11.565397482957493,\"longitude\":104.89618822932243}', NULL, 0),
(74, 45, NULL, '2021-08-28 08:02:41', 1, '{\"latitude\":11.565305840133236,\"longitude\":104.89624656736851}', NULL, 0),
(75, 45, NULL, '2021-08-30 08:08:35', 2, '{\"latitude\":11.565369896010568,\"longitude\":104.89618185907602}', NULL, 0),
(76, 45, NULL, '2021-09-01 08:47:36', 1, '{\"latitude\":11.565399453770588,\"longitude\":104.89626534283161}', NULL, 0),
(77, 28, NULL, '2021-09-01 08:47:39', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(78, 28, NULL, '2021-09-01 08:50:02', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(79, 45, 2, '2021-09-01 09:24:11', 1, '{\"latitude\":11.56540996477353,\"longitude\":104.89616945385933}', NULL, 0),
(80, 15, NULL, '2021-09-01 13:49:53', 2, '{\"latitude\":11.540981822233599,\"longitude\":104.81954544782639}', NULL, 0),
(81, 17, NULL, '2021-09-02 09:29:44', 2, '{\"latitude\":11.502787619721136,\"longitude\":104.93596974760294}', NULL, 0),
(82, 28, NULL, '2021-09-02 16:02:22', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(83, 28, NULL, '2021-09-02 16:07:54', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(84, 28, NULL, '2021-09-02 16:09:20', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(85, 73, NULL, '2021-09-03 11:00:07', 1, '{\"latitude\":13.361358707450481,\"longitude\":103.87661838904023}', NULL, 0),
(86, 70, NULL, '2021-09-05 12:58:56', 2, '{\"latitude\":11.62033162484753,\"longitude\":104.88906478509307}', NULL, 0),
(87, 78, NULL, '2021-09-07 07:17:52', 10, '{\"latitude\":11.614251135096687,\"longitude\":104.82867199927568}', NULL, 0),
(88, 78, NULL, '2021-09-07 07:18:42', 5, '{\"latitude\":11.614380707522646,\"longitude\":104.82877559959888}', NULL, 0),
(89, 28, NULL, '2021-09-07 09:05:49', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(90, 57, NULL, '2021-09-08 11:09:25', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(91, 76, NULL, '2021-09-09 11:54:52', 1, '{\"latitude\":11.630007555118993,\"longitude\":104.89718902856112}', NULL, 0),
(92, 76, NULL, '2021-09-09 11:55:42', 1, '{\"latitude\":11.630055831033193,\"longitude\":104.89719606935978}', NULL, 0),
(93, 81, NULL, '2021-09-09 18:15:20', 2, '{\"latitude\":11.623296438115613,\"longitude\":104.87791635096073}', NULL, 0),
(94, 28, NULL, '2021-09-10 14:40:41', 4, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(95, 28, NULL, '2021-09-11 09:43:22', 4, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(96, 28, NULL, '2021-09-15 09:07:50', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(97, 7, 1, '2021-09-16 15:36:29', 1, '{\"latitude\":11.529998623117912,\"longitude\":104.89082280546427}', NULL, 1),
(98, 15, NULL, '2021-09-20 15:33:19', 1, '{\"latitude\":11.540959484405107,\"longitude\":104.81950052082539}', NULL, 0),
(99, 15, NULL, '2021-09-21 07:46:18', 1, '{\"latitude\":11.541047526052925,\"longitude\":104.81961216777563}', NULL, 0),
(100, 15, 2, '2021-09-24 08:00:57', 3, '{\"latitude\":11.540962609517754,\"longitude\":104.81951896101236}', NULL, 0),
(101, 87, NULL, '2021-10-01 10:40:03', 1, '{\"latitude\":13.096607840518882,\"longitude\":103.20775710046291}', NULL, 0),
(102, 66, NULL, '2021-10-03 14:44:40', 1, '{\"latitude\":11.523461852693352,\"longitude\":104.91234870627522}', NULL, 0),
(103, 10, NULL, '2021-10-10 11:33:33', 1, '{\"latitude\":11.684035737429024,\"longitude\":104.84673919156194}', NULL, 0),
(104, 10, NULL, '2021-10-10 11:35:54', 2, '{\"latitude\":11.67856764587952,\"longitude\":104.85060861334205}', NULL, 0),
(105, 93, NULL, '2021-10-11 23:03:59', 1, '{\"latitude\":11.611575403772736,\"longitude\":104.9158900603652}', NULL, 0),
(106, 94, NULL, '2021-10-12 17:25:12', 2, '{\"latitude\":11.566749297606822,\"longitude\":104.90360772237182}', NULL, 0),
(107, 94, NULL, '2021-10-13 06:46:48', 3, '{\"latitude\":11.566757509429552,\"longitude\":104.90361476317048}', NULL, 0),
(108, 1, NULL, '2021-10-13 13:48:47', 1, '{\"latitude\":11.56613933291451,\"longitude\":104.89218654111028}', NULL, 0),
(109, 1, NULL, '2021-10-13 13:49:52', 1, '{\"latitude\":11.566094332685434,\"longitude\":104.89158974960446}', NULL, 0),
(110, 1, 1, '2021-10-13 13:53:30', 2, '{\"latitude\":11.566181048232705,\"longitude\":104.8917325772345}', NULL, 1),
(111, 1, 1, '2021-10-13 14:28:16', 1, '{\"latitude\":11.566185646783708,\"longitude\":104.8917500115931}', NULL, 1),
(112, 1, 1, '2021-10-14 11:42:22', 5, '{\"latitude\":11.566186960655399,\"longitude\":104.8917174898088}', NULL, 1),
(113, 87, NULL, '2021-10-14 13:08:34', 1, '{\"latitude\":13.598158478445008,\"longitude\":102.96746637672186}', NULL, 0),
(114, 7, 1, '2021-10-15 13:24:33', 10, '{\"latitude\":11.566096463798637,\"longitude\":104.89181622862816}', NULL, 1),
(115, 87, NULL, '2021-10-15 15:22:50', 2, '{\"latitude\":11.576142478209633,\"longitude\":104.85374495387077}', NULL, 0),
(116, 7, 1, '2021-10-16 08:32:42', 10, '{\"latitude\":11.565948653145956,\"longitude\":104.89197615534067}', NULL, 1),
(117, 87, NULL, '2021-10-17 13:03:43', 1, '{\"latitude\":10.866898052402702,\"longitude\":104.51054558157921}', NULL, 0),
(118, 87, NULL, '2021-10-17 16:05:15', 2, '{\"latitude\":10.617949934391671,\"longitude\":104.19194608926773}', NULL, 0),
(119, 86, NULL, '2021-10-20 19:44:12', 1, '{\"latitude\":11.521619514018099,\"longitude\":104.90758795291185}', NULL, 0),
(120, 104, NULL, '2021-10-23 08:51:53', 2, '{\"latitude\":10.302419809702073,\"longitude\":104.46959747001529}', NULL, 0),
(121, 104, NULL, '2021-10-23 08:53:42', 0, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(122, 106, NULL, '2021-10-23 09:26:55', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(123, 107, NULL, '2021-10-23 21:44:45', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(124, 107, NULL, '2021-10-23 21:47:32', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(125, 107, NULL, '2021-10-24 08:26:22', 1, '{\"latitude\":11.565840426780817,\"longitude\":104.89757912233472}', NULL, 0),
(126, 107, NULL, '2021-10-24 12:37:09', 1, '{\"latitude\":11.56580462373046,\"longitude\":104.89764684811234}', NULL, 0),
(127, 87, NULL, '2021-10-26 14:46:33', 2, '{\"latitude\":11.55278071024982,\"longitude\":104.90686610341072}', NULL, 0),
(128, 109, NULL, '2021-10-27 14:52:43', 1, '{\"latitude\":11.55523500359238,\"longitude\":104.90649897605181}', NULL, 0),
(129, 109, NULL, '2021-10-27 14:53:00', 1, '{\"latitude\":11.55281142677973,\"longitude\":104.90657474845648}', NULL, 0),
(130, 110, NULL, '2021-10-28 08:25:04', 2, '{\"latitude\":11.524463826772145,\"longitude\":104.88462522625923}', NULL, 0),
(131, 91, NULL, '2021-11-01 11:42:55', 1, '{\"latitude\":12.936316486454874,\"longitude\":104.57464300096035}', NULL, 0),
(132, 110, NULL, '2021-11-06 03:02:17', 1, '{\"latitude\":11.52439155306924,\"longitude\":104.8845350369811}', NULL, 0),
(133, 13, NULL, '2021-11-06 15:34:41', 1, '{\"latitude\":11.452484067814463,\"longitude\":104.89709733054042}', NULL, 0),
(134, 117, 5, '2021-11-24 11:29:18', 1, '{\"latitude\":11.570387044562295,\"longitude\":104.8536017909646}', NULL, 1),
(135, 24, NULL, '2021-11-25 11:11:53', 1, '{\"latitude\":11.582990875097538,\"longitude\":104.90748854354024}', NULL, 0),
(136, 107, NULL, '2021-11-29 12:39:07', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(137, 87, NULL, '2021-11-29 14:09:29', 2, '{\"latitude\":11.591704465927126,\"longitude\":104.85337179154158}', NULL, 0),
(138, 87, NULL, '2021-12-01 09:22:07', 1, '{\"latitude\":11.59160691983806,\"longitude\":104.85343482345343}', NULL, 0),
(139, 107, NULL, '2021-12-01 15:02:14', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', NULL, 0),
(140, 120, NULL, '2021-12-01 22:23:52', 3, '{\"latitude\":11.532597788635515,\"longitude\":104.9113549478352}', NULL, 0),
(141, 121, NULL, '2021-12-02 09:33:02', 66962773, '{\"latitude\":13.818145152819081,\"longitude\":104.80877285823226}', NULL, 0),
(142, 122, NULL, '2021-12-03 22:06:31', 2, '{\"latitude\":11.532587933417041,\"longitude\":104.91135528311133}', NULL, 0),
(143, 73, NULL, '2021-12-04 16:33:34', 1, '{\"latitude\":11.532530116128367,\"longitude\":104.86857606098056}', NULL, 0),
(144, 1, NULL, '2021-12-09 09:32:39', 1, '{\"latitude\":13.703863943890525,\"longitude\":100.53802220150828}', 1, 0),
(145, 1, NULL, '2021-12-09 09:36:50', 2, '{\"latitude\":13.703896191343459,\"longitude\":100.53805438801646}', 2, 0),
(146, 1, NULL, '2021-12-09 09:36:59', 2, '{\"latitude\":13.703864269622393,\"longitude\":100.53803963586688}', 3, 0),
(147, 1, NULL, '2021-12-09 09:49:19', 6, '{\"latitude\":13.703870458527838,\"longitude\":100.53804935887456}', 1, 0),
(148, 99, NULL, '2021-12-11 13:42:57', 2, '{\"latitude\":13.116478591414307,\"longitude\":103.20212932303548}', 1, 0),
(149, 87, 5, '2021-12-17 15:15:25', 1, '{\"latitude\":11.59168640183912,\"longitude\":104.8534120246768}', 1, 1),
(150, 153, 6, '2021-12-18 14:03:37', 1, '{\"latitude\":11.548621747979823,\"longitude\":104.91371110081673}', 1, 1),
(151, 158, 6, '2021-12-19 15:34:27', 1, '{\"latitude\":11.500538249195156,\"longitude\":104.88291716203094}', 1, 1),
(152, 160, NULL, '2021-12-19 18:15:16', 2, '{\"latitude\":11.520929624845682,\"longitude\":104.87882712855935}', 1, 0),
(153, 160, NULL, '2021-12-19 18:15:54', 2, '{\"latitude\":11.520763721731917,\"longitude\":104.87912217155099}', 1, 0),
(154, 160, NULL, '2021-12-19 19:54:09', 2, '{\"latitude\":11.520906299859359,\"longitude\":104.87901153042912}', 1, 0),
(155, 160, 6, '2021-12-20 06:54:14', 1, '{\"latitude\":11.520915826966686,\"longitude\":104.8789313994348}', 1, 1),
(156, 158, 5, '2021-12-20 08:51:02', 2, '{\"latitude\":11.500589502168623,\"longitude\":104.88290777429938}', 1, 1),
(157, 160, 2, '2021-12-20 11:30:50', 1, '{\"latitude\":11.520909913589762,\"longitude\":104.87891061231494}', 1, 0),
(158, 160, 2, '2021-12-20 11:30:59', 1, '{\"latitude\":11.520909913589762,\"longitude\":104.87891061231494}', 1, 0),
(159, 157, 6, '2021-12-20 12:07:22', 1, '{\"latitude\":11.500624159723259,\"longitude\":104.882917329669}', 1, 1),
(160, 160, 5, '2021-12-20 14:25:34', 1, '{\"latitude\":11.520880346703299,\"longitude\":104.8788801021874}', 1, 1),
(161, 158, 2, '2021-12-20 15:20:54', 2, '{\"latitude\":11.500529707032001,\"longitude\":104.88291515037417}', 1, 0),
(162, 160, 6, '2021-12-20 15:31:16', 1, '{\"latitude\":11.52668820906224,\"longitude\":104.87932601943612}', 1, 0),
(163, 160, 5, '2021-12-21 09:14:50', 2, '{\"latitude\":11.5209187836551,\"longitude\":104.87892905250192}', 1, 1),
(164, 158, 6, '2021-12-21 11:54:06', 1, '{\"latitude\":11.500542520276639,\"longitude\":104.88292152062058}', 1, 0),
(165, 162, 2, '2021-12-21 13:50:45', 5, '{\"latitude\":\"\",\"longitude\":\"\"}', 1, 0),
(166, 160, 6, '2021-12-21 13:51:24', 1, '{\"latitude\":11.520922068864406,\"longitude\":104.87891362980008}', 1, 1),
(167, 160, 6, '2021-12-22 07:41:05', 1, '{\"latitude\":11.520919769217892,\"longitude\":104.87892771139741}', 1, 1),
(168, 158, 6, '2021-12-22 08:24:35', 2, '{\"latitude\":11.500557304788945,\"longitude\":104.8829141445458}', 1, 1),
(169, 152, 6, '2021-12-22 09:13:20', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', 1, 0),
(170, 160, 5, '2021-12-22 10:04:49', 1, '{\"latitude\":11.5209243685109,\"longitude\":104.8788888193667}', 1, 1),
(171, 160, 5, '2021-12-22 11:02:34', 1, '{\"latitude\":11.5209243685109,\"longitude\":104.87891664728522}', 1, 1),
(172, 160, 5, '2021-12-22 14:01:10', 1, '{\"latitude\":11.52091287027824,\"longitude\":104.8789163120091}', 1, 1),
(173, 157, 6, '2021-12-22 15:57:33', 1, '{\"latitude\":11.500616603196638,\"longitude\":104.8828824609518}', 1, 1),
(174, 166, 5, '2021-12-22 15:59:12', 1, '{\"latitude\":11.595921084755034,\"longitude\":104.90163512527943}', 1, 1),
(175, 163, NULL, '2021-12-22 18:55:14', 1, '{\"latitude\":10.979977544802601,\"longitude\":104.77971497923136}', 1, 0),
(176, 160, 5, '2021-12-23 07:26:01', 1, '{\"latitude\":11.531805427966336,\"longitude\":104.885856192559}', 1, 1),
(177, 136, NULL, '2021-12-23 09:17:33', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', 2, 0),
(178, 136, NULL, '2021-12-23 09:18:44', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', 2, 0),
(179, 160, 5, '2021-12-23 09:44:15', 1, '{\"latitude\":11.52091549844575,\"longitude\":104.87892000004649}', 1, 1),
(180, 160, 6, '2021-12-23 09:54:00', 1, '{\"latitude\":11.520926996678302,\"longitude\":104.87891295924783}', 1, 1),
(181, 158, 6, '2021-12-23 10:03:42', 1, '{\"latitude\":11.500545477179156,\"longitude\":104.88292621448636}', 1, 1),
(182, 153, NULL, '2021-12-23 14:47:15', 1, '{\"latitude\":11.548621747979823,\"longitude\":104.91371110081673}', 2, 0),
(183, 160, 6, '2021-12-24 08:45:32', 2, '{\"latitude\":11.520938166389481,\"longitude\":104.87889954820275}', 1, 1),
(184, 160, 6, '2021-12-24 09:21:41', 2, '{\"latitude\":11.520924039989977,\"longitude\":104.87891664728522}', 1, 1),
(185, 153, 6, '2021-12-24 15:04:36', 3, '{\"latitude\":11.548621747979823,\"longitude\":104.91371110081673}', 1, 0),
(186, 160, 6, '2021-12-25 09:04:40', 2, '{\"latitude\":11.52670923396952,\"longitude\":104.87928779795766}', 1, 1),
(187, 160, 6, '2021-12-25 09:13:50', 2, '{\"latitude\":11.520917798092295,\"longitude\":104.87892335280776}', 1, 1),
(188, 160, 6, '2021-12-25 14:01:33', 1, '{\"latitude\":11.520928639282918,\"longitude\":104.87889250740409}', 1, 1),
(189, 160, 6, '2021-12-26 08:05:26', 6, '{\"latitude\":11.520956235038962,\"longitude\":104.87888948991895}', 1, 1),
(190, 160, 6, '2021-12-26 12:15:53', 1, '{\"latitude\":11.520970361436861,\"longitude\":104.87887172028422}', 1, 1),
(191, 157, 6, '2021-12-26 15:41:57', 1, '{\"latitude\":11.50065865690743,\"longitude\":104.88289553672075}', 1, 0),
(192, 157, NULL, '2021-12-26 16:14:10', 1, '{\"latitude\":11.5006550429169,\"longitude\":104.88283853977919}', 1, 0),
(193, 160, 6, '2021-12-27 07:46:31', 1, '{\"latitude\":11.560191371445262,\"longitude\":104.89500118419528}', 1, 1),
(194, 160, NULL, '2021-12-27 08:49:35', 3, '{\"latitude\":11.520921083301621,\"longitude\":104.87892871722579}', 1, 0),
(195, 160, NULL, '2021-12-27 10:46:21', 1, '{\"latitude\":11.52091944069696,\"longitude\":104.878921341151}', 1, 0),
(196, 160, NULL, '2021-12-27 12:45:06', 2, '{\"latitude\":11.520918126613232,\"longitude\":104.87891061231494}', 1, 0),
(197, 160, NULL, '2021-12-27 13:56:10', 2, '{\"latitude\":11.520919769217892,\"longitude\":104.87891430035233}', 1, 0),
(198, 160, NULL, '2021-12-27 17:26:03', 2, '{\"latitude\":11.520927982241076,\"longitude\":104.87891463562846}', 1, 0),
(199, 160, 5, '2021-12-28 13:15:19', 1, '{\"latitude\":11.520924697031827,\"longitude\":104.87891597673297}', 1, 0),
(200, 160, NULL, '2021-12-28 13:15:30', 1, '{\"latitude\":11.520949664621106,\"longitude\":104.87887607887387}', 2, 0),
(201, 160, 5, '2021-12-28 14:53:10', 1, '{\"latitude\":11.52091944069696,\"longitude\":104.87891362980008}', 1, 0),
(202, 160, 5, '2021-12-28 15:00:12', 1, '{\"latitude\":11.5209243685109,\"longitude\":104.878900218755}', 1, 1),
(203, 160, 5, '2021-12-29 07:42:32', 3, '{\"latitude\":11.5209187836551,\"longitude\":104.8789250291884}', 1, 1),
(204, 164, 6, '2021-12-29 09:38:10', 2, '{\"latitude\":11.523291351820085,\"longitude\":104.88055950030684}', 1, 1),
(205, 160, 6, '2021-12-29 09:42:35', 1, '{\"latitude\":11.520921740343475,\"longitude\":104.87892234697938}', 1, 0),
(206, 160, 6, '2021-12-29 09:48:49', 1, '{\"latitude\":11.520918455134163,\"longitude\":104.87891228869557}', 1, 0),
(207, 160, 6, '2021-12-29 10:21:51', 1, '{\"latitude\":11.520927982241076,\"longitude\":104.8789176531136}', 1, 0),
(208, 153, 5, '2021-12-29 10:49:45', 13, '{\"latitude\":11.548621747979823,\"longitude\":104.91371110081673}', 1, 1),
(209, 186, NULL, '2021-12-29 12:12:35', 5, '{\"latitude\":11.503270085386617,\"longitude\":104.8811455629766}', 1, 0),
(210, 160, 6, '2021-12-29 13:05:25', 1, '{\"latitude\":11.520917469571359,\"longitude\":104.8789112828672}', 1, 0),
(211, 160, 6, '2021-12-29 14:26:10', 1, '{\"latitude\":11.52091714105042,\"longitude\":104.87891832366586}', 1, 0),
(212, 184, 5, '2021-12-30 07:24:19', 1, '{\"latitude\":11.485758272858067,\"longitude\":104.94054492563009}', 1, 1),
(213, 73, NULL, '2021-12-30 08:42:09', 1, '{\"latitude\":13.361052413435889,\"longitude\":103.87680882588029}', 1, 0),
(214, 164, NULL, '2021-12-30 09:55:43', 2, '{\"latitude\":11.523288066638466,\"longitude\":104.88059571012855}', 1, 0),
(215, 190, NULL, '2021-12-30 10:29:41', 1, '{\"latitude\":11.55072308115064,\"longitude\":104.90752693265676}', 1, 0),
(216, 186, NULL, '2021-12-30 11:18:43', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', 1, 0),
(217, 190, NULL, '2021-12-30 12:23:17', 2, '{\"latitude\":11.552795660699992,\"longitude\":104.89678334444761}', 1, 0),
(218, 160, NULL, '2021-12-30 12:33:43', 1, '{\"latitude\":11.520916484008552,\"longitude\":104.87892201170325}', 1, 0),
(219, 160, NULL, '2021-12-30 13:06:19', 1, '{\"latitude\":11.520919769217892,\"longitude\":104.87892100587487}', 1, 0),
(220, 191, NULL, '2021-12-31 11:53:27', 2, '{\"latitude\":\"\",\"longitude\":\"\"}', 3, 0),
(221, 160, 6, '2022-01-02 08:43:50', 1, '{\"latitude\":11.52092732519922,\"longitude\":104.87892000004649}', 1, 0),
(222, 160, NULL, '2022-01-02 13:14:25', 1, '{\"latitude\":11.520914841403876,\"longitude\":104.87892771139741}', 1, 0),
(223, 202, 10, '2022-01-04 09:26:51', 1, '{\"latitude\":11.555901783313661,\"longitude\":104.87123027443886}', 2, 0),
(224, 202, NULL, '2022-01-04 09:32:39', 1, '{\"latitude\":11.555911141896466,\"longitude\":104.87111929804087}', 1, 0),
(225, 203, NULL, '2022-01-04 09:43:43', 3, '{\"latitude\":11.505121410899882,\"longitude\":104.8824960552156}', 1, 0),
(226, 204, NULL, '2022-01-04 12:58:02', 1, '{\"latitude\":11.444485080640801,\"longitude\":104.88147161900997}', 1, 0),
(227, 204, NULL, '2022-01-04 12:59:44', 1, '{\"latitude\":11.444186702629935,\"longitude\":104.8817478865385}', 1, 0),
(228, 210, 11, '2022-01-04 15:27:50', 5, '{\"latitude\":13.345007339807058,\"longitude\":103.83443478494883}', 2, 0),
(229, 214, NULL, '2022-01-04 16:53:36', 1, '{\"latitude\":13.084999507105294,\"longitude\":102.46331250295043}', 1, 0),
(230, 204, NULL, '2022-01-04 19:06:47', 1, '{\"latitude\":11.444111779467654,\"longitude\":104.88187495619059}', 1, 0),
(231, 219, 13, '2022-01-05 13:50:37', 4, '{\"latitude\":11.563767618777113,\"longitude\":104.8808260448277}', 2, 0),
(232, 107, NULL, '2022-01-05 20:56:12', 1, '{\"latitude\":\"\",\"longitude\":\"\"}', 1, 0),
(233, 204, NULL, '2022-01-05 21:46:39', 1, '{\"latitude\":11.444136753857284,\"longitude\":104.88196581602097}', 1, 0),
(234, 204, 6, '2022-01-06 08:52:37', 1, '{\"latitude\":11.444103235597016,\"longitude\":104.88187663257122}', 1, 1),
(235, 221, 6, '2022-01-06 12:05:22', 6, '{\"latitude\":11.58519113695893,\"longitude\":104.92927495390177}', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblSeller`
--

CREATE TABLE `tblSeller` (
  `selAutoID` int(10) UNSIGNED NOT NULL,
  `sel_braAutoID` int(10) UNSIGNED NOT NULL,
  `selName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `selEmail` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selPhone` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `selImage` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selPassword` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selAddress` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selProductType` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selBankName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selBankAccountNumber` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selBankAccountName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selStatus` tinyint(1) NOT NULL DEFAULT '0',
  `selPushyToken` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblSeller`
--

INSERT INTO `tblSeller` (`selAutoID`, `sel_braAutoID`, `selName`, `selEmail`, `selPhone`, `selImage`, `selPassword`, `selAddress`, `selProductType`, `selBankName`, `selBankAccountNumber`, `selBankAccountName`, `selStatus`, `selPushyToken`) VALUES
(1, 1, 'Ravy Beauty and Fashion ', NULL, '85598596543', '1_aQRmseDv3VWACLkpUQvf.png', 'ravy862908', NULL, NULL, 'ABA', '001067715 ', 'Loch Ravy', 1, NULL),
(2, 1, 'Family Food', NULL, '85512757661', NULL, 'smilegirl007', NULL, NULL, 'ABA bank', '002487775', 'Seng Keoliny', 1, NULL),
(3, 1, 'Janny Shop', NULL, '85581245527', NULL, 'pich4554', NULL, NULL, 'ABA ', '000249269', 'Mansreypich ', 1, NULL),
(4, 1, 'sothida keo', NULL, '85589684608', '4_RBmDf8TUnATY3XckEHGH.png', '13579$thida', NULL, NULL, NULL, NULL, NULL, 1, 'eaaAkPkZvU1NmhVbX8z5Ys:APA91bHtU-eKeyK6Vy_hVykbfI5eaHeHFnAHSSBg3XOk7RWmimcoPTcoGNMD02WacPxHVnRmKM2jXuU98uSkzGcHllagmFHRRgdmNM3HyBD3kpC7YPlrKqqai0OF-rXsvQHIZWSadTtl'),
(5, 1, 'Sombo ', '', '85587256956', '5_Gsl0pKIUlWzOPiRdTK4a.png', '123456', '', NULL, 'ABA', '002918654', 'CHANDARA SOKSOMBO', 1, NULL),
(6, 1, '89 Online Shop', NULL, '85512534508', NULL, 'sm250915', NULL, NULL, 'ABA', '002221114', 'Ly Him and Ly Soymuoy', 1, 'fcHsh-D-204bj9ztrAWHWX:APA91bEYckQlrGKpoTSjAB0zT51ra6vNg6os3bRSUbYjSZMl-S8vg5R7X20vqBFiLcA3YPS_3Dxyd7ozWPNvgQsYChSkzs9jhzTQV_0g4bscvz9S9Btrv7WzadNdzK8CSIs3yZ574LJP'),
(7, 1, 'SmeyKeo ', NULL, '85585995530', NULL, 'smey1692', NULL, NULL, 'ABA', '085995530', 'KEO MONIRAKSMEY ', 1, NULL),
(8, 1, 'Sok khoeun', NULL, '855965649899', NULL, '112233', NULL, NULL, NULL, NULL, NULL, 1, 'ctUuAVUnRrqZvev1xKVLH_:APA91bEyhh0yb_M9GZcrHCKtlR6Tsh_2J3owS-_xRE0uqXn5104_zKc4ypLbZib49L44VCKF4lfMKXQO7txbSu05tsUNCH2GAQLEmQrTdKGxdGwpgU4liI52bggr4nv-7uyynIfEfC9p'),
(9, 1, 'ផ្ទះដង្កូវឌួងដូងភ្នំពេញ', NULL, '855965950175', NULL, '120617', NULL, NULL, NULL, NULL, NULL, 1, 'dCdVnNEDQAiHbhA4B83JEP:APA91bG8agSItCQ31In89ytFXDhtBYTvrCxWqFi6jQF39TK70Y33sAj-WM9wpeiE72JEmqKOLoB7BkVCIz6pppmVhrxLLg2166xymUOS_guKdjwGeRvAaO-k5iCpOOmTu2OYQrzNjJ6h'),
(10, 1, 'ផ្ទះដង្កូវឌួងដូងភ្នំពេញ', NULL, '855886047670', NULL, '120517', NULL, NULL, NULL, NULL, NULL, 1, 'eMIL4BiBTe6lR29FRoIWcC:APA91bF3GpowtiaNSApLRfmlYULRf9AN7r1GawQGT4LzDoG1yRfNCe43v3n8IW8ZCzxNeHOyVz-FPUSZzHsuAozyKfRykqAVF8txKfJtqEms2dySul-tpOXbR-fYZQMBKG91iX9BAO5J'),
(11, 1, 'SaRang BBQ', NULL, '85569678868', NULL, '31689999', NULL, NULL, 'ABA', '000244573', 'CHEA KIMSANG', 1, 'fV5Yyr5bTdePRecZq0unRG:APA91bFBO2ebH3-Y6drb7HpYqpuRQFtMBOa1gV26_3AvfUDvPCll00Ry_eTlA31W4zUUXbQT3G2PcuNkzgoWFjBe00d0GEhq6cO4OWKsCbP2ifqs10ISYyOeoiZPgSWbIpitMAaKlYv5'),
(12, 1, 'Nich Online', NULL, '85598283533', NULL, '123456', NULL, NULL, 'ABA', '098283533', 'TOUN SREYNICH', 1, NULL),
(13, 1, '1992’s store', NULL, '85577625315', NULL, 'Khovkimeng18', NULL, NULL, 'ABA', '001196855', 'Khov kimeng ', 1, 'eJGTufKFTR6fGJIz32pT20:APA91bFH9E9v8myue5O6Uhg-N1raiUQrjg5mC2JXtizQFCUvwCeQCEicwAxizpaJ0ywCafzRJnBSuLyoq8JGUxHSYsE7f6hiTP72eBC16amhYrchBfdMv4FD_0TtNIVtCL9WNY7oPk6U'),
(14, 1, 'Sopheap Sharing', NULL, '85511502946', NULL, '011502946', NULL, NULL, 'ABA back', '4026450337227283', 'CHHOY SOPHEAP', 1, NULL),
(15, 1, 'Borisoth Dental Store', NULL, '85510333687', '15_Fr7wDWZdIwtw61pBa0zq.png', 'rithrith123', NULL, NULL, 'ABA', '001260285', 'Chin sathyarith', 1, 'csX3nI6CxU6thtzrcR_U42:APA91bFunvVv34YGj4TwfB7NVkEwAXjIH4cWKlkO_R9n5sgW8jOb69vcIh00usw4v6TSh8QZOKDIy8k7yjD9TvMB0Q8jn5wLQXjCGpYUiLuwOjt-GMEIsc7tBcgQtekHBSgsNpZ5ds6Y'),
(16, 1, 'Babie ', NULL, '85586300399', NULL, 'fish250811', NULL, NULL, NULL, NULL, NULL, 1, 'fYNVHLDGSgKePN1oQn4fsp:APA91bFZu-99Xc7EpliOpncvE7edKuP0ruyOWxa2BnxFtOiJt-0W7BNcFX1AMXtamtpBGJeN3ypqVQpqHPiko4T7BzrhwDZxvFuep2yWYuYSCDw_E-Q8t_WXxCwam_lWtoMP2nt5Mdhc'),
(17, 1, 'Lykeang', NULL, '85578615164', NULL, '078615164', NULL, NULL, NULL, NULL, NULL, 1, 'd-sTHfJm1U7Gvelb5MeEMc:APA91bE8bUbylQBsYecL2x2dpOPvtd5xXF_Uaom2WTvlwuDgHcsYlbFYDZqXv70QsFWmy1skKNN2tQgyVr0F-elsR4IO7jj33B5dcFSYM9NaHJTUEwVp6-FOax08nrml1d4rE7F1dX1C'),
(18, 1, 'P store by pypy', NULL, '85598781888', NULL, 'Vsr120893', NULL, NULL, 'ABA ', '098781888', 'Vuthy sereyroth ', 1, NULL),
(19, 1, 'ដាវីត អាន', NULL, '855717322522', NULL, '1234567', NULL, NULL, NULL, NULL, NULL, 1, 'dCrqFFNaR6OFqD74W08gIh:APA91bGLIhR0bnH8L03cGbo0B9nXeKHP4KkvvVX2HnLxtuQAVcOFLKWyjprtaj8b4PA7T57IaGGQEKhG5pcIXSP2ADhVWtEE3rO05vkrjrxQG5-lnAM5fcvL-jFe3P-1CggCuiV1MZfx'),
(20, 1, 'Sonita BEST Shop', NULL, '85512961150', NULL, 'sonita888', NULL, NULL, 'ABA', '012 961 150', 'SOK SONITA', 1, 'fCurOU1XTFajVHhAEMOoOl:APA91bGGNGalq_SvRQ9MyofpZzant3eG1tJkvjHEKvWMHdUdoRSLKOr7mDqiWeP53k3r7jfdK0J4cSzgC0mvs4cW1tr4l5ap4MYq5ym5AA4RXQDUl0gzBHMDv8Bm9OATgqb4mQYH6abH'),
(21, 1, 'TengHui', NULL, '855889953311', NULL, '0889953311', NULL, NULL, 'ABA', '090208282', 'ABA', 1, 'e-ABqUUYTsqJXiD5WHJHTn:APA91bFv9SdgAGJlWbCOHAmr02_OfZOZB14LD-CMzPJPBDmd6EZAcKdz8583EoQLMFmOGPm1hv6i5a0mzeUsQk2WGtK3rdy9ZKeCZWJYUMEaRqSao4UDXemgIIr2TeHVOQqREzFYgK_y'),
(22, 1, 'So koung', NULL, '85517655699', NULL, '20150924', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(23, 1, 'Smart Life KH', NULL, '85517781887', NULL, '813131', NULL, NULL, 'ABA', '098781887', 'SROEUN SOPHANN', 1, NULL),
(24, 1, 'The Gift', NULL, '85510279937', '24_gAAvkvxJkEdlmr0IKRm8.png', 'MawinC@0708', NULL, NULL, 'ABA Bank', '000 475 445', 'Im Sothea', 1, 'djcswQVRRniT7sgZGswEc9:APA91bHPcXNq2rN1ln4Z4up2KkNsJD5CSPGPBQaFJUE-3vS-r3meFksS39RqSJnDtPeqy0aPxfT7WlOzUtn3xjiIGIj121MBND4uxoiuXbQXZApVs4EmR9wM_vEJeDPuj-aMbDNKfprp'),
(25, 1, 'WeKids Shop', NULL, '85512712127', NULL, 'wekids#123', NULL, NULL, NULL, NULL, NULL, 1, 'cdwAs2zkRaaVkMCvBjh4rj:APA91bGFQnBd5H-xHsIZrjCHkMQRX4cp9A-z2SnUYv9y2z_iRs-Q20VT4Hu_ZMbGcukqE1Dz4l7sM5WAVsAI5-gNVIEt5hN3rqvAESr8VKdJTXpeyf5MK5vPoRSMHs0vqvrP_2e0oiJ7'),
(26, 1, 'Yuan', NULL, '85512252983', NULL, 'yuan2303', NULL, NULL, 'ABA', '001 902 153', 'POENG PAOYUAN', 1, 'cwevfGQJ80Sfhr7Q565J4W:APA91bF51QGBasiSe002_spLZev0OUIeyG5K1prj1omQ65oSxDgdv0P37eHbMmlHG9W9l7ubLHnJHCXQj0DwddGPpo9V-X_YFJkjIjcgMyWZKroczFgrxEqQt1pLr0VF0YaTUPPffTYd'),
(27, 1, 'BBS', NULL, '85569441199', NULL, '1234', NULL, NULL, 'Sang kem', '022446688', 'Sang kem', 1, 'cEt_uHRwR5a7G1U5ZVaAhS:APA91bF9FgGYz_u18xq4CNFAe0dPuHpi86XTQuC3qqyY4SZEjK0-TgotEhLcG-kL8uKn9R7NCBJYgCOHRStlMMBlBXyNbYlLPxY0A8VxooAjppWxb6xczkMJ0E0cKJB0f-7jOsCDZLE0'),
(28, 1, 'Tekskor', NULL, '85577615215', '28_vlHLuLdX2qcAMVSLjjz8.png', '190619', NULL, NULL, NULL, NULL, NULL, 1, 'feWbrCJirEoMmILUsDFQyN:APA91bHPeKFAuQQsaQwEtqSjWIDm3g5fQK3GWqpLiEDjkke4xUbEFysF21ljifwrHewHBtx3sYFyGQfD2kmL3m0LunCiYn0LrvcHlSP2ap0KfuKLCBIMHNo3JehhOXBwBoi2E8r9I95F'),
(29, 1, 'Heang', NULL, '85510949892', NULL, 'Heang12345', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(30, 1, 'ឡេង ថារិទ្ធ', NULL, '855887657777', NULL, '1234567', NULL, NULL, NULL, NULL, NULL, 1, 'cMJd5HmpQ2u-l_xAWe5RNo:APA91bFKSK_iTXL547VtjrRuVh8Gv2UbUZ5jecw2SvB908q5MQbeRovX74vPBBNM3LDVf7khni5mNziobwxJ4ICNXYEy032zAhzg2E4LpGixYOqjEXbKX5MfNJ_KCitsJPdViaCsNN7m'),
(31, 1, 'ឡាងគុនណា', NULL, '85589700500', NULL, '700500', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(32, 1, 'គឹម រាហ៊ូ', NULL, '855979954047', NULL, '1234567', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(33, 1, 'The best smile ', NULL, '85510869569', NULL, '01051993', NULL, NULL, 'ABA', '002660495', 'laymeymey', 1, NULL),
(34, 1, 'Vann ChengPav', NULL, '855966660997', NULL, '225379', NULL, NULL, NULL, NULL, NULL, 1, 'ddcDzcxBQTydbjpOVV8bvI:APA91bEugpU77YV-lFyW2yHM7kDVYp2907yC9wQCCb-DykxUc7KkS0bdUNRJ3CyqlF6vzQaM9j6bLzH3SB_RdtWO33dxQLMG2izuhPsWjHzm_5IdmcyBbYeSG82qdsVCu3S6_cZsUAJW'),
(35, 1, 'TienHab ZanTa', NULL, '85585939694', NULL, '012859113', NULL, NULL, 'TienHab ZanTa', '002539861', 'ZanTa', 1, 'cRecdUdjRjC11fPeHVYvAp:APA91bEapfJ7u5M68-XpSshV6VgPWgc_W9PWShvBCsQIlNEK4GS8fv1riVpC8eiyN-5rD7jgk5XprHBLsORuWls-GL8LqsJkvMePf9NUS3rOWzNBD_FVlnaInrZNmTITrnYXQSNkjeox'),
(36, 1, 'Sorr', NULL, '855765671222', NULL, 'Sorr@567', NULL, NULL, 'ABA', '000567890', 'Heng Kimsor', 1, 'dttmrtwcLEHqsxXfOWLmkS:APA91bHvSiSlAsiTg1yekyWSzNXwP4A_tZ22lYlBxmZ_xbLQaH82NfacRAdwQFmuLKd3_Nitcxo3xqrO5hqtpWtgWyJmQUAqxnqTVunzpvcWCeRJPdnHh_u3XpFqFMJTzE4Lyu4eri7M'),
(37, 1, 'ក្រូចពោសាត់ធម្មជាតិ', NULL, '855967880224', '37_qlIrmUWZXqlfBZyBGOaD.png', 'Apple1', NULL, NULL, 'ABA', '500156104', 'ORM RATANAK', 1, 'e4-TmQ5zZk7rv1Jme07XaA:APA91bH68hQgFF-SP5pyHVPflDBVGKOHbKGcyzA26rTMvQJbVgU9sGZajG8zyBp-jm8n1W-dsJ-zkRvBTrqqOnZC1Z9kTZy9eXHTZKs8xyclEiHCC3GOybETnBHdVVstvpEmQKaLZSmx'),
(38, 1, 'LIM SOKREAKSA', NULL, '85586460168', NULL, 'SOKREAKSA168', NULL, NULL, 'ABA', '000501846', 'LIM SOKREAKSA', 1, NULL),
(39, 1, 'Nhamnham.snack', NULL, '85592800005', NULL, 'davy77', NULL, NULL, 'ABA', '003008022', 'Rossim Davy', 1, 'doVAbWdgOEBNobjhXJzWkd:APA91bEDqtrpKjaLtmInF_u_43XGDvlIucl0ceC98lPTLKBPKErEJMhdJxqdVt3rmJztOoxAI8pWCyjbt4-kp81F9PY_KNSsNf9b-VEJVGY4zxYTbTsIesohqN3Yh8c9WJwPTTScUzgQ'),
(40, 1, 'Chhun Sokchea', NULL, '85593731614', '40_d1O7T6ny6ZAiz8nLfnZ4.png', '9314Cheachea', NULL, NULL, 'ABA', '002196952', 'Chhun Sokchea', 1, 'dWiqQfUDM0yCuIZnqol-bD:APA91bGWTm0mergIYKUWHXI1h2O70Q2bUjsgm72EH2EfeGZhxF_kEnxpgW0gvVW_vHbtkW4VRA45CjeJ54FZGkrTw6nEPYhh5pAH1WcNMmpsSoCFoOF6ErjASMG98V9qOSPXw3qogwrF'),
(41, 1, 'Zidance', NULL, '85570818258', NULL, '12345', NULL, NULL, NULL, NULL, NULL, 1, 'dRR6fQsbRqKToQIXGVEnxg:APA91bHhHrTbwR9ccBA2Pe53JBDaJKhm6Q7NvGIcB_SKoZ68wK5t0YtcRs8gFD3uU1Qy3ImLLVt0geQqzwnDMBlhvMkry5Y3yfhG8s1fVWZoxGCXj0Nok4TDtRd94DgNJoxhqD48DZu1'),
(42, 1, '7T WATCH', NULL, '85561722326', NULL, '@peter1210', NULL, NULL, 'ABA Bank', '002117875', 'SAYONPETCHOR ', 1, 'd0VsyPeGgEHvpsoZd0UQgK:APA91bE6gIDHaLFb1bEMZ5jtf8nBFxGYmzVVlmBDL8Ui2fuQuB_sqlYc9VzzMJHbfqOD6jB0TrhNezlDAdGbdRmHIODQHAkGIGC5C03iS1s8Ick5vPKJL_2KLhTPn-kO_LTbh5TxHFyU'),
(43, 1, 'PEL SHOP', NULL, '855965054500', NULL, 'mst123456', NULL, NULL, 'ABA', '001171414', 'MEASSOTHEA', 1, 'cke9Egrjj0TlhfseO72fri:APA91bHJ1q7CO4wRYlUfn76p-YtoXhDsYZqJNe14o5eciPBcgpJ5s9tJzNLbCxgeE1aHShHdLoKIXIsm9lLWxAq3yMKpL6-4eEWZOduoxG7TRWMfT2FcrsllErNq68jKB2gvDQ6h1cPo'),
(44, 1, 'Vutha hour', NULL, '85516833988', NULL, 'sokty##55', NULL, NULL, 'ABA', '000132978', 'Vutha Hour', 1, NULL),
(45, 1, 'TT Best Online', NULL, '85593256363', NULL, 'theathea', NULL, NULL, 'ABA', '001365017', 'Yh chansothia', 1, 'cBcAnl3MOUZxhVgUqmXWVJ:APA91bENeAtEvKVs-Fb88iiQi6QE_CVDlJqe3MgE-dZl00UfkaLih72F8HR8Nuvp76WUpHEhsrLE2TpicAPUqd62eLWjus4uuFyQkrhNTd7gK04__tcWhlIB-0ToooHJLEaQ18_h8Uxp'),
(46, 1, 'Ann Vanny', NULL, '855888909072', NULL, '909072', NULL, NULL, 'ABA', '888909072', 'Ann Vanny', 1, NULL),
(47, 1, 'Angkor kh', NULL, '855977677457', NULL, 'Lim69$$$', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(48, 1, 'Thear Ro', NULL, '85585617808', NULL, '085617808', NULL, NULL, 'ABA', '000989969', 'THAO PUTHYRO', 1, NULL),
(49, 1, 'SOK SHOP', NULL, '85516289899', NULL, 'yaya', NULL, NULL, 'ABA', '000575590', NULL, 1, 'cMIlwyfab0y8iguwJ-PAeL:APA91bF1NcSFIX272SaaLRjLjzbIaiRW6W4eIDREbVXdAM64ZpiiuBZNji1BbW4hSvRDi3SVglbcmQvbD_4n7SU0JGwM3iSh3m3fev8EYjLdBjWVTykssNBd4_7EMyS6TF5zfoWyVTsN'),
(50, 1, 'Srey Neath', NULL, '85593471817', '50_BfyfitWx3bMOtkmY4aP1.png', '$$$$7777', NULL, NULL, 'G21', '000344158', 'ABA', 1, 'eiGD96Xso0pmu94UDPwwvg:APA91bEf0d3xzU27HPvXItx9B2xtT-JkEmGMnOOt543COVJSXTTYNVeLNQ0h2cfc05ZhdBw667v66ICc7DXqy2whxvPsSLREEju8pSJ1M4ZYS9Be3zwu0uhO3OUzNoq5aCA8VhrEWWyy'),
(51, 1, 'Bun Heng', NULL, '855968260367', NULL, 'Am112233', NULL, NULL, 'ABA', '000866787', 'SIM BUNHENG ', 1, 'crkKTF-fLE7ggV0u9P4wLI:APA91bH4Gm3lQCj65U_NfFCvKDDxqJ16DY11n4AvXv9J-nLGaumPprrb3q68px8Ked4UJidfo6RT19XmTwcgbBOQnzTk7py--BLphpfASJ2JBgfxuWWakv2iJ8tprba5pMzzUd4GpQYK'),
(52, 1, 'Natory store', NULL, '85578255544', NULL, 'MST555EX', NULL, NULL, NULL, NULL, NULL, 1, 'd6UtnCtKTIGNzxp4NCHaY6:APA91bEHPmR7zv8-vr8YLbA2v-1XgqLYCRvfnSc5Q0Y38MaqJ-9Ib9UOHonYG91xx1B11bd_AAOt3eu79idfVDJp-NkSi1PQOOkheQBsCUZbNdbPVNTwuU42AuY53lEk26FrbxxjjGaG'),
(53, 1, 'PAPA Farm', NULL, '85569665533', NULL, 'P@$$w0rd', NULL, NULL, NULL, NULL, NULL, 1, 'edp1QW76SE2LNpnSdB2C4I:APA91bEtLx3a5AgGziXlkAyM8-d3IO3QIkMce3Z0USnwtl-Jhb8rkrxQrdaM5CAa__1BuQk2jEKtDmWBxdXsCHVaomVKegWrHFx_yfNN6Qsiq1S9dhwymYXGYnjOhe8__3deAhllNBEK'),
(54, 1, 'SPR world travel', NULL, '85577501111', NULL, 'S123456', NULL, NULL, NULL, NULL, NULL, 1, 'cIEerb4W60VAqVsx-DAeU7:APA91bEeb3VfqlzWed6RvP4k5MSirk9iCm85tObAaYZNId1oCVW5ZGwpN_x7Gb0wIt4VeJfC0husGux-mPZE8PfQuM8DOEF8NR3lIvqbbSK0whL1e8hqVr0Ut6KoR6Nq4lEZe4SmQ0HH'),
(55, 1, 'So thea', NULL, '85589626617', NULL, 'sotheart11', NULL, NULL, 'Just for myself ', NULL, NULL, 1, 'dS2h3R0KNUH_kJFToHUZYR:APA91bHI3im1Ww3BWL_J_PMx_b8NgqdXF1xNQVGbkjeuCgWAIXIBDMoZ4G06C6EcmVrsIgQpHQ_ULSi8tc8e5a0ICczuKbH19dOZzEo9u8GY3ZtZurGIf_BF40FJbkgCpNpuG32JMRcI'),
(56, 1, 'កណ្ដូបស្រួយពិសេស', NULL, '85567644466', NULL, 'Mtlove', NULL, NULL, NULL, NULL, NULL, 1, 'cAVEuuRGvU7PpkmOOy3PA0:APA91bEdxUltAtfZjCnH63CGNW7Kj287giXdWXv04chXQF5wt0WDEsMRxv6H60lbSr9Py50JIaHNSCxbiB5O3gQs3ygicztQdrW_liig6ecec8Nkrme2O5pinWWT_A-E8o-js3dHGEQQ'),
(57, 1, 'Kitchen Mall Cambodia', NULL, '85511223335', NULL, 'Jungjung1', NULL, NULL, 'ABA', '000855553', 'EAP SHICHUNG ', 1, 'c8bepCXjBknPiSwKNMSOYB:APA91bEhnt4xi7o9iLN4xqBnTU2o8u3ObdhZGBOCkEtxZgtOMLL0t6VVzFVPq68FRGehR0u8Smmqlo5msAmUVYy1grCJsVJ4F1jCrHlKiCZEHIa0gFhVH_h73VqgdYSuAvdIGF-FMbdr'),
(58, 1, 'Sao Samdy', NULL, '85510659708', NULL, 'Gagbgc168!', NULL, NULL, 'ABA', '000 405 127', 'SAO SAMADY', 1, NULL),
(59, 1, 'Yess Shop', NULL, '85569336960', NULL, '170622694', NULL, NULL, 'ABA', '001081357', 'Khun Seysinh ', 1, NULL),
(60, 1, 'Pisith', NULL, '85581292007', NULL, 'Nou190520', NULL, NULL, NULL, NULL, NULL, 1, 'f9-C-42uTfi3_rgmYNq-Kb:APA91bFiyvZMhTJL3s6klZM02yDklkpHlA58kI4-hlJZZkqZRAlzRw0gb9NJmGglicJ2MIA6Ck8l8V1AWwzA96o1zDimb6wEtImZEZ2uXkgyl48vCaPuRH-8D8Zgrr1242QHYwBAJADh'),
(61, 1, '18.08', NULL, '85593330051', NULL, 'Fong1808$', NULL, NULL, 'Aba', '881111881', 'Nop kimfong ', 1, NULL),
(62, 1, 'Natya Sin', NULL, '85577818601', NULL, 'natya929', NULL, NULL, 'ABA', '000391393', 'CIN NASYA ', 1, NULL),
(63, 1, 'Bro Bam', NULL, '85578587887', '63_0cc2sGj5dIX4v322URXh.png', 'seng1981', NULL, NULL, 'ABA', '078587887', 'Sengvadthana', 1, 'cQ1Pv_xaDU7QmYq0yw-o5l:APA91bHlsWSDWbVPc8P96JymRvPKfQUX5HDjQH-21qYg_oiwrGEceKSVlgd9Hb8GFzVlTn4pMJ2lyCn0PnidCDbae9ny0wQ_TfdIOoDy2jwydcOUb9uJHaspWj1HY_XwqllTHTL2w8Sa'),
(64, 1, 'Oengkimlay', NULL, '855719999691', NULL, '0719999691', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(65, 1, 'Beauti studio Cambodia ', NULL, '85515690169', NULL, '12031993*', NULL, NULL, 'ABA', '001611795 ', 'Chan Aruntey ', 1, NULL),
(66, 1, 'Mimi online shop', NULL, '85587519761', '66_CV6Ss4kJSjU7e0rzwoPM.png', '#96979899', NULL, NULL, 'Aba', '000323383', 'Heng Raksmey', 1, NULL),
(67, 1, 'Ly Sokha ', NULL, '85569687668', NULL, '6789', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(68, 1, 'Guangz', NULL, '85585232378', NULL, 'kongkea8899', NULL, NULL, 'Prince Bank', '000 058 095 \n', 'Chang Sovankongkea', 1, NULL),
(69, 1, '62 Baby Care', NULL, '85599957471', NULL, '280714mp', NULL, NULL, 'ABA', '001408058', 'MEY NITA', 1, 'fMQihWu00Uj-nIhfn8ETFV:APA91bHsu_mzPYjb9RzDwRIXxZuoZEE_SmprjnbaBZkuAnxi2_qP6SZuSwmHxInuF8v-Ka8B2jsyk0xqmzKGr87HFUCfOmXLacJonbwzwi5Y4-KIQ4U30WPVxWK7_JlBD5vO6Xavl8v0'),
(70, 1, 'St.589 .Russey keo', NULL, '855966741964', NULL, '0966741964', NULL, NULL, 'ABA', '500088209', 'Ngem Chan sophanith', 1, 'eJRht1wcT1OeaaOHu4auqR:APA91bE7PxZWHMIHxkhJh2nCqG5SZRf-Pm76onGsWGvb1BAJ3gJ9mq2NNcS42ncC2uAIUBgBptW4iOMLqg_wjUWmtKXsJ0sO2mukLBQlX0IUVvo1i-L5En6UOZlGONi3cyIzz8YaEl4N'),
(71, 1, 'Kimly', NULL, '85592355185', NULL, 'kimly16', NULL, NULL, 'Aba', '000334722', 'Chhay kimly', 1, NULL),
(72, 1, 'Wellfresh', NULL, '85517789507', NULL, 'Thuna123', NULL, NULL, 'ABA', '000400232', 'Truysrosmithuna', 1, 'dZT4ogg6Q9KYpFoq7KDvgW:APA91bFD8PIqgqkmP3UVNpZawq4madDOtiKLTqbe1T_v0C1LJeJ2to1Z-c8_ynxGhSDep9atxDUkM5Dg4gB-t74g1LCfVAbnONWmDH8m7JQCAYSk5rqiP54zQ7TwIh9SV81xiyHBsulG'),
(73, 1, 'SREY LUY', NULL, '85512226664', NULL, 'kdeY101084', NULL, NULL, 'ABA', '012226664', 'Horm Pheakdey', 1, 'fuM4X443QQCZhVBuwZkWiD:APA91bGSur6QPITTDEJ7lLG6Al1J0bAQKqN66-D_X-9etJ3XW7wE2o9pOMwX32BpWkeaJNbVfNXuP1AQAm39VwaHglKz-rr6MV3PsPxya0RF765kyeE_yjjVr6tKoWQkykWjTs6u8Oob'),
(74, 1, 'Ty Na', NULL, '855972842833', NULL, 'tynavann123', NULL, NULL, 'ABA Bank', '003 160 445', 'RATHA MENG', 1, NULL),
(75, 1, 'Vannthann Dany', NULL, '85516999394', '75_XqWW1zXxKdNItqEAtrQ8.png', '016999394', NULL, NULL, 'ABA BANK ', '001001511', 'VANNTHANN DANY ', 1, 'cuOBCgVtWk9ulA9Pw5XXk5:APA91bGMBLlLizqV00OdoXztX98ZZTuaZvQ3l8aSQQaMESUZI9_lX43PrEZkHQk4Oj54UaCdm6aXKcEOTHVG474VMqLSidh0gvlOrXLy7IuJPqmEOboFBOyWl_cLbtR8cXte0fGV8vjs'),
(76, 1, 'BaBy Mommy shop', NULL, '85581327025', '76_lNyaldQP9nqXT98tfHmr.png', '984974suofana', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(77, 1, 'Uch Ratanakkeo', NULL, '85512999104', NULL, 'Keo010612@@', NULL, NULL, 'ABA', '001370943', 'UCH RATANAKKEO', 1, 'f8H-551pQTimkwpJM8MYIN:APA91bHBH3V08MPEkHkf5BjJjRXfuFGkoNMrprgHyFeU8uorRChk-zL-Z3jrm76y9ut4RjrXZyQ70l-jIH4fbwVgmnDA21r4zDYjMp9mhVjuho_p-2w9G52QDB0ChE3745oKrzmpaayF'),
(78, 1, 'ស្បែក ជើង', NULL, '855979599155', NULL, '1»231»23', NULL, NULL, 'ABA', '000888593', 'Lay sinoun ', 1, 'dux-B2EiA0A-o4-ZcZFFPF:APA91bEETeQGn3pqC3QzYntHqOuYXVFD5qHSz8MeTSXUPqQBSpaLUOTLuujSIgeI42Ixh-Aqjqis44WrZhT9s_bcxWHHLzIeealP7Z7PAhO7QRHrjo5lgyG68-sKITy484mgl4Bii9en'),
(79, 1, 'Ah Phen', NULL, '85595858554', NULL, 'sophench', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(80, 1, '168 sourcing', NULL, '85593383733', NULL, 'honghong007', NULL, NULL, 'ABA', '001150003 ', 'lim hong', 1, 'dFPiHTsKpEgxoWIPgj__vr:APA91bF8sUaiZfFDgC-JsRDd8U-doIWZZhzBUQTrrR0JJ3hvL07yhY1-NucjbVvxmPXqXvOJrykaVZu_Y0pExccN0LaD2iz3Y3Ig4jMJS58TkpnYcY6EvlR488xu4oZ5gK7WDseW21Y6'),
(81, 1, 'SN Collection', NULL, '85570697607', NULL, '280286', NULL, NULL, 'ABA Bank', '001426278', 'IV RANARITH', 1, 'f9LN9LawIEeDmLRkWQZTy6:APA91bFJcD-JTPejvafQld274Cj5IU7gu1OTzzkxECBOhde2INya0_ky77J6AdaQ_6Kv8XO12yaNSW7hSf1oR0tsrBzsDR8HR1f-r531VyipWqR3sheLTTM86ks-N3plg2O9owMPdOtf'),
(82, 1, 'Khun168', NULL, '85570523168', '82_slPYzzgQ4mtJMHLEWzp6.png', '@@Khun168@@', NULL, NULL, 'ABA', '000190435', 'BUN PHENG YI', 1, 'cp_HfEG9P0jRiguHweufE5:APA91bF-0-dbFwJ8xpBCgrQqIFPmKmGk8ebSi-B-Vq3veMR_nO7GWevVQRmjmrw7WvXd8OahCfqCRFslZBsKtS9mpwzFk76l147df5XeJRFB39LDHvwo15VwcEi7DIyoq5UYEVcL4DCW'),
(83, 1, 'Ah Phen', NULL, '85586876741', NULL, 'sp1992ch', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(84, 1, 'LC KH', NULL, '85516506676', NULL, '0123456789', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(85, 1, 'Chan Leakhna', NULL, '85598601606', NULL, '1985', NULL, NULL, 'ABA', '000079057', 'CHEA CHANLEAKHNA', 1, 'cmsolrstI0wGjd1NyRARQl:APA91bFRxOAWIHzWQn6Id3BlCfUD65WHu0P0WM7WXlpG9DlB9x8d2e89OvgWaYpBY3aacsp3cCQ5ULU8FoKSO7QaDh28deLnklIj6MgVQwOqnb_33ld4Q12rMSUN0-YjGumu_LpYtXoH'),
(86, 1, 'Noch Thida Truemoney Phsar Tol Kok', NULL, '85592203363', NULL, '928162', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(87, 1, 'PEL Electronic', NULL, '85593797767', NULL, 'mstexpress2021$$', NULL, NULL, 'ABA', '001171414', 'MEASSOTHEA', 1, 'dJSc7KlgRk3_t2Q2mt7oeK:APA91bHDOaNkCOuOMoChwBEgcrzaKISVdGxGVxx6AbOrn-_iIAWcySi8MQElsYEAlpQccs2LALe1oI63CbnJ0_h7KngrPsxEvNuP7HBVirqUkGrR7Funk2ZZqNKMX5hqBSzOnbMxorEP'),
(88, 1, 'Romchong Theam', NULL, '85511467865', NULL, '@Rm11077865', NULL, NULL, NULL, NULL, NULL, 1, 'cqVljcuXQ_WPGg937xSLGo:APA91bEIL2Qvkay6kPRWH16LRKi6WKSfhoXYdiM7jXfoezHLSMJlXXGrgl_Scb2Z9SKPp__xHUT8CdSUQrwpx2W3oU-o9Cw2kV4pdlDLxD5w1Zj35KuepFJdAlr7mw2tLuVmOwjKhDkL'),
(89, 1, 'Neng Sam Ath', NULL, '85510534757', NULL, '4757', NULL, NULL, 'N/A', '008888822', 'ABA', 1, NULL),
(90, 1, 'Chea channran', NULL, '85512747487', NULL, '747487', NULL, NULL, 'ABA', NULL, NULL, 1, 'c-XsHSscRj2O1NXKZhVxbn:APA91bHEYy2cpMqKm6u9EIyguhAfx2gZ-JAqfA72LvQitEtJhFUig-ENWaVX4RT648TvYnC4O1hKx7EYl6AbzzQJIP6hak0zB0N1CjRQ2JJ2j_iOE1KVcbiE65ptjElzBaphMNnph8dQ'),
(91, 1, 'Kunna Lang', NULL, '85570866688', NULL, '866688', NULL, NULL, NULL, NULL, NULL, 1, 'cw0836lCjUYgvj6h9v6Uah:APA91bFiy4q8J5sfnvkiiEVC5hyBp2aZlTJ91PlPVh3LR8p5WpIHPi_WZLnHG_DrI6ugB_d5P1AfSloBPb2rYX6HWbNwiqabcrTKTbTOLsDeDwe9AuzRAQOGGiXkAldlTxraXdXv-N4f'),
(92, 1, 'Khemra', NULL, '85517594646', NULL, '17594646', NULL, NULL, 'ABA', '000310150', 'Khut Khemra', 1, 'eRskdtWHZEOxjA1JH6RQ8s:APA91bG3C8-ZsKKBmbJuaum8_G-1XGqYc8j_K1j9lhiIAhxcL3IwnXOGfD3BXsSdhGDhVDflZeqE1tlo6XVj7Y3z5p9Pc0F7PeENTYoQivrqH0ZwFpWnJh4etpD_ZGktirytJwMWsjXs'),
(93, 1, 'Nara Ty', NULL, '85512694081', NULL, 'Savika', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(94, 1, 'Srey Len', NULL, '85510351195', NULL, 'Ra2021', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(95, 1, 'សុខ សុផៃ', NULL, '85567522216', '95_pEMG9iNotKOvDIKP66N9.png', 'Phai9898Phai', NULL, NULL, 'ABA', '010522216', 'ABA', 1, NULL),
(96, 1, 'oumrathkhemera', NULL, '85586460656', NULL, '197440', NULL, NULL, 'ABA', '000231805', 'Rathkhemera Oum', 1, NULL),
(97, 1, 'Dane Pov', NULL, '85515668436', NULL, 'dane0151997', NULL, NULL, 'Aba', '001485245', 'POV Danene', 1, NULL),
(98, 1, 'Koung Sovantha Publish', NULL, '85577656158', '98_D0vckYQU1C8qSqBmRxO0.png', '656158', NULL, NULL, 'ABA 002646984', '077656158', 'Aclida 0889688168', 1, 'f3GalTCZSXC7FUZxsCbwYM:APA91bFcn2ynJ5D2zT_RszTq2Qn3d9SGKggcIpdNF0CkKIE3NYjlTJo4NI6rAPdwyTuUpfJ0ppg_Mj-EO_ITimdxOMQVxEIX4UTikC1RG6DhFMkldR5G9tzfP4Qcaa4EuzkWmuBOtMU-'),
(99, 1, 'Phallin Boeurn', NULL, '85569295265', NULL, '012326689', NULL, NULL, 'Hattha', NULL, NULL, 1, 'dlnw-xbHR4aIUi45m9fzs3:APA91bE20fIIRLWYTonA_lbJSp7e8tjx9BQRxg6YBtTI0f_hZSPZjjemzIzH29xyAk5ZPc__-CngxRd9ZFA67VEVqRiSZ6wGbU7EGSQ8-VEVKh5J5fi4bhO4ouf2zW0xFfaXsk8VlyFm'),
(100, 1, 'Bros Khmer', NULL, '85512456767', NULL, 'mst', NULL, NULL, 'ABA', NULL, 'ABA', 1, NULL),
(101, 1, 'DL MARINE', NULL, '85512340137', NULL, '8998', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(102, 1, 'Lim Nato', NULL, '855976635555', NULL, '161215', NULL, NULL, NULL, NULL, NULL, 1, 'cRrq8ueZQw-GOmK7_blyfa:APA91bH-DLh03ocy_80b1Xgx_kumIirnKS6r0HxA_xWslC4jaxIg_yDqrSl3LylVUXhhP5PfWZJMViPEdiMwc3oevhdG84qa3ULSsygMmGr1jDnE_jkcF469buKO-KXEfM9Eyy7QE3X5'),
(103, 1, 'Gh hotel supply', NULL, '855963913535', NULL, 'abc123456', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(104, 1, 'Who', NULL, '85599477664', NULL, '123456', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(105, 1, 'RADA Shop', NULL, '85587311444', NULL, '67&ra$6', NULL, NULL, 'ABA', '086978000', 'Taing Phireak', 1, NULL),
(106, 1, 'Mak Oun ka', NULL, '855965363168', NULL, '151213', NULL, NULL, NULL, NULL, NULL, 1, 'dhxHomWrqkJsv6lYo5o1jD:APA91bGNF3G8bQYXkkHg23AiXYAYAKNO7_G6muE1zH-WP5hwx3SICYRCetznNkQIXRMgv-7qWLVE5LT2LVuORi0bwVI8A7bN0CTAxgmve7BIAQE6gE1CJmq9ZSRzt0Dg_-FZ-0ClbKj3'),
(107, 1, 'ហម ភក្ដី​', NULL, '85593755757', NULL, 'kdeY101084', NULL, NULL, 'HORM ASIA Co.,LTD', NULL, NULL, 1, 'fzwEMWBrSB-x58oEpziF05:APA91bFa_U_c8eo07yWP9mQ67oAKmxip3SbiI19wziT4stwnV6HqlMwxh-eWnuVoVn6watJTScy_2K_C2qY359_0g5VJtf-qG59aE15e3iXmiNW5WDMe5Mc3BTCBEBv3C0B59JgIF0za'),
(108, 1, 'pich salrath', NULL, '85586257525', NULL, 'borath9999', NULL, NULL, NULL, NULL, NULL, 1, 'd72IfD_cQZSqeit5OlhCds:APA91bHukNsz51wGBJlVkxHqfmXxfA0GprdH_ay9XRkUgfpFdcD2fNIagi4_cdi4MvgMnqWInAEv3Iteqs89mej0tVd0v2NXiz6ySOBEbsTu5CNWY4V39D9l2h1XQ5gWHlsHHPwoZ4Kn'),
(109, 1, 'Monrose', NULL, '85569246888', NULL, '123456aaa', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(110, 1, 'Heng', NULL, '85595222343', NULL, 'kang123', NULL, NULL, 'ABA', '123456', '123456', 1, 'diS2uAHtN0OqoN9c1fqDEB:APA91bFD846NfX3CEwVx7Mh2Kw5aA3AOStSJF1JOeVrsKRtUnOJ5IRdHuNQ4i5_aHpxjbPV6OeEZObWgi2h-DMmCslrvnNbWqWPUbAo6nLFei15qTuKFQc-Xn_TOra4wNAFKbhLmwy2F'),
(111, 1, 'Shop with Mish KH', NULL, '85515288935', NULL, 'Mish@168', NULL, NULL, 'ABA', '888288988', 'Vaiyi Chhou', 1, NULL),
(112, 1, 'Mr. CK', NULL, '85561441774', NULL, 'Chankorng1993', NULL, NULL, NULL, NULL, NULL, 1, 'd6_8wDyrSXCZMeeMylEIx7:APA91bGZqalzRf6HdxZi40lqNglq1Ec9rFFMgs9yLJEAwkATZRbqegRY8ohv-tWvLdjeD5gF_eczL_RHRjxv-WljboP8k997Tagc_MqW46FH9WGtlghNN6XIqzPnESFf8_hDLTw-nE2R'),
(113, 1, 'សេក ប៊ុនជឿន', NULL, '85599899077', NULL, 'Chan123sarun', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(114, 1, 'Simple fashion', NULL, '85578706032', NULL, '078706032', NULL, NULL, 'Aba', '000447628', 'Han sopheak', 1, NULL),
(115, 1, 'MST express ', NULL, '855969727373', '115_1rBbN3PA7RabRG7jvfGw.png', 'the12345', NULL, NULL, 'Chan Sophal ', 'Chan Sophal ', 'Chan Sophal ', 1, 'eXOCu1lfAUOavmFBpM8WD1:APA91bEshN42UQho9f8qSEsWpx-hMhNSY7ZrbNlJqiQzkQwYrJgEAgfSyXAoi92HPzvVHUTRwVoLSaxSjoSyHUCICiNosLTMODYROxd2cEZaQqgJe3p13fNSf4iQxRJLqv1n2ANT0kso'),
(116, 1, 'សម្បត្តិចរិយា', NULL, '855882485227', NULL, '0882485227', NULL, NULL, NULL, NULL, NULL, 1, 'e53t7MiJShCefHo6iJSJQr:APA91bEMM-rBKYHR3Z4lyXDfTc8RcIPCfOn_idbL6gc8rMG6m8qTKgN2UZFbfHoERV5A274jXkgPMnnyUgTdHH1grT7LahHCpnEM_NgjfQUH6zwnKNqG0oBhbQf4N8yYN_FCA79zXgBP'),
(117, 1, 'Zoe store', NULL, '85586300073', NULL, '222324', NULL, NULL, 'ABA', '001756533', 'Sourn piseth', 1, NULL),
(118, 1, 'Ly Toeng', NULL, '855965005205', NULL, 'Toeng846889', NULL, NULL, 'ABA bank', '001687836', 'LY TOENG', 1, 'cg4idpeKS7u5AuQDwDUFSx:APA91bHe21x-2V3lLrpWIazBXaNFVT5ZO8QKSbEA0eyMzfa1g7Z-jvlLm4H6FEUPYiUq-RvbyfG8HNh2lJq0aN82VONkTVYx4mkE0-OH9p1LzsD7khjR-4yBQA85k2sLV9NZUP4tlhj2'),
(119, 1, 'Sengheang Kong', NULL, '85516585986', NULL, 'heang21081993', NULL, NULL, 'Cambodian Public Bank', NULL, 'Kong Sengheang', 1, NULL),
(120, 1, 'សុខ ចាន់', NULL, '85515287859', NULL, '12345678', NULL, NULL, 'ABA Bank', '000264126', 'សុខ ចាន់', 1, NULL),
(121, 1, 'Twitter', NULL, '85566962773', NULL, 'kELl!kKU8c8RmBH', NULL, NULL, 'How much', 'Subscribe', 'Gosh', 1, 'dbQnZeM0T0aZOqU3pZkMqT:APA91bHMZ2f5YncicibZXsw8Eju53w2VZY93DfJH4i49iCYTAYM3bRPi6kM-mImxBxgj-ISSLvpefgxw-qIrDGSIwi3lS4f_ZfajCzHVpbgxo-4JaDp7-hGi7vNJcCKIoUvxjioDM_dh'),
(122, 1, 'ប៉ែន សុខា', NULL, '855973728815', NULL, '12345678', NULL, NULL, 'ABA Bank', '000264126', 'Pen Sokha', 1, NULL),
(123, 1, 'La chheang', NULL, '85570424648', NULL, '4246', NULL, NULL, 'Aba', '500083968', 'Aba', 1, 'f90GfRYvTyC80oLgh1yu6M:APA91bHxT7u4XvZSqj4r-a_tKdC3rRakPpnuwTzeBhC9pNwHjI-O296vcjIN41iE-vVzrZg0DAZlPTwydQe1rn0DL8bWfQquhQW9-53T4jm-BvuMJYWwnLo83KtY2yylgvlt1f_73zG-'),
(124, 1, 'Lykunthea', NULL, '85569323356', '124_m6obKJunqcd00yqRvxuI.png', 'Karuna558686', NULL, NULL, NULL, NULL, NULL, 1, 'csUoAayL7U3LqYmBjtgPyX:APA91bGtiLxDZa8ZDRnkX3iuUH7ThJlZbjejU_aZLh4boIWc9BzTfGZ7PUdOYvpuVDf_i3jZEmXFBgo6sL5eEOHk0uQESx757C5NJWZ7g00Bcuo7lGgarJfgnsXl9YJEmoCufa6S2wRz'),
(125, 1, 'Chak', NULL, '85599332807', NULL, 'Chak1994@', NULL, NULL, 'ACLEDA', '38690151131818', 'KH', 1, NULL),
(126, 1, 'MK Car', NULL, '85585799416', NULL, '123123aA#', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(127, 1, 'Kim Doung Samnang', NULL, '85581492211', NULL, 'Nang1995', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(128, 1, 'ហេឡាលីន', NULL, '85589663653', NULL, '88889999', NULL, NULL, 'ABA Bank', '089663653', 'He Lalin', 1, 'fFVsJq3ca0neoRCGz-rFQA:APA91bHKdHjzlqrB5Nj3T0wQUbFumjPdEGcwy0rTdOmCorl9I3nQyIaWSwWOPVEYwO_5bAa_2v_zKRsEF7hLdr1g2dU7CHlo5GzlQhABcIsr5z0Ox6n_jhBslSP1J_kAhSWVT0yOHe0b'),
(129, 1, 'Sreypich Ouch', NULL, '855888721725', NULL, 'pich2611', NULL, NULL, 'Pich', '25122002', 'Pich', 1, NULL),
(130, 1, 'Nic Store', NULL, '85577311139', NULL, '077311139', NULL, NULL, 'ABA BANK', '000384785', 'OENG SREYNICH123', 1, NULL),
(131, 1, 'mon brand', NULL, '85593733397', NULL, '093733397', NULL, NULL, 'ABA BANK', '093733397', 'Montha Chhin', 1, NULL),
(132, 1, 'Chhattra', NULL, '85510567264', NULL, 'TC123456', NULL, NULL, 'Smart home', '000193861', 'TOEM CHHATTRA', 1, 'cQKUnUqGRGKSLQW-O9ajMU:APA91bG6l7IlDaJKcmnepH6E1ve54oDIFjfwT8NA3M3rUtWp9Yuq4-77QLGX0tTpOqZ6XfANGC4vDSbTECzEKPDxb93WZe-d2OrJxGCTp_36AiMFCTKJKw49RrzVwPvKF6R3mDuYfWE9'),
(133, 1, 'Seang sokuntheary ', NULL, '85512738870', NULL, 'theary012738870', NULL, NULL, 'ABA', '012738870', 'SEANG SOKUNTHEARY', 1, 'fVf6c-9lcEN8iH_t-lPtKH:APA91bFma0QoBstmYkwlytzOQV40PPI1bEO49Y8_v07AC36YTx6k4RclFG_vr_NWh9TkQj4RHWciZgaVc_2Cf8t363YgaCsjnltF4SEFQZzoGmY8vszM1095MO9H4zdBZdfd8Es45NeR'),
(134, 1, 'GSM COSMETICS ', NULL, '85567609909', NULL, '067609909', NULL, NULL, 'ABA BANK', '078607999', 'MUONG THYDA ', 1, NULL),
(135, 1, 'GSM COSMETICS ', NULL, '85578609909', NULL, '078609909', NULL, NULL, 'ABA BANK', '078607999', 'Muong thyda ', 1, NULL),
(136, 1, 'GSM COSMETICS ', NULL, '855972349594', NULL, '0972349594', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(137, 1, 'Raksmey Salon', NULL, '85516846611', NULL, '016846611', NULL, NULL, 'ABA BANK', '016846611', 'PHO REAK SMEY ', 1, NULL),
(138, 1, 'បង ឆាន់', NULL, '855972100007', NULL, '0972100007', NULL, NULL, NULL, NULL, NULL, 1, 'e-IqOoWzQumGCsC-0R6UGP:APA91bHh9STKaZ4JIV_zS8qD_qyqzzGFJFvEMeFjF8liPrxR9bVLnNJpx2jx70e7Joqt_SN3FAu7RG46VdzQ0bb3gDArNbMIE9kJ7onokBb-Vbd_iTtmmsEaFg7s7eqwbHqnBo28w0n4'),
(139, 1, 'Men Shoes Outlet', NULL, '85510647859', NULL, '010647859', NULL, NULL, NULL, NULL, NULL, 1, 'dn4jM85eXk3EhPqdqDdJKe:APA91bFHmQfmhigehRbkGc5Fv7pVquRTZoJW7PN1WxLB01B8Cy52pUE3V1nRW72fPLrYO2Eb1dDbUc4QIo0JtpBhKnjvKM4WhVoU8lgOzWMz5L54JwNhjGoXLM7-TwzZezZMqQ9yzHp4'),
(140, 1, 'bongrom', NULL, '85512624407', NULL, '089664056', NULL, NULL, 'ABA bank', '000406621', 'PHOUNGSAROM', 1, NULL),
(141, 1, 'Freelance', NULL, '85598418093', NULL, 'aj8068524', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(142, 1, 'Century21 ', NULL, '855886716672', '142_PELvSa3Ovk4NN8utttav.png', '12345678', NULL, NULL, 'Aba', NULL, 'Aba', 1, NULL),
(143, 1, 'Bong srey', NULL, '85570900131', NULL, '070900131', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(144, 1, 'CAMPrintad', NULL, '855964658087', NULL, '123123', NULL, NULL, NULL, NULL, NULL, 1, 'd4EKKoc4S_2tIqg27OYI-Z:APA91bHAKYtUmYttpnZLfr0roeIxbe1NOZeFQL5zt63Y38Gl89ArBkgw0n8tMHBUnNEu_XsjppwT64aFGLwV7Zbz87Vu8AWZf1javLnY3KC-EABlAy4fufX-u3fsdRkITnlDUxpEu2hX'),
(145, 1, 'Am Visal', NULL, '85515688951', NULL, '123123', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(146, 1, 'ស្រីមកុំសម្រស់ធម្មជាតិ', NULL, '855884860870', NULL, '0884860870', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(147, 1, 'Osaka shop', NULL, '85566352569', NULL, '066352569', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(148, 1, 'LY Toeng', NULL, '85578846889', NULL, 'Toeng846889', NULL, NULL, 'ABA', '001687836', 'LY TOENG', 1, 'dZ75YCfmRQ6dHFhv_oDfLq:APA91bFMDzd9dWQUzv0wOuJb4qi1KJ_DW5BzqxCuAvQ3RR91pGij6WqS35hRbfIly61BBT0J2EndMxZXGwCkGrjHRYHE6CAsWBKPjY11sExSH10h0hi5VnwzUHMTXsXFrYI5g5qZ_-5F'),
(149, 1, 'Love dear', NULL, '855975552877', NULL, '0975552877', NULL, NULL, 'ABA', '000440573', 'ABA BANK ', 1, NULL),
(150, 1, 'Love dear', NULL, '85566999331', NULL, '066999331', NULL, NULL, 'ABA', '000440573', 'ABA BANK ', 1, NULL),
(151, 1, 'PuTh PuTh', NULL, '85593830026', NULL, 'Puth096', NULL, NULL, 'ABA', '000908154', 'NAT PUTHEA', 1, 'fB8PEDA4S5uMCyrMzzB5Ok:APA91bGnaCHf8ZZm7Rw_3AsajwZoYhkWWCwEnEizTLaC8BDGgxVwzwBefWQKJT7foIn6FAbhw9zv4geY4ocpo5cAe9-MmYx8P1ZaQC2i3R8IStia9UEKl2dZOccCFi5REz-Jnl7IJjU1'),
(152, 1, 'CHHUN LEAP SHOP', NULL, '85517588687', NULL, '017588687', NULL, NULL, 'ABA BANK', '000756135', 'ABA', 1, 'eRwrNOYXr0atvtBlojD8Tn:APA91bG__VwZYoTMuQy5nPGjn8gvXVQ6owBHhBt_1dSkCejhN2Z7QLNebmqZaqzWEPLbou5IkhlBPjTrluo5C4Om4IvkA2qZeOZAKkR6z9g5o1oTPV25keSB4AzPLJ0tf-1peDHeqaKg'),
(153, 1, 'Samba shoes shop', NULL, '85577201727', NULL, 'mey121292', NULL, NULL, 'ABA', '000534211', 'Chea meylie ', 1, 'ckMLPPJ7AUwss02Cbg3e03:APA91bEvP3eGfB5bSX2Qf8_YnN5zMRo8snbR8e0MLrjPH7h7vDsHUbmZ88pdW85Z7Jz8c6GnpRyPDWlr99IxovwNpUXcNjLG5_st6gPZyiUT0bJ4aqjp1gWv0iGcCap7gljwaHx5zyyb'),
(154, 1, 'MeyMey online Shop', NULL, '855719999427', NULL, '0719999427', NULL, NULL, 'ABA', '964469992', 'HONG RAKSMEY ', 1, NULL),
(155, 1, 'Jenny', NULL, '85569203012', '155_mTZhyADfRFmZNxe61WYh.png', 'Jenny1$$', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(156, 1, 'SMR ', NULL, '855965555939', NULL, 'heng2021', NULL, NULL, 'ABA', '965555939', 'CHHENG SIEK HENG', 1, 'eYsuSjD_EkodnEmUNfypF1:APA91bFKE1_weyFVvEcWVXJkhR_csHH0xde6YtStzBeIQGMFT1pOAYwO3oUn8cOmXgIAbQftZWVh41QdWbsZSp3TctkqkdWibAO6u4itWL-9rd2pvVNl8FdzSpLQioQ99FhCOHippege'),
(157, 1, 'NNS', NULL, '85569909616', NULL, 'sreng2021', NULL, NULL, 'ABA', '002562920', 'SRENG HONG', 1, 'c_07FJ6vgUCEvf_RcXMZwA:APA91bHg1uHeQpRjmrXSVx-spL7MmSkc6TheNYcnjd-LZJe1wlmL3U9b6oXOkxUXjqAwYgRusPFDoZ33YuDFM-6HHW3_B92vCBl3rkmukEx35Pi6L61sSNXOYwK1IjF0zRhC_zm_TuMu'),
(158, 1, 'Leang Sreng', NULL, '85561456795', NULL, 'sreng7777', NULL, NULL, 'ABA', '061456795', 'Thai Leansreng & Heab Sreypov', 1, 'eNpdAAz1Q1Kjwc80Zyr0o2:APA91bEyz89GF3uhzSBOPk-V2-rcAxBHBE_Rd0_dJFuJgov0MLleE8wy_TalcCeyhZBF52X_pS33TZ3woWlQ9Ww4sp462l-lNPbGwU7mftrn-3iUqEHoahykYU4mHjbIE_Fsir-0OX_J'),
(159, 1, 'Kong Kea Krab', NULL, '85515409091', NULL, '015409091', NULL, NULL, 'ABA', '500373051', 'Som kongkea ', 1, 'eb5DkvEbV0ULn5wvjVWxrw:APA91bF7CRKAZZ18QsJp3yXknlf_dNFwLqUYmSxOxk9h8bqFn_nKcJ8jGlAOYOco4-G6IDZOzjQo3r5V-OxP0ChmA5U8vB-cUTr4f1HpywryUPsQLCUq6Z_X3kssxUYkhTMi8aH2AVsr'),
(160, 1, 'Kanha Store', NULL, '85592535655', NULL, '092535655', NULL, NULL, 'ABA', '001587884', 'Ly kanha', 1, 'crdy730jT5Kt8nFM0taiPD:APA91bGlapnGSn_gYje8XXVnTVTUS7gMySN_ZOwjElpSDEtIWAJBvaCV65GKi21KreMtTzvY_xfro2FOWo38fEgF9pwkfKHW7TYWjgNGapRx0XDBkq7-2hduvWHFgnkOxTh9ffSBH7sk'),
(161, 1, 'Phal ROEUN', NULL, '85512630638', NULL, 'phal12345', NULL, NULL, NULL, NULL, NULL, 1, 'fE8swRNtTi-Cagm5MTvm8g:APA91bFN2yhaFj6o2Votzm-F9QtrtUjele3frkGfwmSKjrJhi_mLZaUqlDxDnR4gsdrtKz-rbJKr9PuUJN5wyl425zmw7UsrgUF86HEyGYZP1Slqqec3qxdDlUXlzwxqotUrYHbOBAQM'),
(162, 1, 'Pheak Phuong', NULL, '855964478585', NULL, '1345928670', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(163, 1, 'sokchan', NULL, '85587656444', NULL, 's12345cl', NULL, NULL, NULL, NULL, NULL, 1, 'd1ejO1oevUyxtwgLFeMpFa:APA91bGEdhHU71twfOaeluOuWde5Ha4zeGAdC3ZmMmz5F8_-KpkGDlsZApMFnyNV2zUCmKf5KobwoKHwaqJaUyIo0AKgwpBoZiGtRyQ9Hvl1hAbh8NiTJRXQy3RW4v77kI0Q9BAPQJ5m'),
(164, 1, 'EMR SHOP', NULL, '855974556973', NULL, '0974556973', NULL, NULL, 'ABA', '001742226 ', 'Tha sokngon', 1, NULL),
(165, 1, 'Bi Skin', NULL, '85577656523', NULL, '077656523', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(166, 1, 'Le shop', NULL, '85515966632', NULL, '1234', NULL, NULL, 'ABA', '086565601', 'Sor sovannarith', 1, NULL),
(167, 1, 'ជា សេង ហៃ', NULL, '855965888049', NULL, 'Pozzhai789', NULL, NULL, 'ABA', '002990584', 'Chea Seng Hai', 1, NULL),
(168, 1, 'Sophea Eang', NULL, '85515248001', NULL, 'Sophea', NULL, NULL, 'ABA Bank ', '000420899', 'Eang Sophea', 1, NULL),
(169, 1, 'Eang Sophea', NULL, '855978565505', NULL, 'Sophea', NULL, NULL, 'ABABank', '000420899', 'Eang Sophea', 1, NULL),
(170, 1, 'Chan Sophal ', NULL, '85512447007', NULL, 'chan12345', NULL, NULL, NULL, NULL, NULL, 1, 'eLgR-V_IokEgk4Os-BiRt3:APA91bHmW6vs7U91nnVmaFwcn82OHJoEarwJja76Ktfek4gKHasZJIbNTxDrjt-yQKSAT0fk9evXrirEPsSEnSdkHHb9zFaUoffVPMNiXLIp3Nukq82TJQRHHmZcWshZfZ0gqGcB52IG'),
(171, 1, 'Abdullah Mmb', NULL, '85581839200', NULL, '840313', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(172, 1, 'BC Mart- ប៊ុន ចាន់ធូ', NULL, '85560777796', NULL, 'bcmart2022', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(173, 1, 'TSP បោកអ៊ុត', NULL, '85592989707', NULL, 'Tsp671167', NULL, NULL, NULL, NULL, NULL, 1, 'e3CBIZ0lR0C7uCsOc8WPty:APA91bF9hXng163aBze3Y528Ut4QK-HqjF9wruIOd2Hl47o99193cWB8MmX9pQbIO-iioLLekQVU63N9u8BoPT6bMxNO8dPiSXP6o2BI640Aby1VT1WMBEfac3d74u3aP4KX5XyfvPyN'),
(174, 1, 'កូនប្រុស​តូច', NULL, '85570701617', NULL, '171717', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(175, 1, 'Suy Sivey', NULL, '85578286611', '175_TWyu70I0UuBLMaOdMFEV.png', 'suysivey', NULL, NULL, 'Suy Sivey Real Estate', 'ABA', 'suysivey', 1, 'eRWq-qXNZEGor_lKnSAuMx:APA91bHiSkYdJBT6EhOs_IW5stxbD8JEoc72S1JZNsLH6mJO41lF4BfRL8D7Ir_N5_JC7LeU34AOc2ipiXMSWHO6SeihAc2-ixiavGo7Cb0dylgcAFNsxdkPzuuuDESVmn1UmzwolVsr'),
(176, 1, 'សឿន រីដា', NULL, '85592846666', NULL, '031979', NULL, NULL, 'ABA', '000475313', 'Chum Soeurm', 1, NULL),
(177, 1, 'យិន ចំណាន', NULL, '85567881699', NULL, 'Chamnan12', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(178, 1, 'MEAN.KAT', NULL, '855978593373', NULL, '0897', NULL, NULL, 'ABA​', '500330277', 'MEANKAT', 1, 'cYvsdJCdRXW7Nd1G2b8yWV:APA91bHyit7CHEubvjUIxjKAmpwmFSL79djyKnW58JGd17vOsP80OLf8wnMhMwdzzpJlbL2VxWHDOYMH9wsL0ntoYNcL_onkNZkOWFVFZ-0VGu3vxiX7YZzq5kCoa-Xq0ezxEk7XKILq'),
(179, 1, 'MST EXPRESS SIEMREAP(CHREAV)', NULL, '85569912336', NULL, '666666chanthan', NULL, NULL, 'ABA', '000876834', 'HAM CHANTHAN', 1, NULL),
(180, 1, 'ឧត្ដម', NULL, '855972330687', NULL, '72330687', NULL, NULL, NULL, NULL, NULL, 1, 'clZlbCPNSSq0Lwgikr0J2b:APA91bFFs3Eug7Y_cdhz24nYqdxhliy2aD6NucU8em_5a3FjqPm09i1jpT3kLovPOQrtyzhCqmVSeHw5vll1dbn8wEYpYXaztByE1feHOtYXHtOP8uZFwQqZbGXztnBnOT_wEGIQZHo-'),
(181, 1, 'AI VISION', NULL, '85577256356', NULL, 'Ai256356', NULL, NULL, 'Aba', '077256356', 'Seng bunhong', 1, NULL),
(182, 1, 'កូនតែម', NULL, '855885649242', NULL, '123456789', NULL, NULL, NULL, NULL, NULL, 1, 'cXWFUfnqSySM8tBRqEHU3L:APA91bFZid-wl-1-kshxZGIa1RjBAGJ9L1zfTofvzoW8Zy0bjvOuG9m3m9iuCzPgQ7WbRS7zd-O2DYzVf_zaBJgh1WM6x0aQF-e2HRxVz1HCh_75Tu58zl01JYdeevGiltqhTTQkVG1S'),
(183, 1, '24k', NULL, '85511358862', NULL, '011358862', NULL, NULL, 'ABA BANK', '002009308', 'ABA', 1, NULL),
(184, 1, '24K', NULL, '855968248656', NULL, '0968248656', NULL, NULL, 'ABA BANK ', '002009308', 'ABA', 1, 'fO6LsVPYYUXHkx_d7-bVNC:APA91bEocBjFBGpURzGfHpChPtFE7vqbtvomIdcKa8DNy50xJVLNW-E3RNgfZI6hfEi6iWMqLxOLQQc6MWaCaxWmtAnXmdC0AuWx2iGp89SxzYpmSs2kpr506OmJFP63X35SSibjBVjl'),
(185, 1, 'TEP CHANKRY ', NULL, '85515758566', NULL, 'Apple015', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(186, 1, 'Lika Shop', NULL, '85511310510', NULL, 'likashop', NULL, NULL, 'ABA', '000513794', 'Sim Bunnaral', 1, NULL),
(187, 1, 'Nara', NULL, '85566900119', NULL, '11112222', NULL, NULL, 'ABA', '085568696', 'Nara MEAS', 1, NULL),
(188, 1, 'Nara', NULL, '85585568696', NULL, '11112222', NULL, NULL, 'ABA', '085568696', 'Nara MEAS', 1, 'dyZorxHiQNqnKXZtNYNfOG:APA91bFGj-zoZMnDyokYkvNYSL2HScuxBrjHWz4hIsg_9fZxyWWWh1yLQWerAxPUznFbMGrIhTdwAnU5nkLBErepUbMcUPS8Ndyl7cCEtL9i1aqq_t2Z_twwEAIwYR2vIR60D42L5ysq'),
(189, 1, 'Lita', NULL, '85510418466', NULL, 'kylitaseysey', NULL, NULL, '', '', '', 1, 'c3pxOmdjYEHrq1GeQMJD-c:APA91bGBBhzf03Rzs0YYWFX6i1EJxs0zdS2vjH3jj4mh5quP4oou-Dih72WMF6HXQU8_F9w8DoRwIy_9TQgdkH0n-r3AFIaV46YuIEnpP2JOTmuvPlp8rOUn9geZhbPvZJPy-_O9MAB5'),
(190, 1, 'Sophiya Beauty Store', NULL, '85595452833', NULL, 'Sophiya123', NULL, NULL, NULL, NULL, NULL, 1, 'fh4VdXUMTEFlhzAUi5ipx4:APA91bGDggWLxXqjBOhcu_AZEJRHyytTvNeOjTd_kUa1VpITD-DN32M4AeQBnWOTMPoQwxLO320PhvaGpLCHasLN82ok3rcQg6nCW0H2DDd85P9-MjkqC_jbYDdpLwr3L8QGRsuMlonO'),
(191, 1, 'Neat', NULL, '85512200422', NULL, 'neat060394$', NULL, NULL, 'Toyota ', NULL, NULL, 1, 'ftoZDyGVp0xKqk7uRy3JNr:APA91bF80nDOy9NOIpeQmEdWaWlukm3hVzBkTNCyHlOupSpAKwG51wdTTWRHFakXwibu6jlwypat1h9SU8YWJDlprOMyL0xZ8lH26v-v2CbQ1bCcCqgZV3RJig2vS9jaPSRn4TyaPMSe'),
(192, 1, 'Samady', NULL, '855965607378', NULL, '123', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(193, 1, 'Toyota (spare parts)', NULL, '85517333877', NULL, 'Tcam9999', NULL, NULL, 'Sarith', NULL, NULL, 1, NULL),
(194, 1, 'Thy Thy', NULL, '85510291380', NULL, '010291380', NULL, NULL, NULL, NULL, NULL, 1, 'dXzYSv0-S7Sa3NESH_jTki:APA91bF8ESmFj847yB5yrmJ_xQWqqayd2frC9EmBOf03cEhCALggKGXQRSJni0FQLvxiFoG6ZcZgW9x8M3m4cWN9-NjHWOShN0op8ieBxYeJkK_MvwQ8uEOhAhGKv9jZSGzhYPLvH-v6'),
(195, 1, 'Bongmeng', NULL, '85589737772', NULL, '8322', NULL, NULL, 'ABAbeng', '089737772', 'Taing kimmeng', 1, NULL),
(196, 1, 'Awie Pomen', NULL, '85566242289', NULL, '1989', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(197, 1, 'Khav Søphea', NULL, '855966768195', NULL, '@khavsophea011018', NULL, NULL, 'BAB', '500018276', 'Khav Søphea', 1, 'fdAaQBZ1Sm2--ReZJsR8KP:APA91bFiYXpCUivflJoSfQRLT78W6k8yWRfV9DbME7L7CIAq6GRrFVG_NegQ1jIVf7WapK6NEwGZwTgpHCX21aifc4mfz1AXAKBxuXwSQOlGaMTfqtomb2bfIBwwaT3tha4RhbeBr5JS'),
(198, 1, 'Mak sambath', NULL, '85510541141', '198_TjFIsrxoYD4BMV4z4R6t.png', 'AAaa0304', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(199, 1, 'Prim charming', NULL, '85569789805', NULL, 'ming9045', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(200, 1, 'Chhay Hak', NULL, '85517803388', NULL, '803388@Kh', NULL, NULL, 'ABA', '017803388', 'EA SOKHONG', 1, NULL),
(201, 1, 'ចែភក្ត', NULL, '85569252227', NULL, '069252227', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(202, 1, 'CHEA MONICH', NULL, '855967777173', '202_0lLzIFwO0GDYJMwjgBpg.png', 'coosea', NULL, NULL, 'ABA ', NULL, NULL, 1, 'dA8Ujfh3qkYfr-2ZL2kaLK:APA91bE37fFX3JjlbqRohjgZ0jMowXgN736RSsT3z7l3BBHvuhcp7qqgVRD7cIPEjTGl017G4-Yuq3iSOlzeNvylqbTmOxfKU8ZuoZUuCNOFTndw2ZqIPaWZ4TTXSKJCA7-095pPZ5pl'),
(203, 1, 'Lika Shop', NULL, '85586537995', NULL, '2265070678', NULL, NULL, 'ABA', '000513794', 'Sim Bunnaral', 1, NULL),
(204, 1, 'Su jin Kang ', NULL, '85581665642', NULL, '168168', NULL, NULL, 'Veronika ', '000247454', 'Kheangseaklim ', 1, 'dKq7tN-a3kWVoTytTgowXE:APA91bHneR7qSthxceA0wc1TINmIxE37Vwl-eo84A9b6Bc_EdkiSdqg55tmvjhpadd36OHMHQ-e4Fkh39mTE7O2IFZp2z8kejjsbfOP3GRCGPCat_cmd2k0zY0BmUOzUkZJhFVwCs0X2'),
(205, 1, 'Daniel', NULL, '85511484202', NULL, 'daniel5721', NULL, NULL, 'aba', '000458460', 'MEUNVEASNA', 1, NULL),
(206, 1, 'អីឡែម', NULL, '855976623434', NULL, '0976623434', NULL, NULL, NULL, NULL, NULL, 1, 'd6z-XUANT-WK471JUEWVMk:APA91bE-2hxwd-Gl5-Z8t1rJqlWkwfmbUxjpWCWswu_f-CSFNNIa0NaodhOh6IcWEPi30ose_vyItLPL-x_GsATqcq3AJvbsNHXndbgPMOl3lNHt8GGmXMEuHyIcGxJcBlqCetP-VIBX'),
(207, 1, 'បងស្រីឡែម', NULL, '855973651939', NULL, '0973651939', NULL, NULL, NULL, NULL, NULL, 1, 'e3Jwsi8VRaismFyy-BSrHj:APA91bFIDKCy1112ErFJcNNJU5ddoOV70-A9D-zh6pI2fUAjN2aQJXmJ_ZdSdHMNNI2d1GlLKvgQJa1JvzqLV9dvrqKxl9G99bwotAwTeKEThEkzUWCvmeXUIswDkj3uPM89v_uSTxac'),
(208, 1, 'TY black', NULL, '85567730542', NULL, 'ty', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(209, 1, 'ជាង អូន', NULL, '85512900166', NULL, '012900166', NULL, NULL, NULL, NULL, NULL, 1, 'ftLlSpNTRS-1ltKq_h3asJ:APA91bGeKxWc-Mtw-x4jdNZAoSkrCOKSTIeRS2uCH6JRpmc7gd_T032mK9gZb1y1NpbCs-qy5NsUNfdAp9b_TKAF8ckZqEC6q9ibJONjeJbcHfpOH8FEsarLT39_ZOuO1Jam61rQ1G99'),
(210, 1, 'lim kethya', NULL, '85577222211', NULL, 'pp390625', NULL, NULL, NULL, NULL, NULL, 1, 'dSP9LOwXS0ipk2HdgHaGkA:APA91bHf91HRAp_X7ip_f9fmm_OLTDrl6k137xbZOoJcZNWMrKQ37c9JcCHabw2Yy0of5-sN0wQIicuQiFDHyTh89rPMKpDdhbTeYj9ZDO3oNdMDvtv8wKiQnHxAXAUxfnrHE9k1o2X6'),
(211, 1, 'Ali Shop ', NULL, '855888490000', NULL, '0888490000', NULL, NULL, 'ABA', '000279306', 'ABA BANK', 1, NULL),
(212, 1, 'Chhombrospy', NULL, '85511540200', NULL, 'Molika123', NULL, NULL, 'aba', NULL, NULL, 1, NULL),
(213, 1, 'SiNuon Khom', NULL, '855885741379', NULL, 'Nk5895', NULL, NULL, 'ឆយស្រីស្រស់', NULL, 'ឆយស្រីស្រស់', 1, NULL),
(214, 1, 'B', NULL, '855713161533', NULL, '0713161533', NULL, NULL, 'អេសុីលីដា', NULL, 'អេសុីលីដា', 1, 'eK92uzHcRrabzK5dY9GPW5:APA91bFQlRdOQRif1CwBrlLv30Y7Cl_9-WLPkj816XFFZVNTlaoiH6dNV_6lpkqcYLZNgLKhfCA68lY1nDxyhgi2ExeTTMkudgBEk3uIZjJWN9CIdiMpPMv283w03ym8hh-QAJgVgDmP'),
(215, 1, 'Sary nit', NULL, '855973599416', NULL, '0973599416', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(216, 1, 'នីកាបោកអ៊ុត', NULL, '85511262727', NULL, 'Run34525', NULL, NULL, 'Yimrun', '003032227', 'ABA', 1, NULL),
(217, 1, 'Nil', NULL, '85512492372', NULL, '140695', NULL, NULL, 'ABA', '001946909', 'Kongsovann', 1, NULL),
(218, 1, 'ដាណាន បាត់ដំបង', NULL, '85585719000', NULL, '085719000', NULL, NULL, NULL, NULL, NULL, 1, 'cvvonHLIS-aJcnDE8FLWEa:APA91bGOdqCngt71wedG2gfeeAEBnsNXO7qtZbkg3LxQatiXqsgnC6GtGlcosImn61Y-EtUCzmVU4IgmjXc0MyuX8GVgJVLfOecjQtQE8DzehE6nYwydjtpDZnmCJLuctuEtQiC7E8mI'),
(219, 1, 'Toyota Spare Part(Tavan)', NULL, '85517222503', NULL, 'Tavan@123', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(220, 1, 'Kuy Serisa ', NULL, '85511816720', NULL, '22446688', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(221, 1, 'Hm collection II', NULL, '85598983535', NULL, 'Somebody2love', NULL, NULL, 'ABA Bank ', '001185128', 'Kong Virak', 1, 'emhSDA-iJE4eo3xXFf2QCH:APA91bErw_-RXjPJ1EI69WHLQeOjJ4m_YfYR7guGX3ts-OSw5cAZZ1wDFFlXJduW4KTTz_C0RJazAuYPb7S40rizz24WddyITdGsdTHGwoHA8W2mdJI_jqpDZ0-Jod3jT8mRxlJy7sb6'),
(222, 1, 'ដារ៉ា', NULL, '85515996296', NULL, '985842', NULL, NULL, 'ABA', '0000121638', 'dara sim', 1, 'eLXvuUzzaEWyu_w_DsT4q2:APA91bETuX9j-4H-GIcOYTsohQLDxNT3xOx9kFog9gszadd8sk7uAy8Qv_fxDTVLvN5LvddZlD6FOaq9h9Xf_kck9Q01qrAjgRXNOpmibRM9Q85kGfLJ-XCdYguCquKx0joHlpmEerzX'),
(223, 1, 'Phy Nuth', NULL, '85512537323', NULL, 'phynuth', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(224, 1, 'Phy Nuth', NULL, '85589404650', NULL, 'phynuth', NULL, NULL, NULL, NULL, NULL, 1, 'dNmrbk7YOUEZrD6VLjkE26:APA91bEeM1klCxpq-cIg8A91XKMU0d7ZutK-L9VOveifva16U-2Ja6VHS8AQcaUpM6cgHe5Y8KXZKyiHJ4IUxMhTTdIPdk2Bf-8AjS-_eAAYFe3ngk4VI6cEYiQwgbr7_mZk9-SgbqB5'),
(225, 1, 'IOT Store', NULL, '85510579123', NULL, '010579123', NULL, NULL, 'IOT Store', '000676396', 'ABA', 1, NULL),
(226, 1, 'ឃាវ ស្រីលក្ខ័', NULL, '855315677222', NULL, '22334455', NULL, NULL, 'ABA Bank', NULL, '098567922', 1, NULL),
(227, 1, 'ពន្លឺ​ ចាន់', NULL, '855963737168', NULL, 'Cm012816307', NULL, NULL, 'ACLEDA', '38360066308615', 'ACLEDA', 1, 'fWLvbtsO0Es7njIznxpiII:APA91bENkqDHW2rfDi5SjU1lQ1_V_y-MqSVK-fm2cQgZABFJy24L3W4dfx8MeAVVpAfCbbj9kfz6XSFm7atDShkjAuEMi11rChxQirc5qe-FRNX3GsdEvuwDyKmLbKjJ3Ss61ijFNxfL');

-- --------------------------------------------------------

--
-- Table structure for table `tblSiteDescription`
--

CREATE TABLE `tblSiteDescription` (
  `sidAutoID` int(10) UNSIGNED NOT NULL,
  `sidID` int(10) UNSIGNED NOT NULL,
  `sidLang` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `sidSiteName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidKeyword` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidCopyRight` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidEmail` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidReceiveEmail` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidPhone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sidAddress` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidLogo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sidAppVersionSeller` decimal(10,2) NOT NULL,
  `sidAppVersionDriver` decimal(10,2) NOT NULL,
  `sidBuyTrainUrl` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `sidPrivacyPolicy` text COLLATE utf8_unicode_ci NOT NULL,
  `sidRate` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblSiteDescription`
--

INSERT INTO `tblSiteDescription` (`sidAutoID`, `sidID`, `sidLang`, `sidSiteName`, `sidKeyword`, `sidCopyRight`, `sidEmail`, `sidReceiveEmail`, `sidPhone`, `sidAddress`, `sidLogo`, `sidAppVersionSeller`, `sidAppVersionDriver`, `sidBuyTrainUrl`, `sidPrivacyPolicy`, `sidRate`) VALUES
(1, 1, 'en', 'MSTExpress', 'express,cambodia-express,mst,mst-express', 'Powered By Suno Shop © 2019', 'monismey1111@gmail.com', 'monismey1111@gmail.com', '+855 85995530', 'Phnom Penh', 'images1624004871423logo MST.png', '1.00', '1.00', 'S5nRrnm8TKA', '<ul><li><span style=\"font-size: 12px;\"><span style=\"letter-spacing: 0.01071em; font-size: 14px;\">សូមបញ្ជាក់រាល់បញ្ហាទាំងទំនិញទាំងអស់ដែលលោកអ្នកបានផ្ញើសូមធ្វើការវិចខ្ចប់អោយបានស្អាត&nbsp;</span></span>ព្រោះយើងខ្ញុំមិនទទួលវិចខ្ចប់បន្ថែមឡើយប្រសិនបើទំនិញរបស់អ្នក ងាយនិងមានបញ្ហាបាក់បែក សូមធ្វើការវិខ្ចប់ដោយប្រុងប្រយត្ន័និង ធ្វើជាសញ្ញាសម្គាល់ការប្រុងប្រយត្ន័នៅលើទំនិញរបស់អ្នកផង&nbsp;</li><li><span style=\"font-size: 14px;\">ធ្វើការឆែកត្រូតពិនិត្យឡើយ ក្នុងន័យរក្សាសីលធម៏ និងភាពជាឯកជនភាព ប្រសិនបើមានករណីមានទំនិញខុសច្បាប់ រឺ ទំនិញគេចពន្ធយើងខ្ញុំនិនទទួលខុសត្រូវឡើយ សូមលោកអ្នកទទួលខុសត្រូវចំពោះមុនច្បាប់ដោយខ្លូនឯង ។</span></li><li><span style=\"font-size: 14px;\">ក្នុងករណីទំនិញដែលដឹកទៅមានការបាក់បែក រឺ បាត់បង់ទំនិញក្រុមហ៊ុនយើងខ្ញុំនិងទទួលខុសត្រូវសង៥០% នៃតម្លៃទំនិញសរុប។</span>​​​</li></ul>', 4088);

-- --------------------------------------------------------

--
-- Table structure for table `tblSlides`
--

CREATE TABLE `tblSlides` (
  `sliAutoID` int(10) UNSIGNED NOT NULL,
  `sliName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sliImage` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `sliOrder` int(10) NOT NULL,
  `sliStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblSlides`
--

INSERT INTO `tblSlides` (`sliAutoID`, `sliName`, `sliImage`, `sliOrder`, `sliStatus`) VALUES
(3, 'wb', 'images1637471497044banners09-1.png', 2, 1),
(4, 'MST Express', 'images1636970576840Banner 1024x595-01.jpg', 3, 1),
(5, 'koy kompleng', 'images1637563006843Banner-4.jpg', 4, 1),
(6, 'koy', 'images1637563022627Banner-3.jpg', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblUserAdmin`
--

CREATE TABLE `tblUserAdmin` (
  `usaAutoID` int(10) UNSIGNED NOT NULL,
  `usa_braAutoID` int(10) UNSIGNED DEFAULT NULL,
  `usaName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `usaEmail` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `usaPassword` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `usaType` tinyint(1) NOT NULL DEFAULT '0',
  `usaStatus` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblUserAdmin`
--

INSERT INTO `tblUserAdmin` (`usaAutoID`, `usa_braAutoID`, `usaName`, `usaEmail`, `usaPassword`, `usaType`, `usaStatus`) VALUES
(1, 1, 'Administrator', 'admin@webbuilt.com', 'smey@admin.!!!.@@@.***', 1, 1),
(2, 1, 'MSTExpress Administrator', 'admin@mst-express.com', '123456', 1, 1),
(3, 4, 'Rachhen', 'admin@rachhen.com', '123', 0, 1),
(4, 5, 'Smey', 'admin@Smey.com', '123', 0, 1),
(5, 6, 'HEU LIYHIM', 'stong@mst-express.com', 'mststong0001', 0, 1),
(6, 7, 'CHHORN REAKSMEY', 'preahvihea@mst-express.com', 'mstpreahvihea0001', 0, 1),
(9, 9, 'KOUNG SOVANTHA', 'kulenpreahvihea@mst-express.com', 'kulennew123456', 0, 1),
(10, 10, 'CHAN SOPHAL', 'seimreap001@mst-express.com', 'reapseimmst012345', 0, 1),
(11, 11, 'YEAV SIVIEN ', 'preahnetpreah01@mst-express.com', 'sivienmst12345', 0, 1),
(12, 12, 'SAM OEUN ', 'komreng@mst-express.com', 'komrengmstexpress001', 0, 1),
(13, 13, 'SUN REAKSMEY', 'battambangkrung@mst-express.com', 'sunreaksmey1111', 0, 1),
(14, 14, 'CHHEAN AREYNATH', 'sreynath01@mst-express.com', 'nathmst9999', 0, 1),
(15, 15, 'TO SENGHUN', 'sorntok@mst-express.com', 'mstsortok9999', 0, 1),
(16, 16, 'CHHOUN SAMNANG', 'kampongsvay@mst-express.com', 'samnangmst99099', 0, 1),
(17, 17, 'BOEURN PALLIN', 'songkatsvaybbt@mst-express.com', 'songkatsvay9999', 0, 1),
(18, 18, 'REN CHANTHA', 'chanthakampongthom@mst-express.com', 'chantha1111', 0, 1),
(19, 19, 'YU CHHOEURNG', 'mstexpresskamrieng01@mst-express.com', 'mstexpresskh9999', 0, 1),
(20, 20, 'HY DARA', 'phnompreruk@mst-express.com', 'hydaramst123450', 0, 1),
(21, 21, 'CHANN PHALLA', 'malaimst@mst-express.com', 'mstmalai0987', 0, 1),
(23, 23, 'KHIN CHANTHOEUN', 'mstexpresspeypet@mst-express.com', 'mstpoypet99', 0, 1),
(24, 24, 'MAO ENGMAP', 'seimreap09@mst-express.com', 'mstseimreap1234', 0, 1),
(25, 25, 'VA KIMSUCH', 'mongkolbory@mst-express.com', 'mongkolbory001', 0, 1),
(26, 26, 'MEAN KAT', 'phnomsrok09@mst-exoress.com', 'meankat5555', 0, 1),
(27, 28, 'RITH', 'rith', '123', 0, 1),
(28, 29, 'Rith', 'Rith@gmail.com', '123', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tblZone`
--

CREATE TABLE `tblZone` (
  `zonAutoID` int(10) UNSIGNED NOT NULL,
  `zon_braAutoID` int(10) UNSIGNED NOT NULL,
  `zonName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `zonStatus` tinyint(1) NOT NULL DEFAULT '0',
  `zonPrefix` char(5) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tblZone`
--

INSERT INTO `tblZone` (`zonAutoID`, `zon_braAutoID`, `zonName`, `zonStatus`, `zonPrefix`) VALUES
(2, 6, 'ក្រុង សៀមរាប', 1, 'K-SR'),
(4, 1, 'ក្រុង បាត់ដំបង', 1, 'KBD'),
(5, 1, 'ស្រុក ម៉ាឡៃ', 1, NULL),
(6, 1, 'ស្រុក កំរៀង', 1, NULL),
(7, 1, 'ស្រុក មោងឬស្សី', 1, NULL),
(8, 1, 'ស្រុក ព្រនេត្រព្រះ', 1, NULL),
(9, 1, 'ខណ្ឌ ចោមចៅ', 1, NULL),
(10, 1, 'ស្រុក ភ្នំស្រុក', 1, NULL),
(11, 1, 'ស្រុក សន្ទុក', 1, NULL),
(12, 1, 'ស្រុក តាំងគោក', 1, NULL),
(13, 1, 'ស្រុក បារាយណ៍', 1, NULL),
(14, 1, 'ស្រុក ប្រាសាទបល្ល័ង្គ', 1, NULL),
(15, 1, 'ស្រុក ភ្នំព្រឹក', 1, NULL),
(16, 1, 'ស្រុក មង្គលបុរី', 1, NULL),
(17, 1, 'ក្រុង ប៉ោយប៉ែត', 1, NULL),
(18, 1, 'ស្រុក ថ្មពួក', 1, NULL),
(19, 1, 'ក្រុង សំរោង', 1, NULL),
(20, 1, 'ក្រុង ព្រះវិហារ', 1, NULL),
(21, 1, 'ស្រុក គូលែន', 1, NULL),
(22, 1, 'ស្រុក ស្ទោង', 1, NULL),
(23, 1, 'ស្រុក កំពង់ស្វាយ', 1, NULL),
(24, 1, 'ស្រុក ស្រែអំបិល', 1, NULL),
(25, 1, 'ស្រុក បុទមសាគរ', 1, NULL),
(26, 1, 'ក្រុង តាខ្មៅ', 1, NULL),
(27, 1, 'ស្រុក កំចាយមា', 1, NULL),
(28, 1, 'ស្រុក ឈូក', 1, NULL),
(29, 1, 'ក្រុង កំពត', 1, NULL),
(30, 1, '', 0, NULL),
(31, 10, 'ក្រុង កំពត', 1, NULL),
(32, 10, 'ក្រុង បូកគោ', 1, NULL),
(33, 10, 'ស្រុក ឈូក', 1, NULL),
(34, 10, 'ស្រុក ទឹកឈួរ', 1, NULL),
(35, 10, 'ស្រុក កំពង់ត្រាច', 1, NULL),
(36, 10, 'ស្រុក បន្ទាយមាស', 1, NULL),
(37, 10, 'ស្រុក អង្គរជ័យ', 1, NULL),
(38, 10, 'ស្រុក ជុំគីរី', 1, NULL),
(39, 10, 'ស្រុក ដងទង់', 1, NULL),
(40, 10, 'ក្រុង ច្បារមន', 1, NULL),
(41, 10, 'ស្រុក បសេដ្ឋ', 1, NULL),
(42, 10, 'ស្រុក ថ្ពង', 1, NULL),
(43, 10, 'ស្រុក​ ភ្នំស្រួច', 1, NULL),
(44, 10, 'ស្រុក គង់ពិសី', 1, NULL),
(45, 10, 'ស្រុក ឧត្តុង្គ', 1, NULL),
(46, 10, 'ស្រុក សំរោងទង', 1, NULL),
(47, 10, 'ស្រុក ឪរ៉ាល់', 1, NULL),
(48, 10, 'រាជធានី ភ្នំពេញ', 1, NULL),
(49, 12, 'ក្រុង ព្រះវិហារ', 1, NULL),
(50, 12, 'ស្រុក អង្គរជុំ', 1, NULL),
(51, 12, 'ស្រុក អង្គរធំ', 1, NULL),
(52, 12, 'ស្រុក បន្ទាយស្រី', 1, NULL),
(53, 12, 'ស្រុក ជីក្រែង', 1, NULL),
(54, 12, 'ស្រុក ក្រឡាញ់', 1, NULL),
(55, 12, 'ស្រុក ពួក', 1, NULL),
(56, 12, 'ស្រុក បាគង', 1, NULL),
(57, 12, 'ស្រុក សូទ្រនិគម', 1, NULL),
(58, 12, 'ស្រុក ស្រីស្នំ', 1, NULL),
(59, 12, 'ស្រុក ស្វាយលើ', 1, NULL),
(60, 12, 'ស្រុក វ៉ារិន', 1, NULL),
(61, 12, 'ក្រុង ព្រៃវែង', 1, NULL),
(62, 12, 'ស្រុក បាភ្នំ', 1, NULL),
(63, 12, 'ស្រុក កំចាយមារ', 1, NULL),
(64, 12, 'ស្រុក កំពង់ត្របែក', 1, NULL),
(65, 12, 'ស្រុក កញ្ជ្រៀច', 1, NULL),
(66, 12, 'ស្រុក មេសាង', 1, NULL),
(67, 12, 'ស្រុក ពាមជរ', 1, NULL),
(68, 12, 'ស្រុក ពាមរក៍', 1, NULL),
(69, 12, 'ស្រុក ពារាំង', 1, NULL),
(70, 12, 'ស្រុក ព្រះស្ដេច', 1, NULL),
(71, 12, 'ស្រុក ពោធិ៍រៀង', 1, NULL),
(72, 12, 'ស្រុក ស្រុកស៊ីធរកណ្ដាល', 1, NULL),
(73, 12, 'ស្រុក ស្វាយអន្ទរ', 1, NULL),
(74, 12, 'ក្រុង ស្វាយរៀង', 1, NULL),
(75, 12, 'ក្រុង បាវិត', 1, NULL),
(76, 12, 'ស្រុក កំពង់រោទ៍', 1, NULL),
(77, 12, 'ស្រុក ចន្ទ្រា', 1, NULL),
(78, 12, 'ស្រុក រមាសហែក', 1, NULL),
(80, 12, 'ស្រុក ស្វាជ្រុំ', 1, NULL),
(81, 12, 'ស្រុក រំដួល', 1, NULL),
(82, 12, 'ស្រុក ស្វាយទាប', 1, NULL),
(83, 12, 'ខណ្ឌ ច្បារអំពៅ', 1, NULL),
(84, 12, 'ខណ្ឌ ព្រែព្នៅ', 1, NULL),
(85, 12, 'ខណ្ឌ ជ្រោយចង្វា', 1, NULL),
(86, 12, 'ខណ្ឌ ពោធិ៍សែនជ័យ', 1, NULL),
(87, 12, 'ខណ្ធ សែនសុខ', 1, NULL),
(88, 12, 'ខណ្ឌ ឬស្សីកែវ', 1, NULL),
(89, 12, 'ខណ្ឌ មានជ័យ', 1, NULL),
(90, 12, 'ខណ្ឌ ដង្កោ', 1, NULL),
(91, 12, 'ខណ្ឌ ទួលគោក', 1, NULL),
(92, 12, 'ខណ្ឌ ៧មករា', 1, NULL),
(93, 12, 'ខណ្ឌ ដូនពេញ', 1, NULL),
(94, 12, 'ខណ្ឌ ចំការមន', 1, NULL),
(95, 12, 'ខណ្ឌ បឹងកេងកង', 1, NULL),
(96, 12, 'ខណ្ធ កំបូល', 1, NULL),
(97, 12, 'ស្រុករលាប្ធៀរ', 1, NULL),
(98, 12, 'ស្រុកកំពងត្របៃក', 1, NULL),
(99, 12, 'ក្រុងព្រះវីហា', 1, NULL),
(100, 12, 'ស្រុកបាកាន', 1, NULL),
(101, 12, 'ស្រុកមុកកំពូល', 1, NULL),
(102, 12, 'ស្រុកតាំងកោក', 1, NULL),
(103, 12, 'ស្រុកក្រករ', 1, NULL),
(104, 12, 'ស្រុកមង្កលបុរី', 1, NULL),
(105, 12, 'ស្រុកអូជ្រៅ', 1, NULL),
(106, 12, 'ស្រុកសំឡូត', 1, NULL),
(107, 12, 'ស្រុកទ្រាំង', 1, NULL),
(108, 12, 'ក្រុងព្រេះវីហា', 1, NULL),
(109, 12, 'ស្រុកតាលោសែនជ៏យ', 1, NULL),
(110, 12, 'ស្រុកបន្ទាយអំពិល', 1, NULL),
(111, 12, 'ស្រុកសូទ្រនិកម', 1, NULL),
(112, 12, 'ស្រុកបូរិជលសា', 1, NULL),
(113, 12, 'ស្រុកស្អាង', 1, NULL),
(114, 12, 'ក្រុងសួង', 1, NULL),
(115, 12, 'ស្រុកកោះអណ្តែត', 1, NULL),
(116, 4, 'ទីក្រុងភ្នំពេញ', 1, NULL),
(117, 4, 'ផ្សារដើមគរ', 1, 'PSDK'),
(118, 4, 'បងរ៉ាឆេន', 1, 'RCH');

-- --------------------------------------------------------

--
-- Structure for view `seller_driver`
--
DROP TABLE IF EXISTS `seller_driver`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `seller_driver`  AS SELECT `tbldriver`.`driAutoID` AS `ID`, `tbldriver`.`dri_braAutoID` AS `braID`, `tbldriver`.`driName` AS `name`, `tbldriver`.`driPhone` AS `phone`, `tbldriver`.`driEmail` AS `email`, `tbldriver`.`driPassword` AS `passwords`, `tbldriver`.`driAddress` AS `address`, `tbldriver`.`driDocument` AS `document`, `tbldriver`.`driType` AS `type`, NULL AS `productType`, NULL AS `bankName`, NULL AS `bankAccountNumber`, NULL AS `bankAccountName`, `tbldriver`.`driStatus` AS `status_`, 'driver' AS `typeAccount`, `tbldriver`.`driImage` AS `image` FROM `tbldriver` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblBranch`
--
ALTER TABLE `tblBranch`
  ADD PRIMARY KEY (`braAutoID`);

--
-- Indexes for table `tblBuyer`
--
ALTER TABLE `tblBuyer`
  ADD PRIMARY KEY (`buyAutoID`);

--
-- Indexes for table `tblDriver`
--
ALTER TABLE `tblDriver`
  ADD PRIMARY KEY (`driAutoID`);

--
-- Indexes for table `tblEnterData`
--
ALTER TABLE `tblEnterData`
  ADD PRIMARY KEY (`endAutoID`);

--
-- Indexes for table `tblInvoice`
--
ALTER TABLE `tblInvoice`
  ADD PRIMARY KEY (`invAutoID`);

--
-- Indexes for table `tblMenuAdmin`
--
ALTER TABLE `tblMenuAdmin`
  ADD PRIMARY KEY (`madAutoID`),
  ADD UNIQUE KEY `madName` (`madName`),
  ADD UNIQUE KEY `madPageName` (`madPageName`);

--
-- Indexes for table `tblNotificationAll`
--
ALTER TABLE `tblNotificationAll`
  ADD PRIMARY KEY (`noaAutoID`);

--
-- Indexes for table `tblOnlinePaymentAcoount`
--
ALTER TABLE `tblOnlinePaymentAcoount`
  ADD PRIMARY KEY (`opaAutoID`);

--
-- Indexes for table `tblPermissionAdmin`
--
ALTER TABLE `tblPermissionAdmin`
  ADD PRIMARY KEY (`pmaAutoID`),
  ADD UNIQUE KEY `UniqueUser` (`pma_usaAutoID`,`pma_madAutoID`);

--
-- Indexes for table `tblRemain`
--
ALTER TABLE `tblRemain`
  ADD PRIMARY KEY (`rmnAutoID`),
  ADD UNIQUE KEY `rmn_invAutoID` (`rmn_endAutoID`,`rmn_invAutoID`) USING BTREE;

--
-- Indexes for table `tblReportBranch`
--
ALTER TABLE `tblReportBranch`
  ADD PRIMARY KEY (`rpbAutoID`);

--
-- Indexes for table `tblRequireBooking`
--
ALTER TABLE `tblRequireBooking`
  ADD PRIMARY KEY (`rboAutoID`);

--
-- Indexes for table `tblSeller`
--
ALTER TABLE `tblSeller`
  ADD PRIMARY KEY (`selAutoID`),
  ADD UNIQUE KEY `selPhone` (`selPhone`);

--
-- Indexes for table `tblSiteDescription`
--
ALTER TABLE `tblSiteDescription`
  ADD PRIMARY KEY (`sidAutoID`),
  ADD UNIQUE KEY `LangUnique` (`sidID`,`sidLang`);

--
-- Indexes for table `tblSlides`
--
ALTER TABLE `tblSlides`
  ADD PRIMARY KEY (`sliAutoID`);

--
-- Indexes for table `tblUserAdmin`
--
ALTER TABLE `tblUserAdmin`
  ADD PRIMARY KEY (`usaAutoID`),
  ADD UNIQUE KEY `usaEmail` (`usaEmail`);

--
-- Indexes for table `tblZone`
--
ALTER TABLE `tblZone`
  ADD PRIMARY KEY (`zonAutoID`),
  ADD UNIQUE KEY `prefix` (`zonPrefix`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblBranch`
--
ALTER TABLE `tblBranch`
  MODIFY `braAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tblBuyer`
--
ALTER TABLE `tblBuyer`
  MODIFY `buyAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblDriver`
--
ALTER TABLE `tblDriver`
  MODIFY `driAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tblEnterData`
--
ALTER TABLE `tblEnterData`
  MODIFY `endAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblInvoice`
--
ALTER TABLE `tblInvoice`
  MODIFY `invAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tblMenuAdmin`
--
ALTER TABLE `tblMenuAdmin`
  MODIFY `madAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tblNotificationAll`
--
ALTER TABLE `tblNotificationAll`
  MODIFY `noaAutoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tblOnlinePaymentAcoount`
--
ALTER TABLE `tblOnlinePaymentAcoount`
  MODIFY `opaAutoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblPermissionAdmin`
--
ALTER TABLE `tblPermissionAdmin`
  MODIFY `pmaAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=385;

--
-- AUTO_INCREMENT for table `tblRemain`
--
ALTER TABLE `tblRemain`
  MODIFY `rmnAutoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblReportBranch`
--
ALTER TABLE `tblReportBranch`
  MODIFY `rpbAutoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblRequireBooking`
--
ALTER TABLE `tblRequireBooking`
  MODIFY `rboAutoID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT for table `tblSeller`
--
ALTER TABLE `tblSeller`
  MODIFY `selAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `tblSiteDescription`
--
ALTER TABLE `tblSiteDescription`
  MODIFY `sidAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblSlides`
--
ALTER TABLE `tblSlides`
  MODIFY `sliAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tblUserAdmin`
--
ALTER TABLE `tblUserAdmin`
  MODIFY `usaAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tblZone`
--
ALTER TABLE `tblZone`
  MODIFY `zonAutoID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
