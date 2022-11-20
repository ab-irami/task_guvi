<?php
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '/.env');
$dotenv->load();

try {
    $mongoClient = new MongoDB\Client('mongodb+srv://' . $_ENV['USER_NAME'] . ':' . $_ENV['PASSWORD'] . '@' . $_ENV['CLUSTER'] . '/users?retryWrites=true&w=majority');
    $userCollection = $mongoClient->users->user;
} catch (Throwable $e) {
    echo "Captured Throwable for connection : " . $e->getMessage() . PHP_EOL;
}
?>