const button = document.querySelector('.playControlButton');

button.addEventListener('click', () => {
  togglePlayStopButton();
});

function togglePlayStopButton() {
  button.classList.toggle('play');
  button.classList.toggle('stop');
}
