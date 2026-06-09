```php
<?php

$host = "localhost";
$dbname = "nivra";
$username = "root";
$password = "";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Formulardaten holen
    $firstname = trim($_POST["firstname"] ?? "");
    $lastname  = trim($_POST["lastname"] ?? "");
    $email     = trim($_POST["email"] ?? "");
    $project   = trim($_POST["project"] ?? "");
    $message   = trim($_POST["message"] ?? "");

    // Validierung

    if (empty($firstname)) {
        die("Bitte gib einen Vornamen ein.");
    }

    if (empty($lastname)) {
        die("Bitte gib einen Nachnamen ein.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Bitte gib eine gültige E-Mail-Adresse ein.");
    }

    if ($project !== "baum" && $project !== "koralle") {
        die("Bitte wähle ein Nachhaltigkeitsprojekt aus.");
    }

    if (empty($message)) {
        die("Bitte gib eine Nachricht ein.");
    }

    if (strlen($message) > 200) {
        die("Die Nachricht darf maximal 200 Zeichen lang sein.");
    }

    // Daten speichern
    $sql = "INSERT INTO contact_messages
            (firstname, lastname, email, project, message)
            VALUES
            (:firstname, :lastname, :email, :project, :message)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':firstname' => $firstname,
        ':lastname'  => $lastname,
        ':email'     => $email,
        ':project'   => $project,
        ':message'   => $message
    ]);

    header("Location: thankyou.html");
    exit();

} catch (PDOException $e) {

    die("Datenbankfehler: " . $e->getMessage());

}
?>
```
