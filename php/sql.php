<?php

require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '/.env');
$dotenv->load();

$servername = "localhost";
$username = $_ENV['SQL_USER'];
$password = $_ENV['SQL_PASS'];
$database = $_ENV['SQL_DB'];

$conn = mysqli_connect(
	$servername,
	$username,
	$password,
	$database
);

if ($conn) {
} else {
	die("Error" . mysqli_connect_error());
}

?>