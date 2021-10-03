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

const game = new GameBoard(
  defaultColors,
  defaultGridSize,
  defaultRadius,
  defaultThreshold
);

// const radiusDisplay = new RadiusDisplay({ radius: defaultRadius });

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

function onAfterEffect(game) {
  handle69(game.matrix.numberIterations);
}

// Handlers
function handleStop(game) {
  $shuffle.classList.remove('hidden');
  $reset.classList.remove('hidden');
  clearInterval(interval);
  $radius.disabled = false;
  $threshold.disabled = false;
  interval = null;
  onAfterEffect(game);
  handleData(game.matrix);
}

function handleStart() {
  $shuffle.classList.add('hidden');
  // $start.innerText = 'STOP';
  // $start.classList.add('red');
  // $start.classList.remove('start-button');
  $radius.disabled = true;
  $colors.disabled = true;
  $threshold.disabled = true;
}

function handleRadiusChange(value) {
  $radius.value = value;
  updateRadiusValue(value);
  // radiusDisplay.updateRadius(value);
  game.setRadius(value);
}

function handleThresholdChange(value) {
  $threshold.value = value;
  updateThresholdDisplayValue(value);
  game.setThreshold(value);
}

function handleSchemaChange(value) {
  $schema.value = value;
  filterSchema = chooseSchema(value);
  // radiusDisplay.setup();
  game.matrix.stable = false;
}

function handleShuffle() {
  window.location.reload();
}

// Listeners
$shuffle.onclick = handleShuffle;

$colors.onchange = function () {
  const colors = getActiveColors();
  updateColorsStatisticsBoard(colors);
  game.setColors(colors);
  game.reset();
};

$next.onclick = function () {
  game.nextState();
  $colors.disabled = true;
};

$reset.onclick = function () {
  game.reset();
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
      game.nextState();
      if (game.isStable()) {
        handleStop(game);
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
  game.setColors(newColors);
  game.reset();
};
