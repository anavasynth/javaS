
function task1(){
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();


        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        const clock = document.getElementById('clock');
        clock.innerHTML = `${hours}:${minutes}:<span class="blink">${seconds}</span>`;
    }

    setInterval(updateClock, 1000);
}

function task2(){
    // Елементи DOM
    const countdownForm = document.getElementById('countdownForm');
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');
    const countdownDisplay = document.getElementById('countdownDisplay');

// Змінна для відліку часу
    let countdown;

// Функція, яка обновляє таймер
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const selectedDate = new Date(inputDate.value + ' ' + inputTime.value).getTime();
        const remainingTime = selectedDate - currentTime;

        if (remainingTime <= 0) {
            clearInterval(countdown);
            countdownDisplay.textContent = 'Час вийшов!';
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdownDisplay.textContent = `${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
    }

// Обробник події для форми
    countdownForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearInterval(countdown);
        updateCountdown();
        countdown = setInterval(updateCountdown, 1000);
    });
}

function task3(){
    const currentMonthYearElement = document.getElementById('currentMonthYear');
    const calendarBodyElement = document.getElementById('calendarBody');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const countdownDisplay = document.getElementById('result');

    let currentDate = new Date();

    function generateCalendar(month, year) {
        calendarBodyElement.innerHTML = '';

        // Встановлюємо місяць та рік в заголовку календаря
        currentMonthYearElement.textContent = `${month + 1}/${year}`;

        // Визначаємо перший день місяця
        let firstDay = new Date(year, month, 0).getDay();

        // Визначаємо кількість днів у місяці
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement('td');
                    cell.textContent = date;
                    if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                        cell.classList.add('current-day');
                    }
                    row.appendChild(cell);
                    date++;
                }
            }

            calendarBodyElement.appendChild(row);

            if (date > daysInMonth) {
                break;
            }
        }
    }

    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());

    prevMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    calendarBodyElement.addEventListener('click', function(event) {
        if (event.target.tagName === 'TD' && event.target.textContent.trim() !== '') {
            let selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(event.target.textContent));
            document.getElementById('selectedDate').value = selectedDate.toDateString();
            const currentTime = new Date().getTime();
            const remainingTime = selectedDate - currentTime;

            const months = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30)); // Один місяць приблизно 30 днів
            const days = Math.floor((remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            if (remainingTime <= 0) {
                countdownDisplay.textContent = 'Дата уже наступила!';
                return;
            }

            countdownDisplay.textContent = `${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд`;
        }
    });
}

task1();

task2();

task3();






