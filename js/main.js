let interval;

// Initialisation
const defaultColors = getActiveColors();

updateColorsStatisticsBoard(defaultColors);
updateRadiusValue(defaultRadius);

const radiusDisplay = new RadiusDisplay({ radius: defaultRadius });
const matrix = new Matrix(defaultColors, 100, defaultRadius, defaultThreshold);

// Handlers
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

// Listeners
$colors.onchange = function () {
  const colors = getActiveColors();
  updateColorsStatisticsBoard(colors);
  matrix.updateColors(colors);
  matrix.reset();
};

$next.onclick = function () {
  matrix.update();
  $colors.disabled = true;
};

$reset.onclick = function () {
  matrix.reset();
  $colors.disabled = false;
};

$start.onclick = function () {
  if (interval) {
    handleStop();
  } else {
    handleStart();
    interval = setInterval(() => {
      matrix.update();
      if (matrix.stable) {
        handleStop();
      }
    }, 100);
  }
};

$radius.onchange = function (e) {
  const radius = e.target.value;
  updateRadiusValue(radius);
  radiusDisplay.updateRadius(radius);
  matrix.updateRadius(radius);
  matrix.stable = false;
};
