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
    if (dot) {
      dot.style.left = mx + 'px'; 
      dot.style.top = my + 'px';
    }
    hist = [{ x: mx, y: my }, ...hist.slice(0, TRAIL - 1)];
    trails.forEach((t, i) => {
      t.el.style.left = hist[i].x + 'px';
      t.el.style.top = hist[i].y + 'px';
    });
  });

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (ring && dot) {
        ring.style.width = '56px'; ring.style.height = '56px';
        ring.style.borderColor = 'rgba(232,88,26,1)';
        dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
        dot.style.background = '#ff6b2b';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (ring && dot) {
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.borderColor = 'rgba(232,88,26,0.6)';
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        dot.style.background = '#e8581a';
      }
    });
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) {
      ring.style.left = rx + 'px'; 
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(animRing);
  })();
})();

// Section reveal on scroll
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

function revealSections() {
  const scrollY = window.pageYOffset + window.innerHeight;
  sections.forEach(sec => {
    if (sec.offsetTop < scrollY - 50) sec.classList.add('visible');
  });
}

// Navbar scroll styling
const navbar = document.querySelector('.desktop-nav');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
});

// Active nav highlight
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 80;
  navLinks.forEach(link => {
    const sec = document.querySelector(link.getAttribute('href'));
    if (sec && sec.offsetTop <= scrollY && (sec.offsetTop + sec.offsetHeight) > scrollY) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Education click links
document.querySelectorAll('.education-node').forEach(entry => {
  entry.addEventListener('click', () => {
    const url = entry.getAttribute('data-url');
    if (url) {
      window.open(url, '_blank');
    }
  });
});

// Mobile Sidebar
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      sidebar.classList.toggle('active');
      hamburger.classList.toggle('active');
    }
  });
}

document.querySelectorAll('.sidebar .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (sidebar && hamburger) {
      sidebar.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Block Context Menu on Profile Image
const profileImg = document.getElementById('profileImage');
if (profileImg) {
  profileImg.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
  }, false);
}

// Autoplay and Protection for Non-Downloadable Video
document.addEventListener('DOMContentLoaded', () => {
  const avatarVideo = document.getElementById('portfolio-avatar-video');
  
  if (avatarVideo) {
    avatarVideo.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    
    const playPromise = avatarVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        document.body.addEventListener('click', () => {
          avatarVideo.play();
        }, { once: true });
      });
    }
  }

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Education Timeline Dynamic Alignment
document.addEventListener('DOMContentLoaded', () => {
  const student = document.querySelector('.student-icon');
  const nodes = Array.from(document.querySelectorAll('.education-node'));
  const container = document.querySelector('.education-nodes');
  
  if (!student || !container || nodes.length === 0) return;

  let current = 0;
  const total = nodes.length;

  function updatePosition(index) {
    const target = nodes[index];
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offsetTop = targetRect.top - containerRect.top + (targetRect.height / 2);
    const scale = 1 + index * 0.1;
    student.style.transform = `translateY(${offsetTop - student.offsetHeight / 2}px) scale(${scale})`;

    nodes.forEach((node, i) => node.classList.toggle('active', i === index));
  }

  updatePosition(current);
  setInterval(() => {
    current = (current + 1) % total;
    updatePosition(current);
  }, 3000);

  window.addEventListener('resize', () => updatePosition(current));
});