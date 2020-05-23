// Defaults

// Colors available to choose
const allColorOptions = [
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

// Default radius
const defaultRadius = 3;

// Default threshold
const defaultThreshold = 0;

// Filter functions
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
const INVERTED_CIRCLE = (row, col, radius) => !CIRCLE(row, col, radius);

// Default filter function
let filterSchema = CIRCLE;

function chooseSchema(schema) {
  switch (schema) {
    case 'inverted_circle':
      return INVERTED_CIRCLE;
    case 'inverted_diamond':
      return INVERTED_DIAMOND;
    case 'circle':
      return CIRCLE;
    case 'diaganol':
      return X_PATTERN;
    case 'grid':
    default:
      return GRID;
  }
}
