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
const $radius_display_value = document.getElementById('radius-value');
const $iterations = document.getElementById('iterations');
const $points_of_contact = document.getElementById('points-of-contact');
const $tableBody = document.getElementById('statistics');
const $schema = document.getElementById('schema');

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

function updateRadiusValue(value) {
  $radius_display_value.innerText = value;
}

function updateThresholdDisplayValue(value) {
  $threshold_display_value.innerText = value;
}

function updateThresholdMaximum(value) {
  $threshold.max = value;
  $threshold_max.innerText = value;
}

function createCheckbox({ title, color }) {
  const $div = document.createElement('div');

  const $input = document.createElement('input');
  $input.type = 'checkbox';
  $input.id = title;
  $input.name = title;
  $input.value = title;
  $input.checked = random(['checked', null]);

  const $label = document.createElement('label');
  $label.innerText = color;
  $label.for = color;

  $div.appendChild($input);
  $div.appendChild($label);

  $colors.appendChild($div);
}

function createAllCheckboxes(colors) {
  colors.forEach((color) => {
    createCheckbox(color);
  });
}

function clearAllRows() {
  $tableBody.innerHTML = '';
}

function createRow({ color }) {
  const $col1 = document.createElement('td');
  $col1.innerText = color;

  const $col2 = document.createElement('td');
  $col2.id = colorCountId(color);

  const $col3 = document.createElement('td');
  $col3.id = colorPercentageId(color);

  const $col4 = document.createElement('td');
  $col4.id = numberRegions(color);

  const $col5 = document.createElement('td');
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
  resetColours();
  colors.forEach((color) => {
    $input = document.getElementById(color);
    $input.checked = true;
  });
}

function getActiveColors() {
  return Array.from($colors.querySelectorAll('input'))
    .filter((color) => color.checked)
    .map((color) => color.name);
}

// Create all checkboxes
createAllCheckboxes(allColorOptions);

// Set radius to default
$radius.value = defaultRadius;
$radius_display_value.innerText = defaultRadius;

// Set threshold to default
$threshold.value = defaultThreshold;
$threshold_display_value.innerText = defaultThreshold;

// Set schema to default
$schema.value = defaultSchemaValue;
