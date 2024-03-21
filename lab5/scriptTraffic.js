let redDuration = parseInt(prompt('Введіть тривалість червоного світла (секунди):'));
let yellowDuration = parseInt(prompt('Введіть тривалість жовтого світла (секунди):'));
let greenDuration = parseInt(prompt('Введіть тривалість зеленого світла (секунди):'));
let flashingYellowDuration = 0.5; // Duration for each flash (0.5 seconds)
let flashingYellowCount = 0;
let intervalId;

function changeColor(color) {
    document.querySelectorAll('.light').forEach(light => light.style.display = 'none');
    document.querySelector(`.${color}`).style.display = 'block';
}

let currentColor = 'red';

function switchLight() {
    switch (currentColor) {
        case 'red':
            changeColor('red');
            intervalId = setInterval(() => {
                currentColor = 'yellow';
                changeColor('yellow');
                clearInterval(intervalId);
                setTimeout(() => {
                    switchLight();
                }, yellowDuration * 1000);
            }, redDuration * 1000);
            break;
        case 'yellow':
            changeColor('yellow');
            intervalId = setInterval(() => {
                currentColor = 'green';
                changeColor('green');
                clearInterval(intervalId);
                setTimeout(() => {
                    switchLight();
                }, greenDuration * 1000);
            }, yellowDuration * 1000);
            break;
        case 'green':
            changeColor('green');
            intervalId = setInterval(() => {
                currentColor = 'flashingYellow';
                flashingYellowCount = 0;
                changeColor('yellow');
                setTimeout(() => {
                    changeColor('transparent');
                }, flashingYellowDuration * 1000);
                clearInterval(intervalId);
                intervalId = setInterval(() => {
                    flashingYellowCount++;
                    if (flashingYellowCount <= 2) {
                        changeColor('yellow');
                        setTimeout(() => {
                            changeColor('transparent');
                        }, flashingYellowDuration * 1000);
                    } else {
                        clearInterval(intervalId);
                        currentColor = 'red';
                        switchLight();
                    }
                }, flashingYellowDuration * 1000 * 2);
            }, greenDuration * 1000);
            break;
    }
}

switchLight();

document.getElementById('next-state').addEventListener('click', () => {
    clearInterval(intervalId);
    switch (currentColor) {
        case 'red':
            currentColor = 'yellow';
            break;
        case 'yellow':
            currentColor = 'green';
            break;
        case 'green':
            currentColor = 'flashingYellow';
            flashingYellowCount = 0;
            changeColor('yellow');
            intervalId = setInterval(() => {
                flashingYellowCount++;
                if (flashingYellowCount <= 2) {
                    changeColor('yellow');
                    setTimeout(() => {
                        changeColor('transparent');
                    }, flashingYellowDuration * 1000);
                } else {
                    clearInterval(intervalId);
                    currentColor = 'red';
                    switchLight();
                }
            }, flashingYellowDuration * 1000 * 2);
            break;
        case 'flashingYellow':
            currentColor = 'red';
            break;
    }
    switchLight();
});