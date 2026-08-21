const passwordDisplay = document.getElementById('passwordDisplay');
const copyBtn = document.getElementById('copyBtn');
const copyText = document.getElementById('copyText');
const lengthSlider = document.getElementById('lengthSlider');
const lengthVal = document.getElementById('lengthVal');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const generateBtn = document.getElementById('generateBtn');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

function getRandomCharacter(charSet) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return charSet[randomArray[0] % charSet.length];
}

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const useUpper = document.getElementById('incUppercase').checked;
    const useLower = document.getElementById('incLowercase').checked;
    const useNumbers = document.getElementById('incNumbers').checked;
    const useSymbols = document.getElementById('incSymbols').checked;

    let availablePool = '';
    if (useUpper) availablePool += uppercaseChars;
    if (useLower) availablePool += lowercaseChars;
    if (useNumbers) availablePool += numberChars;
    if (useSymbols) availablePool += symbolChars;

    if (availablePool === '') {
        passwordDisplay.value = 'Select an option';
        updateStrength(0);
        return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        generatedPassword += getRandomCharacter(availablePool);
    }

    passwordDisplay.value = generatedPassword;
    calculateStrength(generatedPassword, availablePool.length);
}

function calculateStrength(password, poolSize) {
    const entropy = password.length * Math.log2(poolSize);
    updateStrength(entropy);
}

function updateStrength(entropy) {
    if (entropy === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'None';
    } else if (entropy < 40) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = 'var(--accent-rose)';
        strengthText.textContent = 'Weak';
    } else if (entropy < 65) {
        strengthBar.style.width = '50%';
        strengthBar.style.backgroundColor = 'var(--accent-amber)';
        strengthText.textContent = 'Medium';
    } else if (entropy < 80) {
        strengthBar.style.width = '75%';
        strengthBar.style.backgroundColor = 'var(--accent-cyan)';
        strengthText.textContent = 'Strong';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--accent-emerald)';
        strengthText.textContent = 'Unbreakable';
    }
}

copyBtn.addEventListener('click', () => {
    if (!passwordDisplay.value || passwordDisplay.value === 'Select an option') return;
    
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        copyText.textContent = 'Copied';
        setTimeout(() => {
            copyText.textContent = 'Copy';
        }, 2000);
    });
});

generateBtn.addEventListener('click', generatePassword);
window.addEventListener('DOMContentLoaded', generatePassword);
