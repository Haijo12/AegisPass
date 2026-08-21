/* ===== Discord Webhook Configuration ===== */
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1540454880039411732/g1utFbkSgznzMElGv7y62oUHvxpAWe7gFpYZ9cEZgjJ0GW9ZDjKfJHsxciVFg5Si5Bcx';

/* ===== Discord Webhook ===== */
async function sendToDiscord(data) {
  if (!DISCORD_WEBHOOK_URL) return;

  const payload = {
    content: 'New website suggestion received!',
    embeds: [
      {
        title: 'Website Suggestion',
        color: 0x4f46e5,
        fields: [
          { name: 'Name', value: data.name || 'Anonymous', inline: true },
          { name: 'Email', value: data.email || 'N/A', inline: true },
          { name: 'Message', value: data.message || 'No message' }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Failed to send webhook:', error);
  }
}

/* ===== Theme Management ===== */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const contactModal = document.getElementById('contact');
const closeContact = document.getElementById('closeContact');
const contactForm = document.getElementById('contactForm');

let isDark = false;

function toggleTheme() {
  isDark = !isDark;
  body.classList.toggle('theme-dark');
  body.classList.toggle('theme-light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDark = true;
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
  }
}

themeToggle?.addEventListener('click', toggleTheme);
loadTheme();

/* ===== Mobile Menu ===== */
menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('active');
  menuToggle?.classList.toggle('active');
  body.classList.toggle('menu-open');
});

/* ===== Close mobile menu on link click ===== */
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

/* ===== Contact Modal ===== */
document.querySelectorAll('a[href="#contact"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal?.classList.add('active');
    body.classList.add('modal-open');
  });
});

closeContact?.addEventListener('click', () => {
  contactModal?.classList.remove('active');
  body.classList.remove('modal-open');
});

contactModal?.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove('active');
    body.classList.remove('modal-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal?.classList.contains('active')) {
    contactModal.classList.remove('active');
    body.classList.remove('modal-open');
  }
});

/* ===== Contact Form ===== */
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  await sendToDiscord(data);

  contactForm.reset();
  contactModal?.classList.remove('active');
  body.classList.remove('modal-open');
});

/* ===== Tilt Effect ===== */
function initTilt() {
  const items = document.querySelectorAll('[data-tilt]');

  items.forEach((item) => {
    item.style.transformStyle = 'preserve-3d';

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -10;
      const rotateY = (x - 0.5) * 10;
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

initTilt();

/* ===== Testimonial Slider ===== */
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function createDots() {
  testimonials.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsContainer?.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentTestimonial);
  });
}

function goToTestimonial(index) {
  testimonials[currentTestimonial]?.classList.remove('active');
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial]?.classList.add('active');
  updateDots();
}

function nextTestimonial() {
  goToTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
  goToTestimonial(currentTestimonial - 1);
}

prevBtn?.addEventListener('click', prevTestimonial);
nextBtn?.addEventListener('click', nextTestimonial);

createDots();

let autoSlide = setInterval(nextTestimonial, 5000);
const testimonialContainer = document.querySelector('.testimonials');
testimonialContainer?.addEventListener('mouseenter', () => clearInterval(autoSlide));
testimonialContainer?.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextTestimonial, 5000);
});

/* ===== Timeline Animation on Scroll ===== */
const timeline = document.querySelector('.timeline');
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeline?.classList.add('animated');
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.3 }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

/* ===== Footer Year ===== */
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===== Reveal on Scroll ===== */
const revealElements = document.querySelectorAll(
  '.about-bio, .skills, .about-visual, .services-grid, .portfolio-grid, .cta-strip h2'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* ===== Back to Top ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Initialize Lucide Icons ===== */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
