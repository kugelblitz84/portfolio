const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const themeToggle = document.querySelector(".theme-toggle");
let savedTheme;
try { savedTheme = localStorage.getItem("theme"); } catch { /* Theme works when storage is unavailable. */ }
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
document.documentElement.setAttribute("data-theme", initialTheme);
if (themeToggle) themeToggle.textContent = initialTheme === "dark" ? "🌙" : "☀️";

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch { /* Keep the selected theme for this page. */ }
    themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-tags]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const shouldShow = filter === "all" || tags.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
      if (shouldShow) visibleCount += 1;
    });
    const count = document.querySelector("#project-count");
    if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
  });
});

// Keep project anchors usable when a visitor follows a link after filtering.
function revealLinkedProject() {
  const card = Array.from(projectCards).find((item) => `#${item.id}` === window.location.hash);
  if (!card) return;
  if (card.classList.contains("is-hidden")) {
    document.querySelector('.filter-btn[data-filter="all"]')?.click();
  }
  card.scrollIntoView({ block: "start", behavior: "instant" });
}
window.addEventListener("hashchange", revealLinkedProject);
if (projectCards.length && window.location.hash) revealLinkedProject();

if (navToggle && navMenu) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) {
      navMenu.classList.remove("active");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
