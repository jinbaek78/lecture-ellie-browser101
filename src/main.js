const CARROT_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const playOrEndButton = document.querySelector('.game__button');
const playIcon = document.querySelector('.fa-play');
const endIcon = document.querySelector('.fa-stop');
const score = document.querySelector('.game__score');
const timer = document.querySelector('.game__timer');
const timeLimit = 10;
const initialCarrotCount = 10;
let timerId;
let leftSeconds = timeLimit;

playOrEndButton.addEventListener('click', () => {
  initGame();
});

function initGame() {
  toggleButtonStatus();
  timer.classList.remove('hide');
  startTimer();
  score.classList.remove('hide');
  score.textContent = initialCarrotCount;
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function startTimer() {
  if (timerId == null) {
    timerId = setInterval(() => {
      timer.textContent = `0:${--leftSeconds}`;
    }, 1000);
  }
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function toggleStartStopTimer() {
  if (timerId == null) {
    clearInterval(timerId);
    timerId = null;
    return;
  }

  timerId = setInterval(() => {}, 1000);
}

function toggleButtonStatus() {
  playIcon.classList.toggle('hide');
  endIcon.classList.toggle('hide');
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
