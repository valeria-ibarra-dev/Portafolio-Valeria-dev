const emailLink = document.querySelector('.hero-link.primary');

emailLink.addEventListener('click', (e) => {
  e.preventDefault();
  const email = 'ibarravaleria939@gmail.com';

  navigator.clipboard.writeText(email).then(() => {
    const originalText = emailLink.textContent;
    emailLink.textContent = 'Correo copiado ✓';
    emailLink.style.background = 'var(--gold-light)';

    setTimeout(() => {
      emailLink.textContent = originalText;
      emailLink.style.background = '';
    }, 2000);
  });
});

const roleEl = document.querySelector('.hero-role');
const roleText = roleEl.textContent.trim();
roleEl.textContent = '';
roleEl.style.borderRight = '2px solid var(--gold)';

let i = 0;
function typeRole() {
  if (i < roleText.length) {
    roleEl.textContent += roleText.charAt(i);
    i++;
    setTimeout(typeRole, 40);
  } else {
    roleEl.style.borderRight = 'none';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeRole, 300);
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles;
const mouse = { x: null, y: null, radius: 140 };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

const PARTICLE_COUNT = 100;
const MAX_DIST = 150;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 1.5 + 0.5;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }
    }
  }
}

particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST) {
        const opacity = (1 - dist / MAX_DIST) * 0.15;
        ctx.strokeStyle = `rgba(201, 162, 39, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    if (mouse.x !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const opacity = (1 - dist / mouse.radius) * 0.3;
        ctx.strokeStyle = `rgba(227, 193, 92, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 162, 39, 0.5)';
    ctx.fill();
    p.move();
  });

  requestAnimationFrame(draw);
}

draw();
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

document.querySelectorAll('[data-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const isOpen = card.classList.contains('open');

    card.classList.toggle('open');
    button.childNodes[0].textContent = isOpen ? 'Ver detalles técnicos ' : 'Ocultar detalles ';
  });
});

// Sistema de traducción ES/EN
const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');
let currentLang = localStorage.getItem('portfolio-lang') || 'es';

function applyLanguage(lang) {
  document.querySelectorAll('[data-es]').forEach(el => {
    const text = el.getAttribute(lang === 'es' ? 'data-es' : 'data-en');
    if (text) el.textContent = text;
  });
  langOptions.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  localStorage.setItem('portfolio-lang', lang);
}

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLanguage(currentLang);
});

applyLanguage(currentLang);