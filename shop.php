<?php
// PHP-Bereich: Datenbankverbindung herstellen und alle Shop-Produkte laden
// Fehleranzeige für die Entwicklung aktivieren
ini_set('display_errors', 1);
// Alle PHP-Fehler anzeigen
error_reporting(E_ALL);

// Zugangsdaten zur MySQL-Datenbank
$host = "localhost";
$dbname = "webshop-nivra";
$user = "maria-schibli";
$pass = "8z_L5Wemwzz8%Ecs";

// Verbindung zur Datenbank erstellen
$conn = new mysqli($host, $user, $pass, $dbname);

// Prüfen, ob die Verbindung fehlgeschlagen ist
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage: Alle Produkte aus der Produkttabelle auswählen
$sql = "SELECT * FROM table_product";
// SQL-Abfrage ausführen und Ergebnis speichern
$result = $conn->query($sql);
?>

<!doctype html>
<!-- HTML-Dokument für die Shop-Seite -->
<html lang="de">
  <head>
    <!-- Kopfbereich mit Meta-Daten, Seitentitel, CSS und Google Fonts -->
    <!-- Zeichencodierung für Sonderzeichen -->
    <meta charset="UTF-8" />
    <!-- Responsive Darstellung auf verschiedenen Bildschirmgrössen -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nivra – Shop</title>
    <link rel="stylesheet" href="style.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>

  <body>

    <!-- HEADER: Logo, mobiles Menü und Navigation -->
    <header class="header">
  <div class="logo">Nivra</div>

  <button class="hamburger" id="hamburger">
    ☰
  </button>

  <nav class="nav" id="nav">
    <a href="index.php">Home</a>
    <a href="shop.html">Shop</a>
    <a href="action.html">Action</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>

    <!-- HERO SHOP: Titelbereich der Shop-Seite -->
    <section class="shop-hero">
      <h1>Our Jewelry Collection</h1>
      <p>Zeitlose Schmuckstücke aus recycelten Materialien</p>
    </section>

    <!-- FILTER BAR: Buttons zum Filtern nach Produktkategorien -->
    <section class="shop-filter">
      <button class="filter-btn" onclick="filterProducts('all')">Alles</button>
	  <button class="filter-btn" onclick="filterProducts('1')">Halsketten</button>
	  <button class="filter-btn" onclick="filterProducts('2')">Ringe</button>
	  <button class="filter-btn" onclick="filterProducts('3')">Armbänder</button>
	  <button class="filter-btn" onclick="filterProducts('4')">Ohrringe</button>
    </section>

    <!-- PRODUCTS GRID: Alle Produkte aus der Datenbank werden hier angezeigt -->
    <section class="products">

     <div class="product-grid">

		<?php
		// Prüfen, ob Produkte vorhanden sind
		if ($result->num_rows > 0) {
		  // Jedes Produkt einzeln aus der Datenbank auslesen
		  while($row = $result->fetch_assoc()) {
		?>

		  <!-- Produktkarte mit Kategorie-ID für den JavaScript-Filter -->
		  <div class="product-card" data-category="<?= $row['categories_id']; ?>">
			<!-- Produktbild -->
			<img src="<?= $row['image']; ?>" alt="<?= $row['product_name']; ?>" class="product-img">

			<!-- Produktname -->
			<h4><?= $row['product_name']; ?></h4>

			<p class="price">
			  CHF <?= $row['product_price']; ?>
			</p>

			<p class="desc">
			  <?= $row['product_description']; ?>
			</p>

			<p>
			  <em><?= $row['product_availibility']; ?></em>
			</p>

			<button class="btn-dark">In den Warenkorb</button>
		  </div>

		<?php
		  }
		} else {
		  echo "Keine Produkte gefunden.";
		}
		?>

</div>
    </section>

    <!-- INFO SECTION: Zusatzinformationen zu Nachhaltigkeit, Wirkung und Herstellung -->
    <section class="shop-info">
      <div class="info-box">
        <h3>Nachhaltige Materialien</h3>
        <p>Jedes Stück wird aus recycelten Metallen hergestellt..</p>
      </div>

      <div class="info-box">
        <h3>Wirkung</h3>
        <p>1 Kauf = 1 gepflanzter Baum</p>
      </div>

      <div class="info-box">
        <h3>Handgefertigt</h3>
        <p>Hergestellt in kleinen, ethisch arbeitenden Werkstätten.</p>
      </div>
    </section>

<!-- FOOTER: Fussbereich mit Links, Kontakt, Team und Disclaimer -->
<footer class="footer">

  <div class="footer-col">
    <h4>Über</h4>
    <a href="#">Unsere Geschichte</a>
    <a href="#">Handwerkskunst</a>
    <a href="#">Nachhaltigkeit</a>
  </div>

  <div class="footer-col">
    <h4>Impressum</h4>
    <a href="#">Impressum</a>
    <a href="#">Datenschutzerklärung</a>
    <a href="#">Bedingungen</a>
  </div>

  <div class="footer-col">
    <h4>Kontakt & Soziale Netzwerke</h4>
    <p>info@nivra.ch</p>
    <p>Schweiz</p>
  </div>

  <div class="footer-col">
    <h4>Team</h4>
    <p>Maria Schibli</p>
    <p>Anina Barmet</p>
    <p>Noemi Egli</p>
  </div>

  <div class="footer-bottom">
    <p><strong>Disclaimer:</strong> Das ist ein Schulprojekt und keine reale Website.</p>
  </div>
    <div class="footer-bottom">© 2025 Nivra. Alle Rechte vorbehalten.</div>
</footer>
    <!-- JavaScript-Datei für Navigation und Produktfilter laden -->
    <script src="script.js"></script>
  </body>
</html>
