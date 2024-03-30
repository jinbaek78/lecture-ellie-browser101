const playEndButton = document.querySelector('.playControlButton');
const playground = document.querySelector('.playground');
const timer = document.querySelector('.timer');
const carrot = document.querySelector('.carrotCount');
const initialCarrotCount = 3;
const initialBugCount = 10;
const backgroundSound = new Audio('src/assets/sound/bg.mp3');
const alertSound = new Audio('src/assets/sound/alert.wav');
const carrotPullSound = new Audio('src/assets/sound/carrot_pull.mp3');
const bugPullSound = new Audio('src/assets/sound/bug_pull.mp3');
const gameWinSound = new Audio('src/assets/sound/game_win.mp3');
const gameLoseSound = new Audio('src/assets/sound/game_lose.mp3');
const replayButton = document.querySelector('.replayButton');
const resultBanner = document.querySelector('.resultBanner');
const resultMessage = document.querySelector('.resultMessage');
const RESULT_MESSAGE = {
  WIN: 'You Win🎉',
  LOSE: 'You Lose😢',
  REPLAY: 'Replay ❓',
};
const timeLimit = 3;
let items = document.querySelector('.items');
let leftSeconds = timeLimit;
let leftCarrotCount = initialCarrotCount;
let timerIntervalId;

carrotPullSound.playbackRate = 10;
playEndButton.addEventListener('click', onPlayEndButtonClick);
replayButton.addEventListener('click', onReplayButtonClick);
playground.addEventListener('click', onCarrotOrBugClick);

function onCarrotOrBugClick(e) {
  const tagName = e.target.tagName;
  const isCarrot = e.target.parentNode.dataset.type === 'carrot';
  if (tagName !== 'IMG') {
    return;
  }

  if (isCarrot) {
    items.removeChild(e.target.parentNode);
    carrotPullSound.play();
    carrot.textContent = --leftCarrotCount;

    if (leftCarrotCount === 0) {
      end('WIN');
    }
    return;
  }

  bugPullSound.play();
  end('LOSE');
}

function end(result) {
  if (result !== 'WIN' && result !== 'LOSE') {
    throw new Error('the result must be either win or lose');
  }

  backgroundSound.pause();
  stopTimer(timerIntervalId);
  playEndButton.classList.remove('end');
  playEndButton.classList.add('hide');
  resultBanner.classList.add('show');
  resultMessage.textContent = RESULT_MESSAGE[result];
  if (result === 'WIN') {
    gameWinSound.play();
  } else {
    setTimeout(() => {
      gameLoseSound.play();
    }, 300);
  }
}

function onReplayButtonClick() {
  leftCarrotCount = initialCarrotCount;
  carrot.textContent = leftCarrotCount;
  leftSeconds = timeLimit;
  timer.textContent = `0:${leftSeconds}`;

  backgroundSound.play();
  resultBanner.classList.remove('show');
  playEndButton.classList.remove('hide');
  playEndButton.classList.add('end');
  toggleTimer(timerIntervalId);

  items.remove();
  items = document.createElement('ul');
  items.setAttribute('class', 'items');
  playground.appendChild(items);
  makeItems('carrot', initialCarrotCount, items);
  makeItems('bug', initialCarrotCount, items);
}

function onPlayEndButtonClick() {
  if (playEndButton.classList.contains('play')) {
    makeItems('carrot', initialCarrotCount, items);
    makeItems('bug', initialCarrotCount, items);
    carrot.textContent = leftCarrotCount;
    backgroundSound.play();
  } else {
    alertSound.play();
    backgroundSound.pause();
    resultBanner.classList.add('show');
    resultMessage.textContent = RESULT_MESSAGE['REPLAY'];
  }

  toggleButtonState();
  toggleTimer(timerIntervalId);
}

function toggleButtonState() {
  if (playEndButton.classList.contains('play')) {
    playEndButton.classList.remove('play');
    playEndButton.classList.add('end');
    return;
  }

  playEndButton.classList.remove('end');
  playEndButton.classList.add('hide');
}

function toggleTimer(timerIntervalId) {
  if (timerIntervalId == null) {
    startTimer();
  } else {
    stopTimer(timerIntervalId);
  }
}

function startTimer() {
  timerIntervalId = setInterval(() => {
    if (leftSeconds > 0) {
      timer.textContent = `0:${--leftSeconds}`;
      if (leftSeconds === 0) {
        end('LOSE');
      }
    }
  }, 1000);
}

function stopTimer(id) {
  clearInterval(id);
  timerIntervalId = null;
}

function getRandomPosition() {
  const TOP_MAX = 330;
  const LEFT_MAX = 1120;
  const RANDOM_TOP = Math.floor(Math.random() * (TOP_MAX + 1));
  const RANDOM_LEFT = Math.floor(Math.random() * (LEFT_MAX + 1));
  return [RANDOM_TOP, RANDOM_LEFT];
}

function makeItems(type, count, parent) {
  if (type !== 'carrot' && type !== 'bug') {
    throw new Error('Type must be either carrot or bug');
  }

  for (let i = 0; i < count; i++) {
    const src = `src/assets/img/${type}.png`;
    const item = document.createElement('li');
    const [top, left] = getRandomPosition();
    item.setAttribute('class', 'item');
    item.setAttribute('data-type', type);
    item.style.top = `${top}px`;
    item.style.left = `${left}px`;
    item.innerHTML = `
    <img
    class="image"
    src="${src}"
    alt="${type}"
  />
    `;
    parent?.appendChild?.(item);
  }

  return;
}
