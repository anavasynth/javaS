const cards = document.querySelectorAll('.memory-card');
const difficultySelect = document.getElementById('difficulty');
const newGameBtn = document.getElementById('new-game-btn');
const startGameBtn = document.getElementById('start-game-btn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let timeLeft;
let score = 0;

// Налаштування гри
let difficulty = 'easy';
let rows = 3;
let cols = 4;
let timeLimit = 180;
let startTime;


difficultySelect.addEventListener('change', function() {
    difficulty = this.value;
    if (difficulty === 'easy') {
        timeLimit = 180;
    } else if (difficulty === 'normal') {
        timeLimit = 120;
    } else if (difficulty === 'hard') {
        timeLimit = 60;
    }
});

newGameBtn.addEventListener('click', function() {
    resetGame();
});

startGameBtn.addEventListener('click', function() {
    startGame();
});

function startGame() {
    var audio = new Audio('dota.mp3');
    audio.play();
    startTime = Date.now(); // Запам'ятовуємо час початку гри
    startTimer();
    score = 0;
    scoreDisplay.textContent = score;
    resetBoard();
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
}


function resetGame() {
    location.reload();
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        score++;
        scoreDisplay.textContent = score;
        if (score === rows * cols / 2) {
            stopTimer();
            let endTime = Date.now(); // Отримуємо час завершення гри
            let gameTime = (endTime - startTime) / 1000; // Час гри в секундах
            alert(`Ви виграли! Час гри: ${gameTime} секунд`);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * (rows * cols));
        card.style.order = randomPos;
    });
}

function startTimer() {
    timeLeft = timeLimit;
    timerDisplay.textContent = formatTime(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft === 0) {
            stopTimer();
            let audio = new Audio('lose.mp3');
            audio.play();
            alert('Час вийшов! Ви програли.');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}