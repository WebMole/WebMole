<?php
/* Prevent direct access to this file. */
if ($access != 'authorized') die('You are not allowed to view this file');
include('assets/lib/LoremIpsum.class.php');
$generator = new LoremIpsumGenerator;
?>
<!DOCTYPE HTML>

<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/skeleton.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>WebMole Demo - <?php echo $title ?></title>
</head>

<body>
    <header>
        <h1>WebMole Demo Site</h1>
        <nav id="mainMenu">
            <ul>
                <li><a <?php if($currentPage == "Home") echo 'class="active"'; ?>>Home Page</a></li>
                <li><a <?php if($currentPage == "Shop") echo 'class="active"'; ?>>Shop</a></li>
                <li><a <?php if($currentPage == "About") echo 'class="active"'; ?>>About us</a></li>
            </ul>
        </nav>
    </header>
    <div class="clear"></div>
    <div id="content" class="container">
        <div class="sixteen columns">