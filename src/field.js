'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    // #1. bind this value to this Field class using Function.bind
    // this.onClick = this.onClick.bind(this);

    this.field.addEventListener('click', this.onClick);
    // #2. use arrow function to bind the this value in onclick to this Field class
    // this.field.addEventListener('click', (e) => this.onClick(e));
  }

  init() {
    this.field.innerHTML = '';
    this.#addItem('carrot', this.carrotCount, 'img/carrot.png');
    this.#addItem('bug', this.bugCount, 'img/bug.png');
  }

  // #3. define class emthods intially using arrow functions to bind the 'this' value to this class
  onClick = (e) => {
    const target = e.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      console.log('onClick, this: ', this, this.onItemClick);

      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      console.log('onClick, this: ', this, this.onItemClick);

      this.onItemClick && this.onItemClick('bug');
    }
  };
  // onClick(e) {
  //   const target = e.target;
  //   if (target.matches('.carrot')) {
  //     target.remove();
  //     sound.playCarrot();
  //     console.log('onClick, this: ', this, this.onItemClick);

  //     this.onItemClick && this.onItemClick('carrot');
  //   } else if (target.matches('.bug')) {
  //     console.log('onClick, this: ', this, this.onItemClick);

  //     this.onItemClick && this.onItemClick('bug');
  //   }
  // }

  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
