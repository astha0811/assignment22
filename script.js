/* =========================================================
   Compliance for Research Analysts — interactions
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initDrawerMenu();
  initActiveNavOnScroll();
  initFadeUpOnScroll();
});

/* -----------------------------
   Mobile / tablet drawer menu
------------------------------ */
function initDrawerMenu() {
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const closeBtn = document.getElementById("drawerClose");
  const body = document.body;

  if (!toggle || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
  };

  toggle.addEventListener("click", () => {
    drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
  });

  closeBtn?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Close drawer when a link is tapped (mobile UX)
  drawer.querySelectorAll(".drawer__link, .drawer__cta").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

/* -----------------------------
   Highlight active nav link based on
   which section is currently in view
------------------------------ */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll("main section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav__link, .drawer__link");

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isMatch);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------
   Fade-up reveal on scroll
------------------------------ */
function initFadeUpOnScroll() {
  const items = document.querySelectorAll(".fade-up");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}