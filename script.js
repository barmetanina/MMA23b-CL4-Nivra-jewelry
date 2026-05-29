// =========================
// CONTACT FORM VALIDATION
// =========================

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Fehler zurücksetzen
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    document.querySelectorAll(".contact-form input, .contact-form textarea").forEach(el => {
      el.classList.remove("invalid", "valid");
    });

    // Felder holen
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    // Regex
    const nameRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vorname
    if (
      firstnameValue === "" ||
      firstnameValue.length > 20 ||
      !nameRegex.test(firstnameValue)
    ) {
      document.getElementById("errFirstname").innerText =
        "Please enter a valid firstname.";
      firstname.classList.add("invalid");
      valid = false;
    } else {
      firstname.classList.add("valid");
    }

    // Nachname
    if (
      lastnameValue === "" ||
      lastnameValue.length > 20 ||
      !nameRegex.test(lastnameValue)
    ) {
      document.getElementById("errLastname").innerText =
        "Please enter a valid lastname.";
      lastname.classList.add("invalid");
      valid = false;
    } else {
      lastname.classList.add("valid");
    }

    // Email
    if (emailValue === "" || !emailRegex.test(emailValue)) {
      document.getElementById("errEmail").innerText =
        "Please enter a valid email address.";
      email.classList.add("invalid");
      valid = false;
    } else {
      email.classList.add("valid");
    }

    // Nachricht
    if (messageValue === "" || messageValue.length > 200) {
      document.getElementById("errMessage").innerText =
        "Your message must be between 1 and 200 characters.";
      message.classList.add("invalid");
      valid = false;
    } else {
      message.classList.add("valid");
    }

    // Wenn alles korrekt ist
    if (valid) {
      alert("Thank you for contacting us!");
      form.submit();
    }
  });
}

// =========================
// HAMBURGER MENU
// =========================

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// =========================
// ACTION PAGE GAME (DINO)
// =========================

const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startGame");
const scoreEl = document.getElementById("score");

let gameRunning = false;
let score = 0;
let speed = 6;

let dino;
let dinoY = 0;
let velocityY = 0;
let isJumping = false;

let obstacles = [];
let gameInterval;
let spawnInterval;

// START
if (startBtn && gameArea && scoreEl) {
  startBtn.addEventListener("click", startGame);
}

function startGame() {
  if (gameRunning || !gameArea || !startBtn || !scoreEl) return;

  resetGame();
  gameRunning = true;
  startBtn.textContent = "Running...";

  dino = document.createElement("div");
  dino.classList.add("dino");
  dino.textContent = "🦖💎";
  gameArea.appendChild(dino);

  document.addEventListener("keydown", jump);
  gameArea.addEventListener("click", jump);

  gameInterval = setInterval(updateGame, 20);
  spawnInterval = setInterval(spawnObstacle, 1400);
}

function resetGame() {
  gameArea.innerHTML = `
    <p class="game-placeholder">Spiel läuft...</p>
  `;

  obstacles = [];
  score = 0;
  speed = 6;
  velocityY = 0;
  dinoY = 0;
  isJumping = false;
  scoreEl.textContent = 0;
}

// JUMP
function jump(e) {
  if (!gameRunning) return;

  if (e.code === "Space" || e.type === "click") {
    if (!isJumping) {
      velocityY = -14;
      isJumping = true;
    }
  }
}

// GAME LOOP
function updateGame() {
  velocityY += 0.8;
  dinoY += velocityY;

  if (dinoY >= 0) {
    dinoY = 0;
    isJumping = false;
  }

  if (dino) {
    dino.style.transform = `translateY(${dinoY}px)`;
  }

  obstacles.forEach((obs, i) => {
    let x = parseInt(obs.style.left);
    x -= speed;
    obs.style.left = x + "px";

    // Collision
    if (x < 90 && x > 40 && dinoY > -30) {
      endGame();
    }

    // Remove
    if (x < -50) {
      obs.remove();
      obstacles.splice(i, 1);

      score++;
      scoreEl.textContent = score;

      if (score % 5 === 0) {
        speed += 0.5;
      }
    }
  });
}

// OBSTACLES
function spawnObstacle() {
  if (!gameRunning || !gameArea) return;

  const obs = document.createElement("div");
  obs.classList.add("obstacle");

  const items = ["🪸", "🌵", "🧴"];
  obs.textContent = items[Math.floor(Math.random() * items.length)];

  obs.style.left = "800px";
  gameArea.appendChild(obs);
  obstacles.push(obs);
}

// END GAME
function endGame() {
  gameRunning = false;

  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  document.removeEventListener("keydown", jump);

  if (gameArea) {
    gameArea.removeEventListener("click", jump);
  }

  if (startBtn) {
    startBtn.textContent = "Restart";
  }

  setTimeout(() => {
    alert("Game Over 🌍 Score: " + score);
  }, 100);
}
