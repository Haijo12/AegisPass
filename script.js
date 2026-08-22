/* ===== Forge Gen 2 Monitor — Improved ===== */

/* ===== Configuration (Browser-compatible) ===== */
const CONFIG = {
  site: {
    name: 'Forge Gen 2 Monitor',
    tagline: 'Grow a Garden, elevated by Forge',
    description: 'The ultimate Grow a Garden script monitor built for Delta Executor.',
    url: 'https://wishub.cloud',
    discord: 'https://discord.gg/forgegen2',
    version: '2.0.0'
  },
  game: {
    id: 'gag',
    name: 'Grow a Garden',
    robloxUrl: 'https://www.roblox.com/games/126884695634066/Grow-a-Garden',
    features: [
      'Auto Farm',
      'Auto Harvest',
      'Auto Sell',
      'Auto Buy Seeds',
      'Pet Spawner',
      'Dupe',
      'Anti-AFK',
      'ESP'
    ]
  },
  executor: {
    supported: ['Delta Executor'],
    primary: 'Delta Executor',
    downloadUrl: 'https://deltaexecutor.com'
  },
  keys: {
    tiers: ['free', 'premium', 'vip'],
    durations: { free: '1d', premium: '30d', vip: 'lifetime' }
  },
  monitoring: {
    updateInterval: 5000,
    maxLogs: 100,
    uptimeTarget: 99.97
  }
};

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
    updated: '2 minutes ago',
    image: 'https://tr.rbxcdn.com/180DAY-8f6f6e8e8e8e8e8e8e8e8e8e8e8e8e8e/768/432/Image/Webp/noFilter'
  }
];

const TESTIMONIALS = [
  {
    name: 'GardenMaster',
    role: 'VIP Member',
    avatar: 'GM',
    rating: 5,
    text: 'Forge Gen 2 completely changed how I play Grow a Garden. The auto-farm is flawless and updates are literally under a minute. Best investment I\'ve made for Roblox.'
  },
  {
    name: 'BloomKing',
    role: 'Premium Member',
    avatar: 'BK',
    rating: 5,
    text: 'HWID locking means my key never gets stolen. The Discord support is insane — had my issue fixed in 5 minutes. 10/10 would recommend to anyone serious about GAG.'
  },
  {
    name: 'SeedWhisperer',
    role: 'Free User',
    avatar: 'SW',
    rating: 4,
    text: 'Even the free tier is better than most paid scripts I\'ve tried. The pet spawner alone saved me hours of grinding. Upgrading to Premium soon!'
  },
  {
    name: 'DeltaPro',
    role: 'VIP Member',
    avatar: 'DP',
    rating: 5,
    text: 'Been using Forge since Gen 1. Gen 2 is on another level — the real-time monitor lets me track all my alts at once. Uptime is genuinely 99.97% like they claim.'
  },
  {
    name: 'GreenThumb',
    role: 'Premium Member',
    avatar: 'GT',
    rating: 5,
    text: 'The dupe feature works perfectly and the anti-detection is solid. Haven\'t had a single ban in 3 months of daily use. Forge is the only script I trust now.'
  },
  {
    name: 'FloraFanatic',
    role: 'Free User',
    avatar: 'FF',
    rating: 5,
    text: 'Setup took literally 30 seconds. Loadstring → Delta → done. The tutorials in Discord are super helpful too. Community is really welcoming for newbies.'
  }
];

const FAQS = [
  {
    question: 'Is Forge Gen 2 safe to use?',
    answer: 'Forge Gen 2 uses advanced obfuscation and anti-detection techniques to minimize ban risk. However, as with any third-party script, there is always a small risk. We recommend using an alt account and following our safety guidelines in Discord.'
  },
  {
    question: 'How do I get a key?',
    answer: 'Join our Discord server and use the key generation bot. Free keys last 1 day, Premium keys last 30 days, and VIP keys are lifetime. All keys are HWID-locked to your device for security.'
  },
  {
    question: 'What executor do I need?',
    answer: 'Forge Gen 2 is built exclusively for Delta Executor. We do not support other executors like Synapse X, Krnl, or Fluxus. Download Delta Executor from their official website for the best experience.'
  },
  {
    question: 'How fast are script updates?',
    answer: 'Our monitoring system detects Grow a Garden updates within seconds. Scripts are typically patched and live within 1 minute of a game update. You\'ll get a Discord notification when a patch is ready.'
  },
  {
    question: 'Can I share my key with friends?',
    answer: 'No. All keys are HWID-locked, meaning they are bound to your specific hardware. Attempting to share keys will result in automatic revocation. Each user must generate their own key.'
  },
  {
    question: 'What features are included?',
    answer: 'Forge Gen 2 includes Auto Farm, Auto Harvest, Auto Sell, Auto Buy Seeds, Pet Spawner, Dupe, Anti-AFK, and ESP. Premium and VIP tiers get priority updates and exclusive features like custom farm routes.'
  }
];

/* ===== DOM Elements ===== */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const body = document.body;
const gamesGrid = document.getElementById('gamesGrid');
const testimonialsGrid = document.getElementById('testimonialsGrid');
const faqList = document.getElementById('faqList');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const scriptModal = document.getElementById('scriptModal');
const scriptModalClose = document.getElementById('scriptModalClose');
const copyBtn = document.getElementById('copyBtn');
const yearSpan = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const siteHeader = document.getElementById('siteHeader');

/* ===== Theme Toggle ===== */
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
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

/* ===== Mobile Menu ===== */
menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('active');
  menuToggle?.classList.toggle('active');
  body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('active');
    menuToggle?.classList.remove('active');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Tabs (with ARIA) ===== */
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
  gamesGrid.innerHTML = GAMES.map((game) => `
    <article class="game-card reveal" data-game="${game.id}" data-badge="${game.badge}">
      <img src="${game.image}" alt="${game.name} game thumbnail" class="game-card-image" loading="lazy" onerror="this.src='https://via.placeholder.com/400x250/16161f/8b5cf6?text=Grow+a+Garden'" />
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
  `).join('');

  document.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', () => {
      const game = GAMES.find((g) => g.id === card.dataset.game);
      if (game) openScriptModal(game);
    });
  });
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

  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach((f) => {
        f.classList.remove('active');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===== Script Modal ===== */
function openScriptModal(game) {
  document.getElementById('modalGameName').textContent = game.name;
  document.getElementById('modalDescription').textContent = game.desc;
  document.getElementById('modalStatus').textContent = game.statusLabel;
  document.getElementById('modalStatus').className = `status-badge ${game.status}`;
  document.getElementById('modalUpdated').textContent = `Updated ${game.updated}`;
  document.getElementById('modalLoadstring').textContent = game.loadstring;

  const featuresList = document.getElementById('modalFeatures');
  featuresList.innerHTML = game.features.map((f) => `<li>${f}</li>`).join('');

  const executorsContainer = document.getElementById('modalExecutors');
  executorsContainer.innerHTML = game.executors.map((e) => `<span class="executor-tag">${e}</span>`).join('');

  scriptModal?.classList.add('active');
  scriptModal?.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
  scriptModalClose?.focus();
}

function closeScriptModal() {
  scriptModal?.classList.remove('active');
  scriptModal?.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

scriptModalClose?.addEventListener('click', closeScriptModal);
scriptModal?.addEventListener('click', (e) => {
  if (e.target === scriptModal) closeScriptModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && scriptModal?.classList.contains('active')) {
    closeScriptModal();
  }
});

/* ===== Copy Loadstring ===== */
copyBtn?.addEventListener('click', async () => {
  const code = document.getElementById('modalLoadstring')?.textContent || '';
  try {
    await navigator.clipboard.writeText(code);
    copyBtn.classList.add('copied');
    const text = copyBtn.querySelector('.copy-text');
    if (text) text.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      if (text) text.textContent = 'Copy';
    }, 2000);
  } catch (err) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyBtn.classList.add('copied');
    const text = copyBtn.querySelector('.copy-text');
    if (text) text.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      if (text) text.textContent = 'Copy';
    }, 2000);
  }
});

/* ===== Stats Counter Animation ===== */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count], .t-stat-num[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 2000;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
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
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

/* ===== Scroll to Top ===== */
function initScrollTop() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 400;
    scrollTopBtn?.classList.toggle('visible', scrolled);
    siteHeader?.classList.toggle('scrolled', scrolled > 20);
  });

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

  document.querySelectorAll('[data-route]').forEach((el) => {
    const routes = el.dataset.route.split(' ');
    if (routes.includes('all') || routes.includes(routeKey)) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
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
      const btn = document.querySelector(`[data-tab="${config.tab}"]`);
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      }
      targetPanel.classList.add('active');
      targetPanel.hidden = false;
    }
  }

  document.querySelectorAll('.nav a[data-route]').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === routeKey);
  });
}

function handleHash() {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

window.addEventListener('popstate', () => {
  applyRoute();
  handleHash();
});

/* ===== Footer Year ===== */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===== Initialize Lucide Icons ===== */
function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    // Retry after a short delay
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
  initScrollTop();
  applyRoute();
  handleHash();
  animateCounters();
  initIcons();

  document.querySelectorAll('.nav a[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('/')) {
        e.preventDefault();
        if (history.pushState) {
          history.pushState(null, '', href);
          applyRoute();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });
});