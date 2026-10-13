
/* ========================================
   SAMEER NAYAK — PORTFOLIO JAVASCRIPT
   ======================================== */

// 1. Select the mobile menu button and navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// 2. Open and close the mobile navigation
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    // Update accessibility information
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    // Change the icon depending on the menu state
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu when a navigation link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Close the menu when switching back to desktop layout
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
}

// 3. Set the current year automatically in the footer
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

console.log("Sameer Nayak's portfolio is ready.");
