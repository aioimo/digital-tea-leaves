var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');
const W_100 = canvas.width;
const H_100 = canvas.height;

let interval;

$next = document.getElementById('next');
$reset = document.getElementById('reset');
$start = document.getElementById('start');

const m = new Matrix(colors, 10);

$next.onclick = function () {
  m.update();
};

$reset.onclick = function () {
  m.reset();
};

$start.onclick = function () {
  console.log('interval...', interval);
  if (interval) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval(() => {
      m.update();
      if (m.stable) {
        clearInterval(interval);
        interval = null;
      }
    }, 100);
  }
};

const rd = new RadiusDisplay();
