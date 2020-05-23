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
const defaultRadius = 2;

// Default threshold
const defaultThreshold = 0;

// Default schema value
const defaultSchemaValue = 'grid';

// Filter functions

const GRID = () => false;
const CIRCLE = (row, col, radius) => row ** 2 + col ** 2 > radius ** 2;
const INVERTED_CIRCLE = (row, col, radius) => !CIRCLE(row, col, radius);
const INVERTED_DIAMOND_2 = (row, col, radius) =>
  Math.abs(col) * Math.abs(row) < radius / 2;
const INVERTED_DIAMOND = (row, col, radius) =>
  Math.abs(col) + Math.abs(row) < radius + 1;
const X_PATTERN = (row, col) => Math.abs(row) !== Math.abs(col);
const CRAZY = (row, col) => Math.abs(row) ** Math.abs(col) % 2 === 0;
const S = (row, col) => row % 2 === 1 || col % 2 === 1;
const TWO_QUADRANTS = (row, col) => row * col > 0;
const HOURGLASS = (row, col, radius) => Math.abs(row) < Math.abs(col);
const WEAVE = (row, col, radius) => mod(row * col, 2) == 1;
const PERIMETER = (row, col, radius) =>
  Math.abs(row) < radius && Math.abs(col) < radius;

function chooseSchema(schema) {
  switch (schema) {
    case 's':
      return S;
    case 'crazy':
      return CRAZY;
    case 'inverted_circle':
      return INVERTED_CIRCLE;
    case 'inverted_diamond':
      return INVERTED_DIAMOND;
    case 'inverted_diamond_2':
      return INVERTED_DIAMOND_2;
    case 'circle':
      return CIRCLE;
    case 'diaganol':
      return X_PATTERN;
    case 'two_quadrants':
      return TWO_QUADRANTS;
    case 'hourglass':
      return HOURGLASS;
    case 'weave':
      return WEAVE;
    case 'perimeter':
      return PERIMETER;
    case 'grid':
    default:
      return GRID;
  }
}

// Default filter function
let filterSchema = chooseSchema(defaultSchemaValue);
