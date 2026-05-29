const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  // Fehler zurücksetzen
  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  // Werte holen
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Vorname
  if (firstname === "" || firstname.length > 20 || !/^[A-Za-z]+$/.test(firstname)) {
    document.getElementById("errFirstname").innerText = "Invalid firstname";
    valid = false;
  }

  // Nachname
  if (lastname === "" || lastname.length > 20 || !/^[A-Za-z]+$/.test(lastname)) {
    document.getElementById("errLastname").innerText = "Invalid lastname";
    valid = false;
  }

  // Email
  if (email === "" || email.length > 20 || !email.includes("@")) {
    document.getElementById("errEmail").innerText = "Invalid Email";
    valid = false;
  }

  // Nachricht
  if (message === "" || message.length > 200) {
    document.getElementById("errMessage").innerText = "Your message should be no longer than 200 characters. ";
    valid = false;
  }

  // Formular wurde versendet -> Nachricht
  if (valid) {
    alert("Thank you for contacting us!");
    form.submit();
  }
});

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

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
startBtn?.addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;

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

      if (score % 5 === 0) speed += 0.5;
    }
  });
}

// OBSTACLES (Koralle / Natur / Plastik Mix)
function spawnObstacle() {
  if (!gameRunning) return;

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
  gameArea.removeEventListener("click", jump);

  startBtn.textContent = "Restart";

  setTimeout(() => {
    alert("Game Over 🌍 Score: " + score);
  }, 100);
}
