let interval;

// Initialisation
const defaultColors = getActiveColors();

updateColorsStatisticsBoard(defaultColors);
updateRadiusValue(defaultRadius);

const matrix = new Matrix(
  defaultColors,
  defaultGridSize,
  defaultRadius,
  defaultThreshold
);
const radiusDisplay = new RadiusDisplay({ radius: defaultRadius });

// Handlers
function handleStop() {
  clearInterval(interval);
  $start.innerText = 'START';
  $start.classList.add('green');
  $start.classList.remove('red');
  $radius.disabled = false;
  $threshold.disabled = false;
  interval = null;
}

function handleStart() {
  $start.innerText = 'STOP';
  $start.classList.add('red');
  $start.classList.remove('green');
  $radius.disabled = true;
  $colors.disabled = true;
  $threshold.disabled = true;
}

function handleThresholdChange(value) {
  updateThresholdDisplayValue(value);
  matrix.updateThreshold(value);
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

$schema.onchange = function (e) {
  const schema = e.target.value;
  filterSchema = chooseSchema(schema);
  radiusDisplay.setup();
  matrix.stable = false;
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
    }, 75);
  }
};

$radius.onchange = function (e) {
  const radius = e.target.value;
  updateRadiusValue(radius);
  radiusDisplay.updateRadius(radius);
  matrix.updateRadius(radius);
};

$threshold.onchange = function (e) {
  const threshold = e.target.value;
  handleThresholdChange(threshold);
};
