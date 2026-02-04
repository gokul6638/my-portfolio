// Set current year
const yearSpan = document.getElementById("currentYear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Hamburger + sidebar toggle
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  sidebar.classList.add("active");
  sidebar.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  sidebar.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
}

if (hamburger && sidebar) {
  hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("active");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Close on link click (mobile)
  sidebar.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches(".nav-link")) {
      closeSidebar();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // Close when clicking outside sidebar
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      closeSidebar();
    }
  });
}

// Optional: add "scrolled" class to desktop nav
const desktopNav = document.querySelector(".desktop-nav");
if (desktopNav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      desktopNav.classList.add("scrolled");
    } else {
      desktopNav.classList.remove("scrolled");
    }
  });
}
