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

$sql = "SELECT * FROM table_product";
$result = $conn->query($sql);
?>

<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nivra – Shop</title>
    <link rel="stylesheet" href="style.css" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>

  <body>

    <!-- HEADER -->
    <header class="header">
  <div class="logo">Nivra</div>

  <button class="hamburger" id="hamburger">
    ☰
  </button>

  <nav class="nav" id="nav">
    <a href="index.html">Home</a>
    <a href="shop.html">Shop</a>
    <a href="action.html">Action</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>

    <!-- HERO SHOP -->
    <section class="shop-hero">
      <h1>Our Jewelry Collection</h1>
      <p>Zeitlose Schmuckstücke aus recycelten Materialien</p>
    </section>

    <!-- FILTER BAR -->
    <section class="shop-filter">
      <button class="filter-btn" onclick="filterProducts('all')">Alles</button>
	  <button class="filter-btn" onclick="filterProducts('1')">Halsketten</button>
	  <button class="filter-btn" onclick="filterProducts('2')">Ringe</button>
	  <button class="filter-btn" onclick="filterProducts('3')">Armbänder</button>
	  <button class="filter-btn" onclick="filterProducts('4')">Ohrringe</button>
    </section>

    <!-- PRODUCTS GRID -->
    <section class="products">

     <div class="product-grid">

		<?php
		if ($result->num_rows > 0) {
		  while($row = $result->fetch_assoc()) {
		?>

		  <div class="product-card" data-category="<?= $row['categories_id']; ?>">
			<img src="<?= $row['image']; ?>" alt="<?= $row['product_name']; ?>" class="product-img">

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

    <!-- INFO SECTION -->
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
    <div class="footer-bottom">© 2025 Nivra. Alle Rechte vorbehalten.</div>
</footer>
    <script src="script.js"></script>
  </body>
</html>
