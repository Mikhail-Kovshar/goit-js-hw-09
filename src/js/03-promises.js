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
  const form = e.currentTarget;
  const firstDelay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const count = Number(form.elements.amount.value);
  // console.log(firstDelay)
  // console.log(step)
  // console.log(count)
  
  for (let i = 0; i < count; i += 1) {
    let delay = firstDelay + step * i;
    let position = i + 1;
    form.setAttribute('disabled', true)
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
  input.reset()

}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
