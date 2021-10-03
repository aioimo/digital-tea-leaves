let interval;

// Initialisation
const defaultColors = colorSchema.map((s) => s.color);

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
  game.setRadius(radius);
};

$radius.onchange = function (e) {
  const radius = e.target.value;
  game.setRadius(radius);
};

$threshold.oninput = function (e) {
  const value = e.target.value;
  game.setThreshold(value);
};

$threshold.onchange = function (e) {
  const value = e.target.value;
  game.setThreshold(value);
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
  game.setThreshold(threshold);
  game.setRadius(radius);
  game.handleSchemaChange(schema);
  game.setColors(newColors);
  game.reset();
};
