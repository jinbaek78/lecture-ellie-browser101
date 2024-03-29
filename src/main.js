const playStopButton = document.querySelector('.playControlButton');
const playground = document.querySelector('.playground');
const timer = document.querySelector('.timer');
const carrotCount = 10;
const bugCount = 10;
const backgroundSound = new Audio('src/assets/sound/bg.mp3');
const alertSound = new Audio('src/assets/sound/alert.wav');
const replayButton = document.querySelector('.replayButton');
const resultBanner = document.querySelector('.resultBanner');
const resultMessage = document.querySelector('.resultMessage');
const RESULT_MESSAGE = {
  WIN: 'You Win🎉',
  LOSE: 'You Lose😢',
  REPLAY: 'Replay ❓',
};

let items = document.querySelector('.items');
let leftSeconds = 10;
let timerIntervalId;

playStopButton.addEventListener('click', play);
replayButton.addEventListener('click', rePlay);

function rePlay() {
  backgroundSound.play();
  resultBanner.classList.remove('show');
  playStopButton.classList.remove('hide');
  playStopButton.classList.add('stop');
  toggleTimer(timerIntervalId);

  items.remove();
  items = document.createElement('ul');
  items.setAttribute('class', 'items');
  playground.appendChild(items);
  makeItems('carrot', carrotCount, items);
  makeItems('bug', carrotCount, items);
}

function play() {
  if (playStopButton.classList.contains('play')) {
    makeItems('carrot', carrotCount, items);
    makeItems('bug', carrotCount, items);
  }

  backgroundSound.play();
  startStopGameAndShowReplayButton();
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
    item.setAttribute('data-id', URL.createObjectURL(new Blob()).substr(-36));
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
