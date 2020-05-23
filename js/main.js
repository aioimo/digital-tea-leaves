var canvas = document.getElementById('canvas-main');
var ctx = canvas.getContext('2d');
const W_100 = canvas.width;
const H_100 = canvas.height;

let interval;

const $next = document.getElementById('next');
const $reset = document.getElementById('reset');
const $start = document.getElementById('start');
const $radius = document.getElementById('radius');
const $radius_value = document.getElementById('radius-value');

function updateColorsStatisticsBoard(colors) {
  clearAllRows();
  colors.forEach((color) => {
    createRow({ color });
  });
}

function getActiveColors() {
  return Array.from($colors.querySelectorAll('input'))
    .filter((color) => color.checked)
    .map((color) => color.name);
}

// Initialisation
const defaultColors = getActiveColors();
updateColorsStatisticsBoard(defaultColors);
const rd = new RadiusDisplay({ radius: defaultRadius });
const m = new Matrix(defaultColors, 100, defaultRadius, threshold);
$radius_value.innerText = defaultRadius;

// Listeners
$colors.onchange = function () {
  const colors = getActiveColors();
  updateColorsStatisticsBoard(colors);
  m.updateColors(colors);
  m.reset();
};

$next.onclick = function () {
  m.update();
  $colors.disabled = true;
};

$reset.onclick = function () {
  m.reset();
  $colors.disabled = false;
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
  $colors.disabled = true;
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
