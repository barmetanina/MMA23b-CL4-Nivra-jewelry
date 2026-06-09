```php
<?php

// Datenbank-Zugangsdaten anpassen
$host = "localhost";
$dbname = "nivra";
$username = "root";
$password = "";

try {

    // Verbindung zur Datenbank herstellen
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Formulardaten auslesen
    $firstname = trim($_POST["firstname"] ?? "");
    $lastname = trim($_POST["lastname"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    // Validierung

    // Vorname Pflichtfeld
    if (empty($firstname)) {
        die("Bitte gib deinen Vornamen ein.");
    }

    // Nachname Pflichtfeld
    if (empty($lastname)) {
        die("Bitte gib deinen Nachnamen ein.");
    }

    // E-Mail validieren
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Bitte gib eine gültige E-Mail-Adresse ein.");
    }

    // Nachricht prüfen
    if (strlen($message) > 200) {
        die("Die Nachricht darf maximal 200 Zeichen lang sein.");
    }

    // Daten speichern
    $sql = "INSERT INTO contact_messages
            (firstname, lastname, email, message)
            VALUES
            (:firstname, :lastname, :email, :message)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':firstname' => $firstname,
        ':lastname' => $lastname,
        ':email' => $email,
        ':message' => $message
    ]);

    // Weiterleitung
    header("Location: thankyou.html");
    exit();

} catch (PDOException $e) {

    die("Datenbankfehler: " . $e->getMessage());

}

?>
```
