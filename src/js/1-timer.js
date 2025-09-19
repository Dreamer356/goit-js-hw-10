document.addEventListener('DOMContentLoaded', function() {
  const datetimePicker = document.getElementById('datetime-picker');
  const startBtn = document.querySelector('[data-start]');
  const daysValue = document.querySelector('[data-days]');
  const hoursValue = document.querySelector('[data-hours]');
  const minutesValue = document.querySelector('[data-minutes]');
  const secondsValue = document.querySelector('[data-seconds]');
  
  let countdownInterval = null;
  let selectedDate = null;
  const fp = flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function(selectedDates) {
      selectedDate = selectedDates[0];
      const now = new Date();
      
      if (selectedDate > now) {
        startBtn.disabled = false;
      } else {
        startBtn.disabled = true;
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'topRight'
        });
      }
    }
  });
  
  startBtn.addEventListener('click', startTimer);
  
  function startTimer() {
    if (!selectedDate) return;
    
    datetimePicker.disabled = true;
    startBtn.disabled = true;
    
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    const now = new Date();
    const timeDifference = selectedDate - now;
    
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      resetTimer();
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }
  
  function resetTimer() {
    clearInterval(countdownInterval);
    datetimePicker.disabled = false;
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    
    fp.setDate(new Date(), true);
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
});
