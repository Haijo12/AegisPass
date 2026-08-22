// Starfield Generator
const starfield = document.getElementById('starfield');
const starCount = 180;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.opacity = Math.random() * 0.6 + 0.1;
  star.style.animationDelay = `${Math.random() * 3}s`;
  starfield.appendChild(star);
}

// Detail Panel
const panel = document.getElementById('detailPanel');
const closeBtn = document.getElementById('detailClose');
const cards = document.querySelectorAll('.card');

const topicData = {
  blackhole: {
    title: 'Black Holes',
    body: 'Black holes are regions of spacetime where gravity is so intense that nothing—no particles or even electromagnetic radiation such as light—can escape from inside it. They form when massive stars collapse under their own gravity at the end of their life cycles.',
    stats: ['∞', '0 km/s', 'Stellar']
  },
  stars: {
    title: 'Stars',
    body: 'Stars are giant balls of glowing gas that forge the elements essential for life in their cores through nuclear fusion. They come in many sizes, from small red dwarfs to massive blue supergiants millions of times brighter than our Sun.',
    stats: ['10⁷ K', '1 M☉ avg', 'Fusion']
  },
  nebulae: {
    title: 'Nebulae',
    body: 'Nebulae are vast clouds of dust and gas where new stars are born across light-years of color. These stellar nurseries glow with the light of young, hot stars and contain the raw materials for future planetary systems.',
    stats: ['10-100 ly', '10-1000 K', 'Ionized']
  },
  exoplanets: {
    title: 'Exoplanets',
    body: 'Exoplanets are worlds orbiting distant suns beyond our solar system. Some may hold the secrets to life beyond Earth, ranging from scorching hot Jupiters to temperate rocky worlds in the habitable zone.',
    stats: ['4000+', '~24 ly', 'Rocky/Gas']
  }
};

function openPanel(topic) {
  const data = topicData[topic];
  if (!data) return;
  document.getElementById('detailTitle').textContent = data.title;
  document.getElementById('detailBody').textContent = data.body;
  document.getElementById('stat1').textContent = data.stats[0];
  document.getElementById('stat2').textContent = data.stats[1];
  document.getElementById('stat3').textContent = data.stats[2];
  panel.classList.add('active');
}

function closePanel() {
  panel.classList.remove('active');
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    const topic = card.getAttribute('data-topic');
    openPanel(topic);
  });
});

closeBtn.addEventListener('click', closePanel);
panel.addEventListener('click', (e) => {
  if (e.target === panel) closePanel();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});

function scrollToTopics() {
  document.getElementById('topics').scrollIntoView({ behavior: 'smooth' });
}
