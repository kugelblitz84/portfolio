// Scroll back to top of the page function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fullscreen overlay logic
const overlay = document.getElementById("fullscreenOverlay");

document.querySelectorAll('[data-fullscreen]').forEach(el => {
  el.style.cursor = "pointer";
  el.addEventListener("click", () => {
    overlay.innerHTML = ""; 
    const clone = el.cloneNode(true); 
    clone.removeAttribute("data-fullscreen");
    clone.removeAttribute("style");

    // If it's a video, ensure it has controls
    if (clone.tagName === "VIDEO") {
      clone.controls = true;
    }

    overlay.appendChild(clone);
    overlay.style.display = "flex"; 
  });
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none"; // Hide overlay when clicked
  overlay.innerHTML = ""; 
});

// Intersection Observer to trigger animations when section comes into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); 
      observer.unobserve(entry.target); 
    } else {
      entry.target.classList.remove("visible"); 
    }
  });
}, {
  threshold: 0.1
});

// Observe all sections
document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

// JavaScript to make the lines appear one after another
window.onload = function () {
  setTimeout(() => {
    document.getElementById("line1").style.opacity = 1; // Make the first line visible
  }, 100); // Starts immediately after page load

  setTimeout(() => {
    document.getElementById("line2").style.opacity = 1; // Make the second line visible
  }, 4500); // Starts after the first line finishes (4.5 seconds after load)
};
