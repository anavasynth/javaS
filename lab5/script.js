
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


let redDuration = 5; // default duration in seconds
let yellowDuration = 3; // default duration in seconds
let greenDuration = 7; // default duration in seconds
let blinkDuration = 0.5; // default duration for blinking yellow in seconds
let initialBlinkCount = 3; // number of initial blinks for yellow

let currentColor = 'red'; // start with red
let blinkCount = 0;

const redElement = document.getElementById('red');
const yellowElement = document.getElementById('yellow');
const greenElement = document.getElementById('green');
const nextButton = document.getElementById('nextButton');

function switchColor(color) {
    redElement.style.backgroundColor = 'grey';
    yellowElement.style.backgroundColor = 'grey';
    greenElement.style.backgroundColor = 'grey';

    switch (color) {
        case 'red':
            redElement.style.backgroundColor = 'red';
            break;
        case 'yellow':
            yellowElement.style.backgroundColor = 'yellow';
            break;
        case 'green':
            greenElement.style.backgroundColor = 'green';
            break;
    }
}

function changeLight() {
    switch (currentColor) {
        case 'red':
            switchColor('red');
            setTimeout(() => {
                switchColor('yellow');
                currentColor = 'yellow';
                setTimeout(changeLight, yellowDuration * 1000);
            }, redDuration * 1000);
            break;
        case 'yellow':
            if (blinkCount < initialBlinkCount) {
                switchColor('yellow');
                blinkCount++;
                setTimeout(changeLight, blinkDuration * 1000);
            } else {
                switchColor('green');
                currentColor = 'green';
                blinkCount = 0;
                setTimeout(changeLight, greenDuration * 1000);
            }
            break;
        case 'green':
            switchColor('yellow');
            currentColor = 'yellow';
            setTimeout(() => {
                switchColor('red');
                currentColor = 'red';
                setTimeout(changeLight, redDuration * 1000);
            }, yellowDuration * 1000);
            break;
    }
}

function manualSwitch() {
    switch (currentColor) {
        case 'red':
            switchColor('yellow');
            currentColor = 'yellow';
            break;
        case 'yellow':
            switchColor('green');
            currentColor = 'green';
            break;
        case 'green':
            switchColor('yellow');
            currentColor = 'yellow';
            break;
    }
}

nextButton.addEventListener('click', manualSwitch);

changeLight(); // start the initial cycle







/*
let states = ['red', 'yellow', 'green'];
let currentState = 0;

function switchLights() {
    let current = states[currentState];

    document.getElementById('red').style.backgroundColor = 'grey';
    document.getElementById('yellow').style.backgroundColor = 'grey';
    document.getElementById('green').style.backgroundColor = 'grey';

    document.getElementById(current).style.backgroundColor = current;

    if (current === 'green') {
        setTimeout(function() {
            document.getElementById('green').style.backgroundColor = 'grey';
            currentState = 0;
        }, 7000); // green light duration
    } else if (current === 'yellow') {
        setTimeout(function() {
            document.getElementById('yellow').style.backgroundColor = 'grey';
            currentState++;
        }, 3000); // yellow light duration
    } else if (current === 'red') {
        setTimeout(function() {
            document.getElementById('red').style.backgroundColor = 'grey';
            currentState++;
        }, 5000); // red light duration
    }
}

function nextState() {
    currentState = (currentState + 1) % states.length;
    switchLights();
}

switchLights();
*/




