 // CONTACT FORM VALIDATION
// Das Kontaktformular auf der Seite auswählen
const form = document.querySelector(".contact-form");

// Prüfen, ob ein Kontaktformular auf der aktuellen Seite existiert
if (form) {
// Event Listener: reagiert, wenn das Formular abgeschickt wird
  form.addEventListener("submit", function (e) {
// Verhindert das direkte Absenden des Formulars
// Das Formular wird erst abgeschickt, wenn alle Eingaben korrekt sind
    e.preventDefault();
// Speichert, ob das Formular gültig ist
    let valid = true;
// Alle alten Fehlermeldungen löschen
    document.querySelectorAll(".error").forEach(el => {
      el.innerText = "";
    });

// Alle alten CSS-Klassen für gültig/ungültig entfernen	  
    document
      .querySelectorAll(".contact-form input, .contact-form textarea, .contact-form select")
      .forEach(el => {
        el.classList.remove("invalid", "valid");
      });
	  
// Formularfelder über ihre IDs auswählen
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const project = document.getElementById("project");
    const message = document.getElementById("message");

// Werte aus den Feldern auslesen und Leerzeichen entfernen
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

 // Regex für Namen: erlaubt Buchstaben, Umlaute, Leerzeichen und Bindestriche
    const nameRegex = /^[A-Za-zÀ-ÿ\s-]+$/;

// Regex für E-Mail-Adressen	  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	  // Vorname prüfen
    if (firstnameValue === "") {
      document.getElementById("errFirstname").innerText =
        "Vorname ist ein Pflichtfeld.";
      firstname.classList.add("invalid");
      valid = false;
    } else if (firstnameValue.length > 20) {
      document.getElementById("errFirstname").innerText =
        "Vorname darf maximal 20 Zeichen lang sein.";
      firstname.classList.add("invalid");
      valid = false;
    } else if (!nameRegex.test(firstnameValue)) {
      document.getElementById("errFirstname").innerText =
        "Vorname darf nur Buchstaben, Leerzeichen oder Bindestriche enthalten.";
      firstname.classList.add("invalid");
      valid = false;
    } else {
      firstname.classList.add("valid");
    }

// Nachname prüfen
    if (lastnameValue === "") {
      document.getElementById("errLastname").innerText =
        "Nachname ist ein Pflichtfeld.";
      lastname.classList.add("invalid");
      valid = false;
    } else if (lastnameValue.length > 20) {
      document.getElementById("errLastname").innerText =
        "Nachname darf maximal 20 Zeichen lang sein.";
      lastname.classList.add("invalid");
      valid = false;
    } else if (!nameRegex.test(lastnameValue)) {
      document.getElementById("errLastname").innerText =
        "Nachname darf nur Buchstaben, Leerzeichen oder Bindestriche enthalten.";
      lastname.classList.add("invalid");
      valid = false;
    } else {
      lastname.classList.add("valid");
    }
// Mail Adresse prüfen
    if (emailValue === "") {
      document.getElementById("errEmail").innerText =
        "Email Adresse ist ein Pflichtfeld.";
      email.classList.add("invalid");
      valid = false;
    } else if (!emailValue.includes("@")) {
      document.getElementById("errEmail").innerText =
        "Die E-Mail-Adresse muss ein @-Zeichen enthalten.";
      email.classList.add("invalid");
      valid = false;
    } else if (!emailRegex.test(emailValue)) {
      document.getElementById("errEmail").innerText =
        "Bitte verwenden Sie das Format „name@example.com“.";
      email.classList.add("invalid");
      valid = false;
    } else {
      email.classList.add("valid");
    }

    if (project) {
      const projectValue = project.value.trim();

      if (projectValue === "") {
        document.getElementById("errProject").innerText =
          "Bitte wähle ein Nachhaltigkeitsprojekt aus.";
        project.classList.add("invalid");
        valid = false;
      } else {
        project.classList.add("valid");
      }
    }

    if (messageValue === "") {
      document.getElementById("errMessage").innerText =
        "Bitte gib eine Nachricht ein.";
      message.classList.add("invalid");
      valid = false;
    } else if (messageValue.length > 200) {
      document.getElementById("errMessage").innerText =
        "Ihre Nachricht darf maximal 200 Zeichen lang sein.";
      message.classList.add("invalid");
      valid = false;
    } else {
      message.classList.add("valid");
    }

    if (valid) {
	  form.submit();
	}
  });
}

// HAMBURGER MENU

// Hamburger-Button auswählen
const hamburger = document.getElementById("hamburger");
// Navigation auswählen
const nav = document.getElementById("nav");

// Prüfen, ob Hamburger und Navigation auf der Seite existieren
if (hamburger && nav) {

// Beim Klick auf den Hamburger-Button wird das Menü geöffnet oder geschlossen
  hamburger.addEventListener("click", () => {
// Klasse "active" hinzufügen oder entfernen
// Diese Klasse wird im CSS verwendet, um das Menü sichtbar zu machen
    nav.classList.toggle("active");
  });
}

// ACTION PAGE GAME (DINO)

document.addEventListener("DOMContentLoaded", () => { // Wartet, bis die HTML-Seite vollständig geladen wurde
  const gameArea = document.getElementById("gameArea"); // Sppielfeld auswählen
  const startBtn = document.getElementById("startGame"); // Starbutton auswählen
  const scoreEl = document.getElementById("score"); // Punkteanzahl auswählen

  if (!gameArea || !startBtn || !scoreEl) return; // Falls die Elemente auf der Seite nciht existieren, wird der Code beendet

  let gameRunning = false; // Speichert, ob das Spiel gerade läuft
  let score = 0; // Aktueller Punktestand
  let speed = 6; // Geschiwndigkeit der Hindernisse 

  let dino;
  let dinoY = 0; // Vertikale Posittion der Spielfigur
  let velocityY = 0; // Sprunggeschwindigkeit
  let isJumping = false; //speicher, ob die Figur springt oder nicht

  let obstacles = []; // array für alle Hinternisse
  let gameInterval; // Intervalle für Spiel-Update 
  let spawnInterval; // Intervalle für Hindernisse

  startBtn.addEventListener("click", startGame); // Spiel starten beim Klick auf den button
  gameArea.addEventListener("click", jump); // Springen beim Klick auf das Spielfeld

  document.addEventListener("keydown", e => { // Springen mit der Leertast
    if (e.code === "Space") {
      e.preventDefault();
      jump(e);
    }
  });

  function startGame() {   // Funktion zum Starten des Spiels
    if (gameRunning) return;     // Wenn das Spiel bereits läuft, wird nichts gemacht

    resetGame(); // Spiel zurücksetzen
    gameRunning = true; // Spielstatus auf aktiv setzen
    startBtn.textContent = "Running..."; // Text des Buttons ändern

    dino = document.createElement("div"); // Spielfigur als neues HTMl-Element erstellen
    dino.classList.add("dino"); //CSS Klasse hinzufügen
    dino.textContent = "💎"; // symbol der spielfigur
    gameArea.appendChild(dino); // spielfigur ins spielfeld einfügen

    gameInterval = setInterval(updateGame, 20); //spiel wir alle 20 Millisekunden aktualisiert
    spawnInterval = setInterval(spawnObstacle, 1400);  // alle 1400 Millisekunden wird ein neues hinternis erstellt
  }

  function resetGame() { // funktionen zum zurücksetzen des Spieles
    gameArea.innerHTML = ""; // leeren Spielfend

    obstacles = []; // hindernisse löschen
    score = 0; // Punkte zurücksetzen
    speed = 6; // GEschwindigkeit zurücksetzen
    velocityY = 0; // Sprungwerte zurücksetzen
    dinoY = 0; 
    isJumping = false;

    scoreEl.textContent = "0"; // Punkteanzeige zurücksetzen
  }

  function jump(e) {  // funktion zum Springen
    if (!gameRunning) return; // wenn das spiel nicht läuft, kann nciht gesprungen werden

    if (e.code === "Space") {  // springen mit leertaste
      e.preventDefault();

      if (!isJumping) { // nur springen, wenn die figur nicht bereits springt
        velocityY = -14;
        isJumping = true;
      }
    }

    if (e.type === "click") { // springen durch Klick auf das Spielfeld
      if (!isJumping) { // Nur springen, wenn die Figur nicht bereits springt
        velocityY = -14;
        isJumping = true;
      }
    }
  }

  function updateGame() { // funktion aktualisiert das Spiel laufend
    velocityY += 0.8; // Schwerkraft: figur wird nach unten gezogen
    dinoY += velocityY; // Neue Y-Position der Figur berechnen

    if (dinoY >= 0) { // Wenn die Figur wieder am Boden ist
      dinoY = 0;
      isJumping = false;
    }

    if (dino) { // Figur visuell nach oben oder unten bewegen
      dino.style.transform = `translateY(${dinoY}px)`;
    }

    obstacles.forEach((obs, i) => { // alle Hindernisse bewegen
      let x = parseInt(obs.style.left); // Aktuele X-Position auslesen
      x -= speed; // Hindernisse nach Links bewegen
      obs.style.left = x + "px"; // Neue Position setzen

      if (x < 120 && x > 50 && dinoY > -60) { // Kollsion prüfen, wenn Hidnernis nahe bei der Figur ist und die Figur nicht hoch genug springt
        endGame();
      }

      if (x < -50) { // wenn Hindernis links aus dem Spielfeld raus ist
        obs.remove(); // hindernis entfernen
        obstacles.splice(i, 1); // Hindernis aus dem Array löschen


        score++;         // Punktestand erhöhen
        scoreEl.textContent = score;  // Punkteanzeige aktualisieren

        if (score % 5 === 0) {  // Alle 5 Punkte wird das Spiel schneller
          speed += 0.5;
        }
      }
    });
  }

  function spawnObstacle() {   // Funktion erstellt ein neues Hindernis
    if (!gameRunning) return;     // Wenn das Spiel nicht läuft, wird kein Hindernis erstellt

    const obs = document.createElement("div");     // Neues HTML-Element für Hindernis erstellen
    obs.classList.add("obstacle");     // CSS-Klasse für Hindernis hinzufügen

    const items = ["🪸", "🌳"];     // Mögliche Hindernis-Symbole
    obs.textContent = items[Math.floor(Math.random() * items.length)];     // Zufälliges Symbol auswählen

    obs.style.left = gameArea.offsetWidth + "px";     // Hindernis rechts ausserhalb des Spielfelds platzieren
    gameArea.appendChild(obs);     // Hindernis ins Spielfeld einfügen
    obstacles.push(obs);     // Hindernis im Array speichern
  }

  function endGame() {
// Impact-Anzeigen aus dem HTML auswählen
    const treeCount = document.getElementById("treeCount");
    const coralCount = document.getElementById("coralCount");
    const totalImpact = document.getElementById("totalImpact");

	  
    if (treeCount && coralCount && totalImpact) {     // Prüfen, ob die Impact-Elemente existieren
      const trees = Math.floor(score / 3);       // Anzahl Bäume anhand der Punkte berechnen
      const corals = Math.floor(score / 5);       // Anzahl Korallen anhand der Punkte berechnen

// Werte im HTML aktualisieren
      treeCount.textContent = trees;
      coralCount.textContent = corals;
      totalImpact.textContent = trees + corals;
    }

    gameRunning = false;     // Spielstatus auf beendet setzen

// Spiel-Intervalle stoppen
    clearInterval(gameInterval);
    clearInterval(spawnInterval);

// Intervalle zurücksetzen
    gameInterval = null;
    spawnInterval = null;

// Buttontext ändern
   startBtn.textContent = "Restart";

// Kurze Verzögerung, damit Game Over nach der Kollision angezeigt wird	  
    setTimeout(() => {
      alert("Game Over 🌍 Score: " + score);
    }, 100);
  }
});

// SHOP: Filter
function filterProducts(category) { // Funktion filtert Produkte nach Kategorie
  const products = document.querySelectorAll('.product-card');   // Alle Produktkarten auswählen

  products.forEach(product => {   // Jede Produktkarte einzeln durchgehen
    if (category === 'all') {     // Wenn "all" gewählt wurde, werden alle Produkte angezeigt
      product.style.display = 'block';
    } else {
      if (product.dataset.category === category) {       // Prüfen, ob die Kategorie des Produkts mit dem Filter übereinstimmt
        product.style.display = 'block';         // Passende Produkte anzeigen
      } else {
        product.style.display = 'none';         // Nicht passende Produkte ausblenden
      }
    }
  });
}
