<?php
// PHP-Fehlermeldungen aktivieren (nur für Entwicklung)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Datenbank-Zugangsdaten
$host = "localhost";
$dbname = "webshop-nivra";
$user = "maria-schibli";
$pass = "8z_L5Wemwzz8%Ecs";

// Verbindung zur MySQL-Datenbank herstellen
$conn = new mysqli($host, $user, $pass, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Formulardaten aus dem Kontaktformular übernehmen
$firstname = $_POST['firstname'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$email = $_POST['email'] ?? '';
$project = $_POST['project'] ?? '';
$message = $_POST['message'] ?? '';


// SQL-Statement vorbereiten
// Die Daten werden in die Tabelle "contact_messages" gespeichert
$stmt = $conn->prepare(
$stmt = $conn->prepare(
    "INSERT INTO contact_messages 
    (firstname, lastname, email, project, message) 
    VALUES (?, ?, ?, ?, ?)"
);

// Übergibt die Formularwerte an die Platzhalter im SQL-Statement
$stmt->bind_param("sssss", $firstname, $lastname, $email, $project, $message);

// SQL-Abfrage ausführen
$stmt->execute();

// Statement schliessen
$stmt->close();
// Datenbankverbindung schliessen
$conn->close();

// Nach erfolgreichem Speichern auf die Danke-Seite weiterleiten
header("Location: danke.html");
exit;
?>
