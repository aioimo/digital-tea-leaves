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

function handleRadiusChange(value) {
  $radius.value = value;
  updateRadiusValue(value);
  radiusDisplay.updateRadius(value);
  matrix.updateRadius(value);
}

function handleThresholdChange(value) {
  $threshold.value = value;
  updateThresholdDisplayValue(value);
  matrix.updateThreshold(value);
}

function handleSchemaChange(value) {
  $schema.value = value;
  filterSchema = chooseSchema(value);
  radiusDisplay.setup();
  matrix.stable = false;
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
  handleSchemaChange(schema);
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

$radius.oninput = function (e) {
  const radius = e.target.value;
  handleRadiusChange(radius);
};

$radius.onchange = function (e) {
  const radius = e.target.value;
  handleRadiusChange(radius);
};

$threshold.oninput = function (e) {
  const threshold = e.target.value;
  handleThresholdChange(threshold);
};

$threshold.onchange = function (e) {
  const threshold = e.target.value;
  handleThresholdChange(threshold);
};

$favorites.onchange = function (e) {
  const selected = e.target.value;

  if (!selected) {
    return;
  }

  const { colors: n, schema, threshold, radius } = favorites.find(
    (s) => s.id === selected
  );

  const newColors = pickN(allColors, n);

  setColours(newColors);
  updateColorsStatisticsBoard(newColors);
  handleThresholdChange(threshold);
  handleRadiusChange(radius);
  handleSchemaChange(schema);
  matrix.updateColors(newColors);
  matrix.reset();
};
