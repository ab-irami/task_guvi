<?php
require './vendor/autoload.php';
$redis = new Predis\Client();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $redis->flushall();
}
?>