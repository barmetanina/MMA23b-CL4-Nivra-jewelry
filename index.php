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

$sql = "SELECT * FROM table_product LIMIT 4";
$result = $conn->query($sql);
?>

<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nivra – Sustainable Jewelry</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <header class="header">
  <div class="logo">Nivra</div>

  <button class="hamburger" id="hamburger">
    ☰
  </button>

  <nav class="nav" id="nav">
    <a href="#">Home</a>
    <a href="shop.php">Shop</a>
    <a href="action.html">Action</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>Jewelry that grows.</h1>
        <p>Nachhaltiger Schmuck aus recycelten Materialien</p>
<a href="shop.php" class="btn-primary">Jetzt kaufen</a></div>
    </section>

    <!-- FEATURES -->
    <section class="features">
      <div class="feature-card">
        <h3>Recycelte Materialien</h3>
        <p>Hergestellt aus wiederverwerteten Metallen.</p>
      </div>

      <div class="feature-card">
        <h3>Umweltfreundliche Verpackung</h3>
        <p>Kunststofffreie, recycelbare Schachteln.</p>
      </div>

      <div class="feature-card">
        <h3>Beitrag zum Naturschutz</h3>
        <p>Pro Kauf wird ein Baum gepflanzt oder eine Koralle gezüchtet.</p>
      </div>

      <div class="feature-card">
        <h3>Ethische Herstellung</h3>
        <p>Fair und in kleinen Stückzahlen handgefertigt.</p>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="products">
      <div class="section-header">
        <h2>Empfohlene Produkte</h2>
        <a href="shop.php" class="view-all">Alle anschauen →</a>
      </div>

      <div class="product-grid">
		<?php
		if ($result && $result->num_rows > 0) {
		  while($row = $result->fetch_assoc()) {
		?>

		  <div class="product-card">
			<img src="<?= $row['image']; ?>" alt="<?= $row['product_name']; ?>" class="product-img">

			<h4><?= $row['product_name']; ?></h4>

			<p class="price">CHF <?= $row['product_price']; ?></p>

			<button class="btn-dark">In den Warenkorb</button>
		  </div>

		<?php
		  }
		} else {
		  echo "<p>Keine Produkte gefunden.</p>";
		}
		?>
		</div>
    </section>

    <!-- STORY -->
    <section class="story">
      <div class="story-img"></div>

      <div class="story-text">
        <h5>UNSERE GESCHICHTE</h5>
        <h2>Schmuck, der seine Wurzeln in der Natur hat.</h2>
        <p>
         Nivra fertigt jedes Stück aus recycelten Metallen und ethisch gewonnenen
          Edelsteinen, die für Generationen gemacht sind. Mit jedem Kauf trägst du dazu bei, Bäume zu pflanzen
          und Korallenriffe auf der ganzen Welt wiederherzustellen.
        </p>
        <a href="#" class="learn-more">Mehr erfahren →</a>
      </div>
    </section>

<!-- FOOTER -->
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

</footer>

    <div class="footer-bottom">© 2025 Nivra. Alle Rechte vorbehalten.</div>
    <script src="script.js"></script>
  </body>
</html>
