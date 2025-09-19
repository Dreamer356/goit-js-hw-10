import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('snackbar-form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.elements['delay'].value);
    const status = form.elements['status'].value;

    if (delay < 0 || isNaN(delay)) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid delay value',
        position: 'topRight',
      });
      return;
    }

    createPromise(delay, status)
      .then(value => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled in ${value}ms`,
          position: 'topRight',
        });
      })
      .catch(value => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected in ${value}ms`,
          position: 'topRight',
        });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        state === 'fulfilled' ? resolve(delay) : reject(delay);
      }, delay);
    });
  }
});
