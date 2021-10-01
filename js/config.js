// Defaults
const EDIT_MODE = false;

const ACTIVE_SCHEMA = pickN([DIAGANOL_THREE], 1)[0];
console.log('Hello! I hope you enjoy my creation.');

// Default grid size
// NOTE: Do not exceed 90
const defaultGridSize = ACTIVE_SCHEMA.gridSize;

// Default radius
const defaultRadius = ACTIVE_SCHEMA.radius;

// Default threshold
const defaultThreshold = ACTIVE_SCHEMA.threshold;

// Default schema value
const defaultSchemaValue = ACTIVE_SCHEMA.schema;

// Colors
const colorSchema = getGoodColorScheme(ACTIVE_SCHEMA.colors);

// Filter functions
const GRID = () => false;
const CIRCLE = (row, col, radius) => row ** 2 + col ** 2 > radius ** 2;
const INVERTED_CIRCLE = (row, col, radius) => !CIRCLE(row, col, radius);
const CROSSHAIR = (row, col, radius) =>
  Math.abs(col) * Math.abs(row) < radius / 2;
const INVERTED_DIAMOND = (row, col, radius) =>
  Math.abs(col) + Math.abs(row) < radius + 1;
const X_PATTERN = (row, col) => Math.abs(row) !== Math.abs(col);
const CRAZY = (row, col) => Math.abs(row) ** Math.abs(col) % 2 === 0;
const ASYMETRIC = (row, col) => row % 2 === 1 || col % 2 === 1;
const TWO_QUADRANTS = (row, col) => row * col > 0;
const HOURGLASS = (row, col, radius) => Math.abs(row) < Math.abs(col);
const WEAVE = (row, col, radius) => mod(row * col, 2) == 1;
const PERIMETER = (row, col, radius) =>
  Math.abs(row) < radius && Math.abs(col) < radius;

function chooseSchema(schema) {
  switch (schema) {
    case 'asymetric':
      return ASYMETRIC;
    case 'crazy':
      return CRAZY;
    case 'inverted_circle':
      return INVERTED_CIRCLE;
    case 'inverted_diamond':
      return INVERTED_DIAMOND;
    case 'crosshair':
      return CROSSHAIR;
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
