// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker')
const startBtn = document.querySelector("[data-start]")
const day = document.querySelector("[data-days]")
const hour = document.querySelector("[data-hours]")
const minute = document.querySelector("[data-minutes]")
const second = document.querySelector("[data-seconds]")

startBtn.setAttribute('disabled', true)


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if(new Date() - selectedDates[0] > 0){
            Notiflix.Notify.warning('Please choose a date in the future');
        }
        else{
            startBtn.removeAttribute('disabled', true)
            countTime = selectedDates[0]
            
        }
      console.log(selectedDates[0]);
      console.log(selectedDates[0]- new Date())
      
        }
    }
     let countTime = null;
    let timerId = null;
  flatpickr(input, options)

  startBtn.addEventListener('click', startTimer);

  
  function startTimer() {
    timerId = setInterval(() => {
        if (countTime <= new Date()) {
            stopTimer();
            return;
          }
          updateTimerFace(convertMs(countTime - new Date()));
    }, 1000);
    startBtn.setAttribute('disabled', true)
    Notiflix.Notify.success('Start timer');
    input.setAttribute('disabled', true)
  }
  
  function stopTimer() {
    Notiflix.Notify.info('Time is over', {
      timeout: 6000,
    });
    
    clearInterval(timerId);
    input.removeAttribute('disabled', true)
  }
  
//   function timerСheck() {
//     if (countTime <= new Date()) {
//       stopTimer();
//       return;
//     }
//     updateTimerInterfece(convertMs(countTime - new Date()));
//   }
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  
  function updateTimerFace({ days, hours, minutes, seconds }) {
    day.textContent = `${pad(days)}`;
    hour.textContent = `${pad(hours)}`;
    minute.textContent = `${pad(minutes)}`;
    second.textContent = `${pad(seconds)}`;
  }
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }