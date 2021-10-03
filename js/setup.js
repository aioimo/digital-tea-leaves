// Select and configure main canvas
const $canvas = document.getElementById('canvas-main');
const ctx = $canvas.getContext('2d');
const W_100 = $canvas.width;
const H_100 = $canvas.height;

// Select and configure secondary canvas
var $radiusDisplay = document.getElementById('canvas-radius');
var radius_ctx = $radiusDisplay.getContext('2d');
const W_100_RADIUS = $radiusDisplay.width;
const H_100_RADIUS = $radiusDisplay.height;

// Select other HTML elements
const $colors = document.getElementById('colors');
const $next = document.getElementById('next');
const $reset = document.getElementById('reset');
const $start = document.getElementById('start');
const $radius = document.getElementById('radius');
const $threshold = document.getElementById('threshold');
const $threshold_display_value = document.getElementById(
  'threshold_display_value'
);
const $favorites = document.getElementById('favorites');
const $threshold_max = document.getElementById('threshold_max');
const $threshold_min = document.getElementById('threshold_min');
const $radius_display_value = document.getElementById('radius-value');
const $iterations = document.getElementById('iterations');
const $points_of_contact = document.getElementById('points-of-contact');
const $tableBody = document.getElementById('statistics');
const $schema = document.getElementById('schema');
const $hiddenSurprise = document.getElementById('hidden-surprise');
const $shuffle = document.getElementById('shuffle');
const $difficulty = document.getElementById('difficulty');
const $expected = document.getElementById('expected');

function colorCountId(color) {
  return `${color}-value`;
}

function colorPercentageId(color) {
  return `${color}-percentage`;
}

function numberRegions(color) {
  return `${color}-regions`;
}

function colorChangeId(color) {
  return `${color}-change`;
}

function clearAllRows() {
  $tableBody.innerHTML = '';
}

function createRow({ color }) {
  // td "Color"
  const $col1 = document.createElement('td');

  const $coloredSquare1 = document.createElement('div');
  $coloredSquare1.classList.add('small-square');
  // $coloredSquare1.innerText = color;
  $coloredSquare1.style.color = color;
  $coloredSquare1.style.backgroundColor = color;

  $col1.appendChild($coloredSquare1);

  // td "Count"
  const $col2 = document.createElement('td');
  $col2.classList.add('hidden');
  $col2.id = colorCountId(color);

  // td "Percentage"
  const $col3 = document.createElement('td');
  $col3.id = colorPercentageId(color);

  // td "Number of regions"
  const $col4 = document.createElement('td');
  $col4.classList.add('hidden');
  $col4.id = numberRegions(color);

  // td "Delta"
  const $col5 = document.createElement('td');
  $col5.classList.add('hidden');
  $col5.id = colorChangeId(color);

  const $row = document.createElement('tr');

  $row.appendChild($col1);
  $row.appendChild($col2);
  $row.appendChild($col3);
  $row.appendChild($col4);
  $row.appendChild($col5);

  $tableBody.appendChild($row);
}

function updateColorsStatisticsBoard(colors) {
  clearAllRows();
  colors.forEach((color) => {
    createRow({ color });
  });
}

function resetColours() {
  Array.from($colors.querySelectorAll('input')).forEach(($input) => {
    $input.checked = false;
  });
}

function setColours(colors) {
  const schema = colors.map((c) => ({ title: c, color: c }));
  resetColours();
  updateAllDomCheckboxes(schema);
  colors.forEach((color) => {
    $input = document.getElementById(color);
    $input.checked = true;
  });
}

function getActiveColorsFromDom() {
  return Array.from($colors.querySelectorAll('input'))
    .filter((color) => color.checked)
    .map((color) => color.name);
}

// Set radius to default
$radius.value = defaultRadius;
$radius_display_value.innerText = defaultRadius;

// Set threshold to default
$threshold.value = defaultThreshold;
$threshold_display_value.innerText = defaultThreshold;

// Set schema to default
$schema.value = defaultSchemaValue;
