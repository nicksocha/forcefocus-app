// Credit to Proreact on Fiverr for help writing the JS for this project. https://www.fiverr.com/proreact

let hours = 0;
let minutes = 0;
let seconds = 0;
let time;

// Resets the time to 00:00:00
function reset() {
  clearInterval(time);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById('time').innerText = `${formatTime(
    hours
  )}:${formatTime(minutes)}:${formatTime(seconds)}`;
  document.getElementById('timer').style.backgroundColor = 'var(--light-blue)';
}

// startTimer
function startTimer(type) {
  clearInterval(time);
  time = setInterval(() => {
    if (type === 'forward') {
      if (hours === -1 && minutes === 0 && seconds === 1) {
        hours++;
        seconds--;
      } else if (hours >= 0) {
        if (seconds === 59) {
          seconds = 0;
          if (minutes === 59) {
            minutes = 0;
            hours++;
          } else {
            minutes++;
          }
        } else {
          seconds++;
        }
      } else if (seconds === 0) {
        seconds = 59;
        if (minutes === 0) {
          minutes = 59;
          hours++;
        } else {
          minutes--;
        }
      } else {
        seconds--;
      }
    }

    if (type === 'backward') {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        hours--;
        seconds++;
      } else if (hours >= 0) {
        if (seconds === 0) {
          seconds = 59;
          if (minutes === 0) {
            minutes = 59;
            hours--;
          } else {
            minutes--;
          }
        } else {
          seconds--;
        }
      } else if (seconds === 59) {
        seconds = 0;
        if (minutes === 59) {
          minutes = 0;
          hours--;
        } else {
          minutes++;
        }
      } else {
        seconds++;
      }
    }

    document.getElementById('time').innerText = `${formatTime(
      hours
    )}:${formatTime(minutes)}:${formatTime(seconds)}`;

    if (hours === -1 && minutes === 0 && seconds === 1 && type === 'backward') {
      const audio = new Audio('sounds/doh.wav');
      audio.play();
    } else if (
      hours === 0 &&
      minutes === 0 &&
      seconds === 1 &&
      type === 'forward'
    ) {
      const audio = new Audio('sounds/woohoo.wav');
      audio.play();
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      document.getElementById('timer').style.backgroundColor =
        'var(--light-blue)';
    } else if (hours >= 0) {
      document.getElementById('timer').style.backgroundColor = 'var(--green)';
    } else if (hours < 0) {
      document.getElementById('timer').style.backgroundColor = 'var(--red)';
    }
  }, 1000);
}
// endTimer

// Formats time in HH:MM:SS format
function formatTime(element) {
  if (element < 10 && element >= 0) {
    return `0${element}`;
  }
  if (element < 0) {
    element++;
    if (element === 0) {
      return `-0${element}`;
    }
    if (element < 0 && element > -10) {
      return `-0${element.toString().substring(1)}`;
    }
  }
  return element;
}
