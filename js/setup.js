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
