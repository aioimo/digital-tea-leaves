function colorCountId(color) {
  return `${color}-value`;
}

function colorPercentageId(color) {
  return `${color}-percentage`;
}

function colorChangeId(color) {
  return `${color}-change`;
}

const $colors = document.getElementById('colors');

const colorOptions = [
  'yellow',
  'purple',
  'green',
  'blue',
  'lightblue',
  'magenta',
  'black',
  'white',
  'orange',
  'red',
];
const radius = 6;
const threshold = 0;

const S = (row, col) => row % 2 === 1 && col % 2 === 1;
const INVERTED_DIAMOND = (row, col, radius) =>
  Math.abs(col) + Math.abs(row) < radius + 1;
const X_PATTERN = (row, col) => Math.abs(row) !== Math.abs(col);

const INVERTED_DIAMOND_2 = (row, col, radius) =>
  Math.abs(col) * Math.abs(row) < radius / 2;

const CRAZY = (row, col) => Math.abs(row) ** Math.abs(col) % 2 === 0;

const WHAT_IS = (row, col) =>
  row != -radius && (row % 2 === 1 || Math.abs(col % 2) === 1);

const GRID = () => false;
const CIRCLE = (row, col, radius) => row ** 2 + col ** 2 > radius ** 2;

const filterRadius = CRAZY;

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
  $col4.id = colorChangeId(color);

  const $row = document.createElement('tr');

  $row.appendChild($col1);
  $row.appendChild($col2);
  $row.appendChild($col3);
  $row.appendChild($col4);

  $tableBody.appendChild($row);
}

function createCheckbox({ color }) {
  const $div = document.createElement('div');

  const $input = document.createElement('input');
  $input.type = 'checkbox';
  $input.id = color;
  $input.name = color;
  $input.value = color;
  $input.checked = random(['checked', null]);

  const $label = document.createElement('label');
  $label.innerText = color;
  $label.for = color;

  $div.appendChild($input);
  $div.appendChild($label);

  $colors.appendChild($div);
}

colorOptions.forEach((color) => {
  createCheckbox({ color });
});

$iterations = document.getElementById('iterations');
$points_of_contact = document.getElementById('points-of-contact');

$tableBody = document.getElementById('statistics');
