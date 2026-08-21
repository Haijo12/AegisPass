const stampGrid = document.getElementById('stampGrid');
const rewardStatus = document.getElementById('rewardStatus');
const cardNote = document.getElementById('cardNote');
const addStampBtn = document.getElementById('addStampBtn');
const resetCardBtn = document.getElementById('resetCardBtn');

const brewMethod = document.getElementById('brewMethod');
const coffeeGrams = document.getElementById('coffeeGrams');
const gramsVal = document.getElementById('gramsVal');
const waterResult = document.getElementById('waterResult');
const copyWifiBtn = document.getElementById('copyWifiBtn');

const MAX_STAMPS = 10;
let currentStamps = parseInt(localStorage.getItem('aegis_stamps')) || 0;

function renderStamps() {
    stampGrid.innerHTML = '';
    for (let i = 1; i <= MAX_STAMPS; i++) {
        const slot = document.createElement('div');
        slot.classList.add('stamp-slot');
        if (i <= currentStamps) {
            slot.classList.add('active');
            slot.textContent = 'STAMP';
        } else {
            slot.textContent = i;
        }
        stampGrid.appendChild(slot);
    }
    
    rewardStatus.textContent = `${currentStamps} / ${MAX_STAMPS} Stamps`;
    
    if (currentStamps >= MAX_STAMPS) {
        cardNote.textContent = 'Reward Unlocked! Show card to barista for a free drink.';
        cardNote.style.color = 'var(--accent-amber)';
    } else {
        cardNote.textContent = 'Collect 10 stamps to unlock a free specialty drink!';
        cardNote.style.color = 'var(--text-secondary)';
    }
}

addStampBtn.addEventListener('click', () => {
    if (currentStamps < MAX_STAMPS) {
        currentStamps++;
        localStorage.setItem('aegis_stamps', currentStamps);
        renderStamps();
    }
});

resetCardBtn.addEventListener('click', () => {
    currentStamps = 0;
    localStorage.setItem('aegis_stamps', 0);
    renderStamps();
});

function calculateWater() {
    const ratio = parseFloat(brewMethod.value);
    const grams = parseInt(coffeeGrams.value);
    gramsVal.textContent = `${grams}g`;
    waterResult.textContent = `${grams * ratio}g`;
}

brewMethod.addEventListener('change', calculateWater);
coffeeGrams.addEventListener('input', calculateWater);

copyWifiBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('AegisBeans2026').then(() => {
        copyWifiBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyWifiBtn.textContent = 'Copy Password';
        }, 2000);
    });
});

renderStamps();
calculateWater();
