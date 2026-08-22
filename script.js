/* ===== Mock Data ===== */
const GAMES = [
  {
    id: 'gpo',
    name: 'Grand Piece Online',
    status: 'working',
    statusLabel: 'Working',
    badge: 'popular',
    badgeLabel: 'Popular',
    desc: 'Auto-farm, auto-quest, auto-haki, and more for Grand Piece Online.',
    features: ['Auto Farm', 'Auto Quest', 'Auto Haki', 'Auto Race V2', 'ESP'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/gpo'))()",
    executors: ['Wave', 'Delta', 'Krnl', 'Fluxus', 'Hydrogen'],
    updated: '2 minutes ago',
    image: 'https://picsum.photos/seed/gpo-roblox/400/250'
  },
  {
    id: 'fruit-seas',
    name: 'Fruit Seas',
    status: 'working',
    statusLabel: 'Working',
    badge: 'focused',
    badgeLabel: 'Focused',
    desc: 'Auto-farm fruits, islands, and bosses in Fruit Seas.',
    features: ['Auto Farm', 'Auto Island', 'Auto Boss', 'Fruit ESP', 'Teleport'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/fruit-seas'))()",
    executors: ['Swift', 'Velocity', 'Codex', 'Krnl', 'Fluxus'],
    updated: '5 minutes ago',
    image: 'https://picsum.photos/seed/fruit-seas/400/250'
  },
  {
    id: 'fisch',
    name: 'Fisch',
    status: 'working',
    statusLabel: 'Working',
    badge: 'stable',
    badgeLabel: 'Stable',
    desc: 'Auto-fish, auto-crate, and auto-enchant for Fisch.',
    features: ['Auto Fish', 'Auto Crate', 'Auto Enchant', 'ESP', 'Teleport'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/fisch'))()",
    executors: ['Wave', 'Delta', 'Krnl', 'Fluxus', 'Hydrogen', 'Swift'],
    updated: '12 minutes ago',
    image: 'https://picsum.photos/seed/fisch-roblox/400/250'
  },
  {
    id: 'sols-rng',
    name: "Sol's RNG",
    status: 'working',
    statusLabel: 'Working',
    badge: 'popular',
    badgeLabel: 'Popular',
    desc: 'Auto-roll, auto-aura, and luck boost for Sol\'s RNG.',
    features: ['Auto Roll', 'Auto Aura', 'Luck Boost', 'ESP', 'Auto Collect'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/sols-rng'))()",
    executors: ['Velocity', 'Codex', 'Krnl', 'Fluxus'],
    updated: '1 minute ago',
    image: 'https://picsum.photos/seed/sols-rng/400/250'
  },
  {
    id: 'blox-fruits',
    name: 'Blox Fruits',
    status: 'updating',
    statusLabel: 'Updating',
    badge: 'popular',
    badgeLabel: 'Popular',
    desc: 'Auto-farm, auto-quest, and fruit notification for Blox Fruits.',
    features: ['Auto Farm', 'Auto Quest', 'Fruit ESP', 'Auto Sea Events', 'Teleport'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/blox-fruits'))()",
    executors: ['Wave', 'Delta', 'Krnl', 'Fluxus', 'Hydrogen', 'Swift', 'Velocity'],
    updated: 'Updating...',
    image: 'https://picsum.photos/seed/blox-fruits/400/250'
  },
  {
    id: 'slap-battles',
    name: 'Slap Battles',
    status: 'patched',
    statusLabel: 'Patched',
    badge: 'stable',
    badgeLabel: 'Stable',
    desc: 'Auto-slap, auto-glove, and anti-cheat bypass for Slap Battles.',
    features: ['Auto Slap', 'Auto Glove', 'Anti-Cheat Bypass', 'ESP'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/slap-battles'))()",
    executors: ['Krnl', 'Fluxus', 'Hydrogen'],
    updated: 'Patched',
    image: 'https://picsum.photos/seed/slap-battles/400/250'
  },
  {
    id: '99-nights',
    name: '99 Nights in the Forest',
    status: 'working',
    statusLabel: 'Working',
    badge: 'focused',
    badgeLabel: 'Focused',
    desc: 'Auto-farm, auto-craft, and night survival for 99 Nights.',
    features: ['Auto Farm', 'Auto Craft', 'Night Vision', 'ESP', 'Speed'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/99-nights'))()",
    executors: ['Swift', 'Codex', 'Krnl', 'Fluxus'],
    updated: '8 minutes ago',
    image: 'https://picsum.photos/seed/99-nights/400/250'
  },
  {
    id: 'pet-sim-99',
    name: 'Pet Simulator 99',
    status: 'working',
    statusLabel: 'Working',
    badge: 'stable',
    badgeLabel: 'Stable',
    desc: 'Auto-farm coins, auto-hatch, and auto-enchant for Pet Sim 99.',
    features: ['Auto Farm', 'Auto Hatch', 'Auto Enchant', 'Auto Trade'],
    loadstring: "loadstring(game:HttpGet('https://wishub.cloud/api/v1/scripts/pet-sim-99'))()",
    executors: ['Wave', 'Delta', 'Krnl', 'Hydrogen'],
    updated: '15 minutes ago',
    image: 'https://picsum.photos/seed/pet-sim-99/400/250'
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

/* ===== Games Filter ===== */
function renderGames(filter = 'all') {
  if (!gamesGrid) return;
  const filtered = filter === 'all' ? GAMES : GAMES.filter((g) => g.badge === filter);
  gamesGrid.innerHTML = filtered.map((game) => `
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

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderGames(btn.dataset.filter);
  });
});

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
