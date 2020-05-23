var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');
const W_100 = canvas.width;
const H_100 = canvas.height;

let interval;

$next = document.getElementById('next');
$reset = document.getElementById('reset');
$start = document.getElementById('start');
$radius = document.getElementById('radius');
$radius_value = document.getElementById('radius-value');

$radius_value.innerText = radius;

const rd = new RadiusDisplay({ radius });
const m = new Matrix(colors, 100, radius, threshold);

$next.onclick = function () {
  m.update();
};

$reset.onclick = function () {
  m.reset();
};

function handleStop() {
  clearInterval(interval);
  $start.innerText = 'START';
  $radius.disabled = false;
  interval = null;
}

function handleStart() {
  $start.innerText = 'STOP';
  $radius.disabled = true;
}

$start.onclick = function () {
  if (interval) {
    handleStop();
  } else {
    handleStart();
    interval = setInterval(() => {
      m.update();
      if (m.stable) {
        handleStop();
      }
    }, 100);
  }
};

$radius.onchange = function (e) {
  const radius = e.target.value;
  $radius_value.innerText = radius;
  rd.updateRadius(radius);
  m.updateRadius(radius);
  m.stable = false;
};
