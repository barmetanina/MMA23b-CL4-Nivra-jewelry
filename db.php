<?php

$host = "localhost";
$dbname = "webshop-nivra";
$user = "maria-schibli";
$password = "8z_L5Wemwzz8%Ecs";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB Verbindung fehlgeschlagen: " . $e->getMessage());
}

?>
