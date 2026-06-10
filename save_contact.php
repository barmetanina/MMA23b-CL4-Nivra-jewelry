<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$dbname = "webshop-nivra";
$user = "maria-schibli";
$pass = "8z_L5Wemwzz8%Ecs";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

$firstname = $_POST['firstname'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$email = $_POST['email'] ?? '';
$project = $_POST['project'] ?? '';
$message = $_POST['message'] ?? '';

$stmt = $conn->prepare(
    "INSERT INTO contact_messages 
    (firstname, lastname, email, project, message) 
    VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param("sssss", $firstname, $lastname, $email, $project, $message);
$stmt->execute();

$stmt->close();
$conn->close();

header("Location: danke.html");
exit;
?>