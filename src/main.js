const playStopButton = document.querySelector('.playControlButton');
const playground = document.querySelector('.playground');
const timer = document.querySelector('.timer');
const carrot = document.querySelector('.carrotCount');
const initialCarrotCount = 3;
const initialBugCount = 10;
const backgroundSound = new Audio('src/assets/sound/bg.mp3');
const alertSound = new Audio('src/assets/sound/alert.wav');
const carrotPullSound = new Audio('src/assets/sound/carrot_pull.mp3');
const gameWinSound = new Audio('src/assets/sound/game_win.mp3');
const replayButton = document.querySelector('.replayButton');
const resultBanner = document.querySelector('.resultBanner');
const resultMessage = document.querySelector('.resultMessage');
const RESULT_MESSAGE = {
  WIN: 'You Win🎉',
  LOSE: 'You Lose😢',
  REPLAY: 'Replay ❓',
};
const timeLimit = 10;
let items = document.querySelector('.items');
let leftSeconds = timeLimit;
let leftCarrotCount = initialCarrotCount;
let timerIntervalId;

carrotPullSound.playbackRate = 10;
playStopButton.addEventListener('click', play);
replayButton.addEventListener('click', rePlay);
playground.addEventListener('click', (e) => {
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
  }
});

function end(result) {
  if (result !== 'WIN' && result !== 'LOSE') {
    throw new Error('the result must be either win or lose');
  }

  backgroundSound.pause();
  stopTimer(timerIntervalId);
  playStopButton.classList.remove('stop');
  playStopButton.classList.add('hide');
  resultBanner.classList.add('show');
  resultMessage.textContent = RESULT_MESSAGE[result];
  gameWinSound.play();
}

function rePlay() {
  leftCarrotCount = initialCarrotCount;
  carrot.textContent = leftCarrotCount;
  leftSeconds = timeLimit;
  timer.textContent = `0:${leftSeconds}`;

  backgroundSound.play();
  resultBanner.classList.remove('show');
  playStopButton.classList.remove('hide');
  playStopButton.classList.add('stop');
  toggleTimer(timerIntervalId);

  items.remove();
  items = document.createElement('ul');
  items.setAttribute('class', 'items');
  playground.appendChild(items);
  makeItems('carrot', initialCarrotCount, items);
  makeItems('bug', initialCarrotCount, items);
}

function play() {
  if (playStopButton.classList.contains('play')) {
    makeItems('carrot', initialCarrotCount, items);
    makeItems('bug', initialCarrotCount, items);
  }

  backgroundSound.play();
  // TODO: split the function into a couple of functions that change the button from play to stop and play the bg sound and show result banner with message
  startStopGameAndShowReplayButton();
  carrot.textContent = leftCarrotCount;
  toggleTimer(timerIntervalId);
}

function startStopGameAndShowReplayButton() {
  if (playStopButton.classList.contains('play')) {
    playStopButton.classList.remove('play');
    playStopButton.classList.add('stop');
    return;
  }

  playStopButton.classList.remove('stop');
  playStopButton.classList.add('hide');

  resultBanner.classList.add('show');
  backgroundSound.pause();
  alertSound.play();
  resultMessage.textContent = RESULT_MESSAGE['REPLAY'];
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
      // TODO: end the game when the timer is done
      if (leftSeconds === 0) {
        console.log('done!');
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
