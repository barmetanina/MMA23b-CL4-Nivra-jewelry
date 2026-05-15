document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  // Errors reset
  document.querySelectorAll(".error").forEach(el => el.innerText = "");

  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const project = document.getElementById("project").value;
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Vorname
  if (firstname.length < 2 || /\d/.test(firstname)) {
    document.getElementById("errFirstname").innerText = "Ungültiger Vorname";
    valid = false;
  }

  // Nachname
  if (lastname.length < 2 || /\d/.test(lastname)) {
    document.getElementById("errLastname").innerText = "Ungültiger Nachname";
    valid = false;
  }

  // Email
  if (!emailPattern.test(email)) {
    document.getElementById("errEmail").innerText = "Ungültige E-Mail";
    valid = false;
  }

  // Projekt
  if (project === "") {
    document.getElementById("errProject").innerText = "Bitte Projekt auswählen";
    valid = false;
  }

  // Nachricht
  if (message.length > 200) {
    document.getElementById("errMessage").innerText = "Maximal 200 Zeichen erlaubt";
    valid = false;
  }

  if (valid) {
    alert("Formular erfolgreich abgesendet!");
  }
});
