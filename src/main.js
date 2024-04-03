import Field from './field.js';
import PopUp from './popup.js';
import Sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});
const gameSound = new Sound();

const gameField = new Field(CARROT_COUNT, BUG_COUNT, gameSound);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }

  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    console.log('bug sound -');
    finishGame(false);
  }
}

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  gameSound.play('bg');
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY?');
  gameSound.play('alert');
  gameSound.stop('bg');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
  gameScore.innerHTML = CARROT_COUNT;
  score = 0;
  gameField.init();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  console.log('isWIn', win);
  if (win) {
    gameSound.play('win');
  } else {
    gameSound.play('bug');
  }
  stopGameTimer();
  gameSound.stop('bg');
  gameFinishBanner.showWithText(win ? 'You Win' : 'You Lose');
}

function updateScoreBoard() {
  gameScore.innerHTML = CARROT_COUNT - score;
}
