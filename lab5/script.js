
let lamp = document.getElementById('lamp');
let toggle = document.getElementById('toggle');
let brightnessInput = document.getElementById('brightness');
let lampTypeSelect = document.getElementById('lampType');
let autoOffTimeout;

function changeType() {
    if (toggle.checked) {
        let lampType = lampTypeSelect.value;
        switch (lampType) {
            case 'regular':
                lamp.style.opacity = 100;
                lamp.style.backgroundColor = 'yellow';
                break;
            case 'energySaving':
                lamp.style.opacity = 100;
                lamp.style.backgroundColor = '#88afe5';
                break;
            case 'led':
                lamp.style.opacity = 100;
                lamp.style.backgroundColor = 'purple';
                break;
            default:
                break;
        }
    }
}

lampTypeSelect.addEventListener('change', changeType);

toggle.addEventListener('change', function() {
    if (toggle.checked) {
        lamp.classList.add('on');
        changeType();
        autoOffTimeout = setTimeout(() => {
            lamp.classList.remove('on');
            lamp.style.backgroundColor = 'gray';
        }, 50000); // 5 minutes in milliseconds
    } else {
        lamp.classList.remove('on');
        lamp.style.backgroundColor = 'gray';
        clearTimeout(autoOffTimeout);
    }
});

brightnessInput.addEventListener('click', function() {
    let brightness = parseInt(prompt('Enter brightness (0-100):'));
    if (brightness >= 0 && brightness <= 100 && lampTypeSelect.value !== 'regular' && lamp.classList.contains('on')) {
        lamp.style.opacity = brightness / 100;
    } else {
        alert('Включіть ламочку, або вкажіть правильний діапазон (Звичайна лампочка не може міняти яскрвість)');
    }
});









