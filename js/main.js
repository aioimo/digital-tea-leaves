let interval;

// Initialisation
const defaultColors = getActiveColors();

updateColorsStatisticsBoard(defaultColors);
updateRadiusValue(defaultRadius);

// window.onload = () => {
//   if (EDIT_MODE) {
//      make everything visible again
//   }
// };

const matrix = new Matrix(
  defaultColors,
  defaultGridSize,
  defaultRadius,
  defaultThreshold
);
const radiusDisplay = new RadiusDisplay({ radius: defaultRadius });

// Special Effects
function handle69(n) {
  if (n === 69) {
    $hiddenSurprise.classList.remove('hidden');
    $hiddenSurprise.innerText = ';)';
  }
}

function clearAfterEffects() {
  $hiddenSurprise.classList.add('hidden');
  $hiddenSurprise.innerText = '';
}

function onAfterEffect(matrix) {
  handle69(matrix.numberIterations);
}

// Handlers
function handleStop(matrix) {
  $saveButton.classList.remove('hidden');
  $shuffle.classList.remove('hidden');
  $reset.classList.remove('hidden');
  clearInterval(interval);
  // $start.innerText = 'START';
  // $start.classList.add('start-button');
  // $start.classList.remove('red');
  $radius.disabled = false;
  $threshold.disabled = false;
  interval = null;
  onAfterEffect(matrix);
  handleData(matrix);
}

function handleStart() {
  $saveButton.classList.add('hidden');
  $shuffle.classList.add('hidden');
  // $start.innerText = 'STOP';
  // $start.classList.add('red');
  // $start.classList.remove('start-button');
  $radius.disabled = true;
  $colors.disabled = true;
  $threshold.disabled = true;
}

function download_image() {
  // Dump the canvas contents to a file.
  $canvas.toBlob(function (blob) {
    saveAs(blob, 'output.png');
  }, 'image/png');
}

function saveAs(blob, filename) {
  const url = URL.createObjectURL(blob); // Create the URL from the blob object
  const a = document.createElement('a'); // Create the anchor tag
  a.href = url; // Assign the URL string to the anchor tag's href attribute
  a.download = filename; // Name the image by assigning the anchor tag's download attribute
  document.body.appendChild(a); // Append the anchor tag to the DOM
  a.click(); // Click the anchor tag to trigger the download
  document.body.removeChild(a); // Remove the anchor tag from the DOM
  URL.revokeObjectURL(url); // Release the reference to the ObjectURL
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

function handleShuffle() {
  window.location.reload();
}

// Listeners
$shuffle.onclick = handleShuffle;

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
  $saveButton.classList.add('hidden');
  $colors.disabled = false;
  $reset.classList.add('hidden');
  $start.classList.remove('hidden');
  clearAfterEffects();
};

$schema.onchange = function (e) {
  const schema = e.target.value;
  handleSchemaChange(schema);
};

$start.onclick = function () {
  $start.classList.add('hidden');

  if (interval) {
    handleStop();
  } else {
    handleStart();
    interval = setInterval(() => {
      matrix.update();
      if (matrix.stable) {
        handleStop(matrix);
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

  const {
    colors: n,
    schema,
    threshold,
    radius,
  } = favorites.find((s) => s.id === selected);

  const newColors = pickN(allColors, n);

  setColours(newColors);
  updateColorsStatisticsBoard(newColors);
  handleThresholdChange(threshold);
  handleRadiusChange(radius);
  handleSchemaChange(schema);
  matrix.updateColors(newColors);
  matrix.reset();
};
