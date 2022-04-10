import Notiflix from 'notiflix';
const input = document.querySelector('form');

input.addEventListener('submit', inputDataPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function inputDataPromise(e) {
  e.preventDefault();
  let inputDelay = Number(input.delay.value);
  let inputStep = Number(input.step.value);
  let inputPosition = Number(input.amount.value);
  for (let i = 0; i < inputPosition; i += 1) {
    let delay = inputDelay + inputStep * i;
    let position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
