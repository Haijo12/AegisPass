/* ===== Forge Gen 2 Monitor — v2.1 Bug-Fixed ===== */

/* ===== Mock Data ===== */
const GAMES = [
  {
    id: 'gag',
    name: 'Grow a Garden',
    status: 'working',
    statusLabel: 'Working',
    badge: 'popular',
    badgeLabel: 'Popular',
    desc: 'The ultimate Grow a Garden script for Delta Executor. Auto-farm, auto-harvest, auto-sell, pet spawner, dupe, and more.',
    features: ['Auto Farm', 'Auto Harvest', 'Auto Sell', 'Auto Buy Seeds', 'Pet Spawner', 'Dupe', 'Anti-AFK', 'ESP'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/gag'))()",
    executors: ['Delta Executor'],
    updated: '2 minutes ago'
  }
];

const TESTIMONIALS = [
  { name: 'GardenMaster', role: 'VIP Member', avatar: 'GM', rating: 5, text: "Forge Gen 2 completely changed how I play Grow a Garden. The auto-farm is flawless and updates are literally under a minute. Best investment I've made for Roblox." },
  { name: 'BloomKing', role: 'Premium Member', avatar: 'BK', rating: 5, text: "HWID locking means my key never gets stolen. The Discord support is insane — had my issue fixed in 5 minutes. 10/10 would recommend to anyone serious about GAG." },
  { name: 'SeedWhisperer', role: 'Free User', avatar: 'SW', rating: 4, text: "Even the free tier is better than most paid scripts I've tried. The pet spawner alone saved me hours of grinding. Upgrading to Premium soon!" },
  { name: 'DeltaPro', role: 'VIP Member', avatar: 'DP', rating: 5, text: "Been using Forge since Gen 1. Gen 2 is on another level — the real-time monitor lets me track all my alts at once. Uptime is genuinely 99.97% like they claim." },
  { name: 'GreenThumb', role: 'Premium Member', avatar: 'GT', rating: 5, text: "The dupe feature works perfectly and the anti-detection is solid. Haven't had a single ban in 3 months of daily use. Forge is the only script I trust now." },
  { name: 'FloraFanatic', role: 'Free User', avatar: 'FF', rating: 5, text: "Setup took literally 30 seconds. Loadstring → Delta → done. The tutorials in Discord are super helpful too. Community is really welcoming for newbies." }
];

const FAQS = [
  { question: 'Is Forge Gen 2 safe to use?', answer: 'Forge Gen 2 uses advanced obfuscation and anti-detection techniques to minimize ban risk. However, as with any third-party script, there is always a small risk. We recommend using an alt account and following our safety guidelines in Discord.' },
  { question: 'How do I get a key?', answer: 'Join our Discord server and use the key generation bot. Free keys last 1 day, Premium keys last 30 days, and VIP keys are lifetime. All keys are HWID-locked to your device for security.' },
  { question: 'What executor do I need?', answer: 'Forge Gen 2 is built exclusively for Delta Executor. We do not support other executors like Synapse X, Krnl, or Fluxus. Download Delta Executor from their official website for the best experience.' },
  { question: 'How fast are script updates?', answer: 'Our monitoring system detects Grow a Garden updates within seconds. Scripts are typically patched and live within 1 minute of a game update. You'll get a Discord notification when a patch is ready.' },
  { question: 'Can I share my key with friends?', answer: 'No. All keys are HWID-locked, meaning they are bound to your specific hardware. Attempting to share keys will result in automatic revocation. Each user must generate their own key.' },
  { question: 'What features are included?', answer: 'Forge Gen 2 includes Auto Farm, Auto Harvest, Auto Sell, Auto Buy Seeds, Pet Spawner, Dupe, Anti-AFK, and ESP. Premium and VIP tiers get priority updates and exclusive features like custom farm routes.' }
];

/* ===== DOM Refs ===== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const menuToggle = $('#menuToggle');
const menuOverlay = $('#menuOverlay');
const nav = $('#nav');
const body = document.body;
const gamesGrid = $('#gamesGrid');
const testimonialsGrid = $('#testimonialsGrid');
const faqList = $('#faqList');
const tabBtns = $$('.tab-btn');
const tabPanels = $$('.tab-panel');
const scriptModal = $('#scriptModal');
const scriptModalClose = $('#scriptModalClose');
const copyBtn = $('#copyBtn');
const yearSpan = $('#year');
const themeToggle = $('#themeToggle');
const scrollTopBtn = $('#scrollTop');
const siteHeader = $('#siteHeader');

/* ===== Theme ===== */
function initTheme() {
  const saved = localStorage.getItem('forge-theme');
  if (saved) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }
}

themeToggle?.addEventListener('click', () => {
  const isDark = body.classList.contains('theme-dark');
  body.classList.remove('theme-dark', 'theme-light');
  body.classList.add(isDark ? 'theme-light' : 'theme-dark');
  localStorage.setItem('forge-theme', isDark ? 'theme-light' : 'theme-dark');
});

/* ===== Mobile Menu ===== */
function openMenu() {
  nav?.classList.add('active');
  menuToggle?.classList.add('active');
  menuOverlay?.classList.add('active');
  body.classList.add('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  nav?.classList.remove('active');
  menuToggle?.classList.remove('active');
  menuOverlay?.classList.remove('active');
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  nav?.classList.contains('active') ? closeMenu() : openMenu();
});

menuOverlay?.addEventListener('click', closeMenu);

$$('.nav a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* ===== Tabs ===== */
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((p) => {
      p.classList.remove('active');
      p.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('active');
      panel.hidden = false;
    }
  });
});

/* ===== Games ===== */
function renderGames() {
  if (!gamesGrid) return;
  const game = GAMES[0];
  // Use a CSS gradient placeholder instead of broken image URL
  const placeholder = `linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%)`;
  gamesGrid.innerHTML = `
    <article class="game-card reveal" data-game="${game.id}" data-badge="${game.badge}">
      <div class="game-card-image" style="background:${placeholder};display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700;font-size:1.2rem;letter-spacing:-0.02em;">
        <span style="display:flex;align-items:center;gap:8px;"><i data-lucide="flower-2" style="width:24px;height:24px;"></i> Grow a Garden</span>
      </div>
      <div class="game-card-body">
        <div class="game-card-header">
          <span class="game-card-title">${game.name}</span>
          <span class="status-badge ${game.badge}">${game.badgeLabel}</span>
        </div>
        <p class="game-card-desc">${game.desc}</p>
        <div class="game-card-footer">
          <div class="game-card-executors">
            ${game.executors.slice(0, 3).map((e) => `<span class="executor-tag">${e}</span>`).join('')}
          </div>
          <span class="status-badge ${game.status}">${game.statusLabel}</span>
        </div>
      </div>
    </article>
  `;

  $('.game-card')?.addEventListener('click', () => openScriptModal(game));
}

/* ===== Testimonials ===== */
function renderTestimonials() {
  if (!testimonialsGrid) return;
  testimonialsGrid.innerHTML = TESTIMONIALS.map((t) => `
    <article class="testimonial-card reveal">
      <div class="testimonial-stars" aria-label="${t.rating} out of 5 stars">
        ${Array(t.rating).fill('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}
      </div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar" aria-hidden="true">${t.avatar}</div>
        <div class="testimonial-info">
          <span class="testimonial-name">${t.name}</span>
          <span class="testimonial-role">${t.role}</span>
        </div>
      </div>
    </article>
  `).join('');
}

/* ===== FAQ ===== */
function renderFAQ() {
  if (!faqList) return;
  faqList.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item reveal" data-faq="${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${faq.question}</span>
        <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  $$('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      $$('.faq-item').forEach((f) => {
        f.classList.remove('active');
        f.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===== Script Modal ===== */
let lastFocusedElement = null;

function openScriptModal(game) {
  lastFocusedElement = document.activeElement;
  $('#modalGameName').textContent = game.name;
  $('#modalDescription').textContent = game.desc;
  $('#modalStatus').textContent = game.statusLabel;
  $('#modalStatus').className = `status-badge ${game.status}`;
  $('#modalUpdated').textContent = `Updated ${game.updated}`;
  $('#modalLoadstring').textContent = game.loadstring;
  $('#modalFeatures').innerHTML = game.features.map((f) => `<li>${f}</li>`).join('');
  $('#modalExecutors').innerHTML = game.executors.map((e) => `<span class="executor-tag">${e}</span>`).join('');

  scriptModal?.classList.add('active');
  scriptModal?.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
  scriptModalClose?.focus();
}

function closeScriptModal() {
  scriptModal?.classList.remove('active');
  scriptModal?.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

scriptModalClose?.addEventListener('click', closeScriptModal);
scriptModal?.addEventListener('click', (e) => {
  if (e.target === scriptModal) closeScriptModal();
});

// Focus trap + Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && scriptModal?.classList.contains('active')) {
    closeScriptModal();
  }
  if (e.key === 'Tab' && scriptModal?.classList.contains('active')) {
    const focusable = scriptModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ===== Copy Loadstring ===== */
copyBtn?.addEventListener('click', async () => {
  const code = $('#modalLoadstring')?.textContent || '';
  const text = copyBtn.querySelector('.copy-text');
  const doCopy = () => {
    copyBtn.classList.add('copied');
    if (text) text.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      if (text) text.textContent = 'Copy';
    }, 2000);
  };
  try {
    await navigator.clipboard.writeText(code);
    doCopy();
  } catch {
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    doCopy();
  }
});

/* ===== Scroll-Triggered Counter Animation ===== */
const counted = new WeakSet();

function animateCounter(el) {
  if (counted.has(el)) return;
  counted.add(el);
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  // Detect decimal places from the original data-count string
  const decimalStr = el.dataset.count;
  const decimalPlaces = (decimalStr.split('.')[1] || '').length;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    let display;
    if (decimalPlaces > 0) {
      display = current.toFixed(decimalPlaces);
    } else {
      display = Math.floor(current).toLocaleString();
    }
    el.textContent = display + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

function observeCounters() {
  $$('.stat-num[data-count], .t-stat-num[data-count]').forEach((el) => counterObserver.observe(el));
}

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function observeReveals() {
  $$('.reveal').forEach((el) => revealObserver.observe(el));
}

/* ===== Scroll to Top ===== */
function initScrollTop() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 400;
    scrollTopBtn?.classList.toggle('visible', scrolled);
    siteHeader?.classList.toggle('scrolled', scrolled > 20);
  }, { passive: true });
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Router ===== */
const routeConfig = {
  '/': { tab: null },
  '/monitor': { tab: 'monitoring' },
  '/script': { tab: 'script-hub' },
  '/tutorials': { tab: null }
};

function getRouteKey() {
  const path = window.location.pathname;
  return path === '/' ? 'home' : path.replace('/', '');
}

function applyRoute() {
  const routeKey = getRouteKey();
  const config = routeConfig[window.location.pathname] || routeConfig['/'];

  $$('[data-route]').forEach((el) => {
    const routes = el.dataset.route.split(' ');
    el.style.display = (routes.includes('all') || routes.includes(routeKey)) ? '' : 'none';
  });

  if (config.tab) {
    const targetPanel = document.getElementById(config.tab);
    if (targetPanel) {
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => {
        p.classList.remove('active');
        p.hidden = true;
      });
      const btn = $(`[data-tab="${config.tab}"]`);
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      }
      targetPanel.classList.add('active');
      targetPanel.hidden = false;
    }
  }

  $$('.nav a[data-route]').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === routeKey);
  });
}

/* ===== Hash Navigation ===== */
function handleHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) {
    // Ensure the section is visible first
    el.style.display = '';
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

// Hash links smooth scroll (don't intercept — let browser handle the hash)
$$('a[href^="/#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const hash = href.split('#')[1];
    if (!hash) return;
    // If already on home page, just smooth scroll
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        history.pushState(null, '', href);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If on another page, let the browser navigate normally (hash will be preserved)
  });
});

window.addEventListener('popstate', () => {
  applyRoute();
  handleHash();
});

/* ===== Footer Year ===== */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===== Lucide Icons ===== */
function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    setTimeout(initIcons, 500);
  }
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderGames();
  renderTestimonials();
  renderFAQ();
  observeReveals();
  observeCounters();
  initScrollTop();
  applyRoute();
  handleHash();
  initIcons();

  // Route links (NOT hash links)
  $$('.nav a[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('/') && !href.includes('#')) {
        e.preventDefault();
        history.pushState(null, '', href);
        applyRoute();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});
