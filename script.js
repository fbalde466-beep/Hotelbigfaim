/* ================================================================
   Hotel BIG FAIM - Script interactif
   ================================================================ */

// ── Lucide icons (reinit after DOM) ──────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") lucide.createIcons();
  initHeader();
  initBurger();
  initForm();
  initCounters();
  initNavLinks();
  initScrollReveal();
  initPlugins();
});

// ── Header sticky ─────────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ── Burger menu ───────────────────────────────────────────────────
function initBurger() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ── Close nav on link click (mobile) ─────────────────────────────
function initNavLinks() {
  const nav = document.getElementById("nav");
  const links = document.querySelectorAll(".nav-link, .btn-nav");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("open");
    });
  });
}

// ── Form + seminaire toggle ───────────────────────────────────────
function initForm() {
  const typeSejour = document.getElementById("typeSejour");
  const seminaireBox = document.getElementById("seminaireBox");
  const bookingForm = document.getElementById("bookingForm");
  const submitBtn = document.getElementById("submit-form");

  if (typeSejour && seminaireBox) {
    typeSejour.addEventListener("change", () => {
      const show = typeSejour.value === "seminaire" || typeSejour.value === "affaires";
      seminaireBox.style.display = show ? "flex" : "none";
      if (typeof lucide !== "undefined") lucide.createIcons();
    });
  }

  if (bookingForm) {
    // La soumission se fera de manière classique via l'attribut action="https://formspree.io/f/xljrvzow"
    // afin de vous permettre de passer le Captcha initial de Formspree.
    bookingForm.addEventListener("submit", function () {
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Redirection...';
      if (typeof lucide !== "undefined") lucide.createIcons();
    });
  }
}

// ── Toast notification ────────────────────────────────────────────
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.remove("error");
  }, 5000);
}

// ── Animated counters ─────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll(".hl-val");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString("fr-FR");
  }, 16);
}

// ── Quick reserve from rooms ──────────────────────────────────────
function reserverChambre(nomChambre, prix) {
  const section = document.getElementById("reservation");
  if (section) section.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    const msgField = document.getElementById("message");
    if (msgField) {
      msgField.value = "Je souhaite reserver : " + nomChambre + " - " + prix;
    }
  }, 600);
}

// ── Quick reserve from seminar ────────────────────────────────────
function reserverSalle(nomSalle, capacite, tarif) {
  const section = document.getElementById("reservation");
  if (section) section.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    const typeSejour = document.getElementById("typeSejour");
    const seminaireBox = document.getElementById("seminaireBox");
    const msgField = document.getElementById("message");

    if (typeSejour) {
      typeSejour.value = "seminaire";
      if (seminaireBox) seminaireBox.style.display = "flex";
    }

    if (msgField) {
      msgField.value = "Je souhaite reserver : " + nomSalle + " (Capacite : " + capacite + " pers.) - " + tarif;
    }
    if (typeof lucide !== "undefined") lucide.createIcons();
  }, 600);
}

// ── Init External Plugins ─────────────────────────────────────────
function initPlugins() {
  // GLightbox
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
    });
  }
  
  // Flatpickr
  if (typeof flatpickr !== "undefined") {
    flatpickr("#arrivee", {
      locale: "fr",
      minDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "j F Y"
    });
    flatpickr("#depart", {
      locale: "fr",
      minDate: "today",
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "j F Y"
    });
  }
}

// ── Scroll Reveal Animations ──────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.section-header, .room-card, .service-card, .gallery-item, .about-images, .about-content');
  elements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}