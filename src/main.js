const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;
const PLAYBACK_SPEED = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const bgSound = new Audio('sound/bg.mp3');
const alertSound = new Audio('sound/alert.wav');
const carrotPullSound = new Audio('sound/carrot_pull.mp3');
const bugPullSound = new Audio('sound/bug_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');

let started = false;
let score = 5;
let timer = undefined;

carrotPullSound.playbackRate = PLAYBACK_SPEED;

gameBtn.addEventListener('click', () => {
  console.log(started);
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

popUpRefresh.addEventListener('click', () => {
  started = true;
  showGameButton();
  startGameTimer();
  initGame();
  hidePopUp();
});

field.addEventListener('click', (e) => {
  const carrotOrBug = e.target.tagName === 'IMG';
  const isCarrot = e.target.className === 'carrot';
  if (!carrotOrBug) {
    return;
  }

  if (isCarrot) {
    carrotPullSound.play();
    setTimeout(() => {
      stopGame('win');
    }, 300);
    return;
  }

  bugPullSound.play();
  stopGame('lose', true);
});

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function showGameButton() {
  gameBtn.style.visibility = 'visible';
}

//
function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame(reason = 'stop', mute = false) {
  bgSound.pause();
  stopGameTimer();
  hideGameButton();
  let text = 'REPLAY?';

  if (reason === 'stop') {
    alertSound.play();
  } else if (reason === 'win') {
    gameWinSound.play();
    text = 'You Win!';
  } else if (reason === 'lose') {
    !mute && alertSound.play();
    text = 'You Lose';
  }
  console.log(reason, text);
  showPopUpWithText(text);
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  if (icon) {
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }
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
      stopGame('lose');
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
  bgSound.play();
  field.innerHTML = '';
  gameScore.innerHTML = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function showPopUpWithText(text) {
  popUpText.innerHTML = text;
  popUp.classList.remove('pop-up--hide');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
