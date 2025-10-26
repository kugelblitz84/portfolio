// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper: safely get element
function $(sel){return document.querySelector(sel)}

// Fullscreen overlay logic (guarded)
const overlay = document.getElementById("fullscreenOverlay");
if(overlay){
  document.querySelectorAll('[data-fullscreen]').forEach(el => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      overlay.innerHTML = "";
      const clone = el.cloneNode(true);
      clone.removeAttribute("data-fullscreen");
      clone.removeAttribute("style");

      if (clone.tagName === "VIDEO") clone.controls = true;

      overlay.appendChild(clone);
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    overlay.innerHTML = "";
  });
}

// Reveal sections on scroll using IntersectionObserver
const sections = document.querySelectorAll('section');
if(sections.length){
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.08});

  sections.forEach(s=>observer.observe(s));
}

// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme){
  if(theme === 'light') document.body.classList.add('light-theme');
  else document.body.classList.remove('light-theme');
  if(themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'light');
}
const saved = localStorage.getItem('site-theme') || 'dark';
applyTheme(saved);
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const isLight = document.body.classList.toggle('light-theme');
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('site-theme', theme);
    themeToggle.setAttribute('aria-pressed', isLight);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if(navToggle && navMenu){
  navToggle.addEventListener('click', ()=>{
    const open = navMenu.style.display !== 'flex';
    navMenu.style.display = open ? 'flex' : 'none';
    navToggle.setAttribute('aria-expanded', open);
  });

  // close when a link is clicked
  navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    if(window.innerWidth <= 900) navMenu.style.display = 'none';
  }));
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

// Optional small animation on load for hero lines if present
window.addEventListener('load', ()=>{
  const l1 = document.getElementById('line1');
  const l2 = document.getElementById('line2');
  if(l1) setTimeout(()=>l1.style.opacity=1,120);
  if(l2) setTimeout(()=>l2.style.opacity=1,1500);
});
