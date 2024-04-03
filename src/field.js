'use strict';

export default class Field {
  //
  constructor() {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', (e) => {
      this.onClick && this.onClick(e);
    });
  }

  appendChild(child) {
    this.field.appendChild(child);
  }

  reset() {
    this.field.innerHTML = '';
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
}
