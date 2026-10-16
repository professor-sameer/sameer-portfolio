
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

/* ==============================
   ACTIVE NAVIGATION ON SCROLL
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #achievements, #contact"
    );

    if (!navLinks.length || !sections.length) return;

    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (visibleSections.length > 0) {
                setActiveLink(visibleSections[0].target.id);
            }
        },
        {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach((section) => observer.observe(section));

    setActiveLink("home");
});

/* ==============================
   PROJECT FILTERS
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".project-filter");
    const projectCards = document.querySelectorAll(".project-card");
    const visibleCount = document.getElementById("visible-project-count");

    if (!filterButtons.length || !projectCards.length) {
        console.warn("Project filters: buttons or project cards not found.");
        return;
    }

    function filterProjects(filter) {
        let visibleProjects = 0;

        projectCards.forEach((card) => {
            const status = card.dataset.status;
            const shouldShow = filter === "all" || status === filter;

            card.hidden = !shouldShow;

            if (shouldShow) visibleProjects++;
        });

        filterButtons.forEach((button) => {
            const isActive = button.dataset.filter === filter;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        if (visibleCount) {
            visibleCount.textContent = visibleProjects;
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterProjects(button.dataset.filter);
        });
    });

    filterProjects("all");
});
