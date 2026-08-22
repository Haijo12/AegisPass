/* ===== Forge Gen 2 Monitor — v2.2 Compatibility Fixed ===== */

/* ===== Polyfills for older browsers ===== */
if (!window.WeakSet) {
  window.WeakSet = function() {
    this._items = [];
  };
  window.WeakSet.prototype.add = function(item) {
    if (this._items.indexOf(item) === -1) this._items.push(item);
    return this;
  };
  window.WeakSet.prototype.has = function(item) {
    return this._items.indexOf(item) !== -1;
  };
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = function(callback) {
    this.callback = callback;
    this.targets = [];
    var self = this;
    window.addEventListener('scroll', function() {
      for (var i = 0; i < self.targets.length; i++) {
        var target = self.targets[i];
        var rect = target.getBoundingClientRect();
        var entry = {
          target: target,
          isIntersecting: rect.top < window.innerHeight && rect.bottom > 0
        };
        self.callback([entry]);
      }
    });
  };
  window.IntersectionObserver.prototype.observe = function(target) {
    this.targets.push(target);
  };
  window.IntersectionObserver.prototype.unobserve = function(target) {
    var idx = this.targets.indexOf(target);
    if (idx !== -1) this.targets.splice(idx, 1);
  };
}

/* ===== Mock Data ===== */
var GAMES = [
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

var TESTIMONIALS = [
  { name: 'GardenMaster', role: 'VIP Member', avatar: 'GM', rating: 5, text: "Forge Gen 2 completely changed how I play Grow a Garden. The auto-farm is flawless and updates are literally under a minute. Best investment I've made for Roblox." },
  { name: 'BloomKing', role: 'Premium Member', avatar: 'BK', rating: 5, text: "HWID locking means my key never gets stolen. The Discord support is insane — had my issue fixed in 5 minutes. 10/10 would recommend to anyone serious about GAG." },
  { name: 'SeedWhisperer', role: 'Free User', avatar: 'SW', rating: 4, text: "Even the free tier is better than most paid scripts I've tried. The pet spawner alone saved me hours of grinding. Upgrading to Premium soon!" },
  { name: 'DeltaPro', role: 'VIP Member', avatar: 'DP', rating: 5, text: "Been using Forge since Gen 1. Gen 2 is on another level — the real-time monitor lets me track all my alts at once. Uptime is genuinely 99.97% like they claim." },
  { name: 'GreenThumb', role: 'Premium Member', avatar: 'GT', rating: 5, text: "The dupe feature works perfectly and the anti-detection is solid. Haven't had a single ban in 3 months of daily use. Forge is the only script I trust now." },
  { name: 'FloraFanatic', role: 'Free User', avatar: 'FF', rating: 5, text: "Setup took literally 30 seconds. Loadstring → Delta → done. The tutorials in Discord are super helpful too. Community is really welcoming for newbies." }
];

var FAQS = [
  { question: 'Is Forge Gen 2 safe to use?', answer: 'Forge Gen 2 uses advanced obfuscation and anti-detection techniques to minimize ban risk. However, as with any third-party script, there is always a small risk. We recommend using an alt account and following our safety guidelines in Discord.' },
  { question: 'How do I get a key?', answer: 'Join our Discord server and use the key generation bot. Free keys last 1 day, Premium keys last 30 days, and VIP keys are lifetime. All keys are HWID-locked to your device for security.' },
  { question: 'What executor do I need?', answer: 'Forge Gen 2 is built exclusively for Delta Executor. We do not support other executors like Synapse X, Krnl, or Fluxus. Download Delta Executor from their official website for the best experience.' },
  { question: 'How fast are script updates?', answer: 'Our monitoring system detects Grow a Garden updates within seconds. Scripts are typically patched and live within 1 minute of a game update. You'll get a Discord notification when a patch is ready.' },
  { question: 'Can I share my key with friends?', answer: 'No. All keys are HWID-locked, meaning they are bound to your specific hardware. Attempting to share keys will result in automatic revocation. Each user must generate their own key.' },
  { question: 'What features are included?', answer: 'Forge Gen 2 includes Auto Farm, Auto Harvest, Auto Sell, Auto Buy Seeds, Pet Spawner, Dupe, Anti-AFK, and ESP. Premium and VIP tiers get priority updates and exclusive features like custom farm routes.' }
];

/* ===== DOM Helpers ===== */
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

var menuToggle = $('#menuToggle');
var menuOverlay = $('#menuOverlay');
var nav = $('#nav');
var body = document.body;
var gamesGrid = $('#gamesGrid');
var testimonialsGrid = $('#testimonialsGrid');
var faqList = $('#faqList');
var tabBtns = $$('.tab-btn');
var tabPanels = $$('.tab-panel');
var scriptModal = $('#scriptModal');
var scriptModalClose = $('#scriptModalClose');
var copyBtn = $('#copyBtn');
var yearSpan = $('#year');
var themeToggle = $('#themeToggle');
var scrollTopBtn = $('#scrollTop');
var siteHeader = $('#siteHeader');

/* ===== Theme ===== */
function initTheme() {
  var saved = localStorage.getItem('forge-theme');
  if (saved) {
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    var isDark = body.classList.contains('theme-dark');
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(isDark ? 'theme-light' : 'theme-dark');
    localStorage.setItem('forge-theme', isDark ? 'theme-light' : 'theme-dark');
  });
}

/* ===== Mobile Menu ===== */
function openMenu() {
  if (nav) nav.classList.add('active');
  if (menuToggle) menuToggle.classList.add('active');
  if (menuOverlay) menuOverlay.classList.add('active');
  body.classList.add('menu-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (nav) nav.classList.remove('active');
  if (menuToggle) menuToggle.classList.remove('active');
  if (menuOverlay) menuOverlay.classList.remove('active');
  body.classList.remove('menu-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    if (nav && nav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', closeMenu);
}

toArray($$('.nav a')).forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

/* ===== Tabs ===== */
toArray(tabBtns).forEach(function(btn) {
  btn.addEventListener('click', function() {
    var target = btn.getAttribute('data-tab');
    toArray(tabBtns).forEach(function(b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    toArray(tabPanels).forEach(function(p) {
      p.classList.remove('active');
      p.hidden = true;
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    var panel = document.getElementById(target);
    if (panel) {
      panel.classList.add('active');
      panel.hidden = false;
    }
  });
});

/* ===== Games ===== */
function renderGames() {
  if (!gamesGrid) return;
  var game = GAMES[0];
  var placeholder = 'linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%)';
  gamesGrid.innerHTML =
    '<article class="game-card reveal" data-game="' + game.id + '" data-badge="' + game.badge + '">' +
      '<div class="game-card-image" style="background:' + placeholder + ';display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:700;font-size:1.2rem;letter-spacing:-0.02em;">' +
        '<span style="display:flex;align-items:center;gap:8px;">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5V15m4.5-3h-1.5m-3-4.5V6"/></svg>' +
          ' Grow a Garden' +
        '</span>' +
      '</div>' +
      '<div class="game-card-body">' +
        '<div class="game-card-header">' +
          '<span class="game-card-title">' + game.name + '</span>' +
          '<span class="status-badge ' + game.badge + '">' + game.badgeLabel + '</span>' +
        '</div>' +
        '<p class="game-card-desc">' + game.desc + '</p>' +
        '<div class="game-card-footer">' +
          '<div class="game-card-executors">' +
            game.executors.slice(0, 3).map(function(e) { return '<span class="executor-tag">' + e + '</span>'; }).join('') +
          '</div>' +
          '<span class="status-badge ' + game.status + '">' + game.statusLabel + '</span>' +
        '</div>' +
      '</div>' +
    '</article>';

  var card = $('.game-card');
  if (card) {
    card.addEventListener('click', function() { openScriptModal(game); });
  }
}

/* ===== Testimonials ===== */
function renderTestimonials() {
  if (!testimonialsGrid) return;
  var starSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

  testimonialsGrid.innerHTML = TESTIMONIALS.map(function(t) {
    var stars = '';
    for (var i = 0; i < t.rating; i++) stars += starSvg;
    return
      '<article class="testimonial-card reveal">' +
        '<div class="testimonial-stars" aria-label="' + t.rating + ' out of 5 stars">' + stars + '</div>' +
        '<p class="testimonial-text">' + t.text + '</p>' +
        '<div class="testimonial-author">' +
          '<div class="testimonial-avatar" aria-hidden="true">' + t.avatar + '</div>' +
          '<div class="testimonial-info">' +
            '<span class="testimonial-name">' + t.name + '</span>' +
            '<span class="testimonial-role">' + t.role + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }).join('');
}

/* ===== FAQ ===== */
function renderFAQ() {
  if (!faqList) return;
  faqList.innerHTML = FAQS.map(function(faq, i) {
    return
      '<div class="faq-item reveal" data-faq="' + i + '">' +
        '<button class="faq-question" aria-expanded="false" aria-controls="faq-answer-' + i + '">' +
          '<span>' + faq.question + '</span>' +
          '<svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
        '</button>' +
        '<div class="faq-answer" id="faq-answer-' + i + '">' +
          '<p>' + faq.answer + '</p>' +
        '</div>' +
      '</div>';
  }).join('');

  toArray($$('.faq-question')).forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('active');
      toArray($$('.faq-item')).forEach(function(f) {
        f.classList.remove('active');
        var q = f.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===== Script Modal ===== */
var lastFocusedElement = null;

function openScriptModal(game) {
  lastFocusedElement = document.activeElement;
  var modalGameName = $('#modalGameName');
  var modalDescription = $('#modalDescription');
  var modalStatus = $('#modalStatus');
  var modalUpdated = $('#modalUpdated');
  var modalLoadstring = $('#modalLoadstring');
  var modalFeatures = $('#modalFeatures');
  var modalExecutors = $('#modalExecutors');

  if (modalGameName) modalGameName.textContent = game.name;
  if (modalDescription) modalDescription.textContent = game.desc;
  if (modalStatus) {
    modalStatus.textContent = game.statusLabel;
    modalStatus.className = 'status-badge ' + game.status;
  }
  if (modalUpdated) modalUpdated.textContent = 'Updated ' + game.updated;
  if (modalLoadstring) modalLoadstring.textContent = game.loadstring;
  if (modalFeatures) modalFeatures.innerHTML = game.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');
  if (modalExecutors) modalExecutors.innerHTML = game.executors.map(function(e) { return '<span class="executor-tag">' + e + '</span>'; }).join('');

  if (scriptModal) {
    scriptModal.classList.add('active');
    scriptModal.setAttribute('aria-hidden', 'false');
  }
  body.classList.add('modal-open');
  if (scriptModalClose) scriptModalClose.focus();
}

function closeScriptModal() {
  if (scriptModal) {
    scriptModal.classList.remove('active');
    scriptModal.setAttribute('aria-hidden', 'true');
  }
  body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

if (scriptModalClose) {
  scriptModalClose.addEventListener('click', closeScriptModal);
}

if (scriptModal) {
  scriptModal.addEventListener('click', function(e) {
    if (e.target === scriptModal) closeScriptModal();
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && scriptModal && scriptModal.classList.contains('active')) {
    closeScriptModal();
  }
  if (e.key === 'Tab' && scriptModal && scriptModal.classList.contains('active')) {
    var focusable = scriptModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
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
function doCopyFeedback() {
  if (!copyBtn) return;
  copyBtn.classList.add('copied');
  var text = copyBtn.querySelector('.copy-text');
  if (text) text.textContent = 'Copied!';
  setTimeout(function() {
    copyBtn.classList.remove('copied');
    if (text) text.textContent = 'Copy';
  }, 2000);
}

if (copyBtn) {
  copyBtn.addEventListener('click', function() {
    var codeEl = $('#modalLoadstring');
    var code = codeEl ? codeEl.textContent : '';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(doCopyFeedback).catch(function() {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  });
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    doCopyFeedback();
  } catch (err) {
    // Silently fail
  }
  document.body.removeChild(ta);
}

/* ===== Scroll-Triggered Counter Animation ===== */
var counted = new WeakSet();

function animateCounter(el) {
  if (counted.has(el)) return;
  counted.add(el);
  var target = parseFloat(el.getAttribute('data-count'));
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 2000;
  var start = performance.now();
  var decimalStr = el.getAttribute('data-count');
  var decimalPlaces = (decimalStr.split('.')[1] || '').length;

  function update(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = target * eased;
    var display;
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

var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function observeCounters() {
  toArray($$('.stat-num[data-count], .t-stat-num[data-count]')).forEach(function(el) {
    counterObserver.observe(el);
  });
}

/* ===== Scroll Reveal ===== */
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeReveals() {
  toArray($$('.reveal')).forEach(function(el) {
    revealObserver.observe(el);
  });
}

/* ===== Scroll to Top ===== */
function initScrollTop() {
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY > 400;
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', scrolled);
    if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===== Router ===== */
var routeConfig = {
  '/': { tab: null },
  '/monitor': { tab: 'monitoring' },
  '/script': { tab: 'script-hub' },
  '/tutorials': { tab: null }
};

function getRouteKey() {
  var path = window.location.pathname;
  return path === '/' ? 'home' : path.replace('/', '');
}

function applyRoute() {
  var routeKey = getRouteKey();
  var config = routeConfig[window.location.pathname] || routeConfig['/'];

  toArray($$('[data-route]')).forEach(function(el) {
    var routes = el.getAttribute('data-route').split(' ');
    el.style.display = (routes.indexOf('all') !== -1 || routes.indexOf(routeKey) !== -1) ? '' : 'none';
  });

  if (config.tab) {
    var targetPanel = document.getElementById(config.tab);
    if (targetPanel) {
      toArray(tabBtns).forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      toArray(tabPanels).forEach(function(p) {
        p.classList.remove('active');
        p.hidden = true;
      });
      var btn = $('[data-tab="' + config.tab + '"]');
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      }
      targetPanel.classList.add('active');
      targetPanel.hidden = false;
    }
  }

  toArray($$('.nav a[data-route]')).forEach(function(link) {
    link.classList.toggle('active', link.getAttribute('data-route') === routeKey);
  });
}

/* ===== Hash Navigation ===== */
function handleHash() {
  var hash = window.location.hash;
  if (!hash) return;
  var el = document.querySelector(hash);
  if (el) {
    el.style.display = '';
    requestAnimationFrame(function() {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

toArray($$('a[href^="/#"]')).forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = link.getAttribute('href');
    var hash = href.split('#')[1];
    if (!hash) return;
    if (window.location.pathname === '/') {
      e.preventDefault();
      var el = document.getElementById(hash);
      if (el) {
        history.pushState(null, '', href);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

window.addEventListener('popstate', function() {
  applyRoute();
  handleHash();
});

/* ===== Footer Year ===== */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===== Lucide Icons ===== */
function initIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  } else if (!window.lucideFailed) {
    setTimeout(initIcons, 500);
  }
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', function() {
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

  toArray($$('.nav a[data-route]')).forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href.indexOf('/') === 0 && href.indexOf('#') === -1) {
        e.preventDefault();
        history.pushState(null, '', href);
        applyRoute();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});
