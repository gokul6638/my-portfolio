// Custom Cursor
(function() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const TRAIL = 10;
  const trailColors = ['#e8581a','#d44e14','#c04410','#ac3a0c',
    '#983008','#842604','#701c00','#5c1200','#480800','#340000'];
  const trails = [];

  for (let i = 0; i < TRAIL; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    const a = 0.55 - i * 0.05;
    const s = 5 - i * 0.3;
    t.style.cssText = `width:${s}px;height:${s}px;background:${trailColors[i]};opacity:${a};`;
    document.body.appendChild(t);
    trails.push({ el: t });
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  let hist = Array(TRAIL).fill({ x: 0, y: 0 });

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    hist = [{ x: mx, y: my }, ...hist.slice(0, TRAIL - 1)];
    trails.forEach((t, i) => {
      t.el.style.left = hist[i].x + 'px';
      t.el.style.top = hist[i].y + 'px';
    });
  });

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '56px'; ring.style.height = '56px';
      ring.style.borderColor = 'rgba(232,88,26,1)';
      dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
      dot.style.background = '#ff6b2b';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.borderColor = 'rgba(232,88,26,0.6)';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      dot.style.background = '#e8581a';
    });
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
})();

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
