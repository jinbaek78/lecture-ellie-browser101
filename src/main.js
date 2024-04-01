const field = document.querySelector('.game__field');

init();

function init() {
  makeItems('carrot', 5, field);
  makeItems('bug', 5, field);
}

function makeItems(type, count, parent) {
  if (type !== 'carrot' && type !== 'bug') {
    throw new Error('type must be either carrot or bug');
  }

  for (let i = 0; i < count; i++) {
    const [top, left] = getRandomPosition();
    const img = document.createElement('img');
    img.setAttribute('src', `/img/${type}.png`);
    img.setAttribute('class', 'game__field__item');
    img.setAttribute('data-type', type);
    img.style.top = `${top}%`;
    img.style.left = `${left}%`;
    parent.appendChild(img);
  }
}

function getRandomPosition() {
  /* left: 0 - 92% */
  /* top: 0 - 67% */
  const MAX_TOP = 67;
  const MAX_LEFT = 92;
  return [
    Math.floor(Math.random() * (MAX_TOP + 1)),
    Math.floor(Math.random() * (MAX_LEFT + 1)),
  ];
}
