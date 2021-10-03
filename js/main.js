let interval;

// Initialisation
const defaultColors = getActiveColors();

updateColorsStatisticsBoard(defaultColors);

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

// Handlers
function handleRadiusChange(value) {
  game.setRadius(value);
}

function handleThresholdChange(value) {
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
    game.handleGameEnd();
  } else {
    game.handleStart();
    interval = setInterval(() => {
      game.nextState();
      if (game.isStable()) {
        game.handleGameEnd();
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
