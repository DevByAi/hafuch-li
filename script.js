const keyboardMap = {
    'ש': 'a', 'נ': 'b', 'ב': 'c', 'ג': 'd', 'ק': 'e', 'כ': 'f',
    'ע': 'g', 'י': 'h', 'ן': 'i', 'ח': 'j', 'ל': 'k', 'ך': 'l',
    'צ': 'm', 'מ': 'n', 'ם': 'o', 'פ': 'p', '/': 'q', 'ר': 'r',
    'ד': 's', 'א': 't', 'ו': 'u', 'ה': 'v', "'": 'w', 'ס': 'x',
    'ט': 'y', 'ז': 'z', 'ף': ']', ']': '[', '[': ';', '.': '/',
    ',': '.', ';': ',', '\\': '\\', ' ': ' '
}; I’m 
const reverseMap = Object.fromEntries(
    Object.entries(keyboardMap).map(([k, v]) => [v, k])
);
function convertText() {
    const input = document.getElementById('input').value;
    const type = document.getElementById('conversionType').value;
    const output = document.getElementById('output');
    switch(type) {
        case 'heb-to-eng':
            output.value = [...input].map(c => keyboardMap[c] || c).join('');
            break;
        case 'eng-to-heb':
            output.value = [...input].map(c => reverseMap[c.toLowerCase()] || c).join('');
            break;
        case 'heb-flip':
            output.value = input.split(' ')
                .map(w => /[\u0590-\u05FF]/.test(w) ? [...w].reverse().join('') : w)
                .join(' ');
            break;
        case 'eng-flip':
            output.value = input.split(' ')
                .map(w => /[a-zA-Z]/.test(w) ? [...w].reverse().join('') : w)
                .join(' ');
            break;
    }
}
function copyText() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');    
    // שמירת הצבע המקורי
    const computedStyle = getComputedStyle(output);
    const originalBg = computedStyle.backgroundColor;
    const originalColor = computedStyle.color;   
    // אנימציית העתקה
    output.style.backgroundColor = '#4CAF50';
    output.style.color = 'white'; 
    setTimeout(() => {
        output.style.backgroundColor = originalBg;
        output.style.color = originalColor;
    }, 200);
}
function clearText() {
    const elements = ['input', 'output'].map(id => document.getElementById(id));
    elements.forEach(el => {
        el.style.transform = 'scale(0.95)';
        setTimeout(() => {
            el.value = '';
            el.style.transform = '';
        }, 150);
    });
}
// ניהול מצב תצוגה
const themeSwitch = document.getElementById('theme-switch');  
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
}
// טעינה ראשונית של מצב התצוגה
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeSwitch.checked = true;
    setTheme(true);
}
// מעבר בין מצבי תצוגה
themeSwitch.addEventListener('change', () => {
    setTheme(themeSwitch.checked);
});
// המרה אוטומטית בזמן הקלדה
document.getElementById('input').addEventListener('input', convertText); 
