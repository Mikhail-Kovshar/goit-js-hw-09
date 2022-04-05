const startBtn = document.querySelector("[data-start]")
const stopBtn = document.querySelector("[data-stop]")
const bodyColorEl = document.querySelector("body")


startBtn.addEventListener('click', startBtnOn)
stopBtn.addEventListener('click', stopBtnOn)
stopBtn.setAttribute('disabled', true);

function startBtnOn(){
timerId = setInterval(() => {
setColor();
}, 1000)

startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled', true);
}
function setColor() {
    bodyColorEl.style.backgroundColor = getRandomHexColor()

}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function stopBtnOn () {
      clearInterval(timerId)

      stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled', true);
  }