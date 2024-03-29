const button = document.querySelector('.playControlButton');
const timer = document.querySelector('.timer');
const items = document.querySelector('.items');
const carrotCount = 10;
const bugCount = 10;
let leftSeconds = 10;
let timerIntervalId;

button.addEventListener('click', () => {
  togglePlayStopButton();
  toggleTimer(timerIntervalId);
  makeItems('carrot', carrotCount, items);
  makeItems('bug', carrotCount, items);
});

function togglePlayStopButton() {
  button.classList.toggle('play');
  button.classList.toggle('stop');
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

let tempId = 0;
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
