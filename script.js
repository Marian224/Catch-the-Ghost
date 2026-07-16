let score = 0;
let highScore = 0;
let lives = 3;
let spawnTime = 1500;
let gameTimer = null;
let isGhostClicked = false;

const ghost = document.getElementById('ghost');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-Score');
const livesDisplay = document.getElementById('lives');
const arena = document.getElementById('game-arena');

function startGame() {
    score = 0;
    lives = 3;
    spawnTime = 1500;
    isGhostClicked = false;

    scoreDisplay.innerText = score;
    livesDisplay.innerText = lives;

    clearInterval(gameTimer);

    ghost.classList.add('active');

    moveGhost();

    startGameLoop();
}

function startGameLoop() {
    clearInterval(gameTimer);

    gameTimer = setInterval(() => {
        if (!isGhostClicked) {
            lives--;
            livesDisplay.innerText = lives;

            if (lives <= 0) {
                gameOver();
                return;
            }
        }

        isGhostClicked = false;
        moveGhost();
    }, spawnTime);
}

function moveGhost() {

    const maxX = arena.clientWidth - 60;
    const maxY = arena.clientHeight - 60;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ghost.style.left = randomX + 'px';
    ghost.style.top = randomY + 'px';
}

function catchGhost() {
    if (isGhostClicked) return;

    isGhostClicked = true;
    score++;
    scoreDisplay.innerText = score;

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerText = highScore;
    }

    if (spawnTime > 400) {
        spawnTime -=60;
    }

    ghost.classList.add('caught');

    setTimeout(() => {
        ghost.classList.remove('caught');
        moveGhost();
        isGhostClicked = false;
        startGameLoop();
    }, 100);
}

function gameOver() {
    clearInterval(gameTimer);
    ghost.classList.remove('active');

    setTimeout(() => {
        alert(`Game Over! Your Score: ${score}\nHigh Score: ${highScore}`);
    }, 50);
}