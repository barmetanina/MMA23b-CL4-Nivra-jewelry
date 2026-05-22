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
