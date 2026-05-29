<?php

// Datenbank-Zugangsdaten
$host = "localhost";
$dbname = "DEINE_DATENBANK";
$username = "DEIN_BENUTZERNAME";
$password = "DEIN_PASSWORT";

try {

    // Verbindung zur Datenbank
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Formulardaten holen
    $firstname = trim($_POST["firstname"]);
    $lastname = trim($_POST["lastname"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

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

    // Weiterleitung auf Danke-Seite
    header("Location: thankyou.html");
    exit();

} catch (PDOException $e) {

    echo "Database Error: " . $e->getMessage();

}
?>


