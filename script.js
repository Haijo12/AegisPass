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
    image: 'https://picsum.photos/seed/grow-a-garden/400/250'
  }
];

/* ===== DOM Elements ===== */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const body = document.body;
const gamesGrid = document.getElementById('gamesGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const scriptModal = document.getElementById('scriptModal');
const scriptModalClose = document.getElementById('scriptModalClose');
const copyBtn = document.getElementById('copyBtn');
const yearSpan = document.getElementById('year');

/* ===== Mobile Menu ===== */
menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('active');
  menuToggle?.classList.toggle('active');
  body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

/* ===== Tabs ===== */
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

/* ===== Games ===== */
function renderGames() {
  if (!gamesGrid) return;
  gamesGrid.innerHTML = GAMES.map((game) => `
    <div class="game-card reveal" data-game="${game.id}" data-badge="${game.badge}">
      <img src="${game.image}" alt="${game.name}" class="game-card-image" loading="lazy" />
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
    </div>
  `).join('');

  document.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', () => {
      const game = GAMES.find((g) => g.id === card.dataset.game);
      if (game) openScriptModal(game);
    });
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.game-card.reveal').forEach((el) => el.classList.add('visible'));
  });
}

renderGames();

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
  body.classList.add('modal-open');
}

function closeScriptModal() {
  scriptModal?.classList.remove('active');
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
    copyBtn.querySelector('.copy-text').textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.copy-text').textContent = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});

/* ===== Stats Counter Animation ===== */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 2000;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);
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
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ===== Footer Year ===== */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ===== Init ===== */
animateCounters();

/* ===== Initialize Lucide Icons ===== */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
