const typeSejour = document.getElementById("typeSejour");
const seminaireBox = document.getElementById("seminaireBox");
const bookingForm = document.getElementById("bookingForm");

typeSejour.addEventListener("change", () => {
  if (typeSejour.value === "affaires") {
    seminaireBox.style.display = "flex";
  } else {
    seminaireBox.style.display = "none";
  }
});

bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Réservation envoyée avec succès !");
  bookingForm.reset();
  seminaireBox.style.display = "none";
});function reserverSalle(nomSalle, capacite) {
  alert(`Vous avez choisi ${nomSalle} pour une capacité de ${capacite} personnes.`);
}function reserverChambre(nomChambre, prix) {
  alert(`Vous avez choisi : ${nomChambre}\nPrix : ${prix}`);
}