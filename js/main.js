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

function handleRadiusChange(value) {
  $radius.value = value;
  updateRadiusValue(value);
  game.setRadius(value);
}

function handleThresholdChange(value) {
  $threshold.value = value;
  updateThresholdDisplayValue(value);
  game.setThreshold(value);
}

function handleShuffle() {
  window.location.reload();
}

// Listeners
$shuffle.onclick = handleShuffle;

$colors.onchange = function () {
  game.handleColorChange();
};

$next.onclick = function () {
  game.nextState();
  $colors.disabled = true;
};

$reset.onclick = function () {
  game.reset();
};

$schema.onchange = function (e) {
  const schema = e.target.value;
  game.handleSchemaChange(schema);
};

$start.onclick = function () {
  $start.classList.add('hidden');

  if (interval) {
    handleStop();
  } else {
    game.handleStart();
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
  game.handleSchemaChange(schema);
  game.setColors(newColors);
  game.reset();
};
