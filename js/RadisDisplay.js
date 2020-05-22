var radiusDisplay = document.getElementById('canvas-radius');
var radius_ctx = radiusDisplay.getContext('2d');

const W_100_RADIUS = radiusDisplay.width;
const H_100_RADIUS = radiusDisplay.height;

var RADIUS = 2;
var LENGTH = RADIUS * 2 + 1;
var MID = (LENGTH - 1) / 2;

class RadiusDisplay {
  constructor() {
    this.squareSize = H_100_RADIUS / LENGTH;
    this.state = emptyMatrix(LENGTH, LENGTH);
    this.draw();
    this.activeSquares();
  }

  draw() {
    radius_ctx.save();
    radius_ctx.clearRect(0, 0, W_100_RADIUS, H_100_RADIUS);

    for (let row = 0; row < LENGTH; row++) {
      for (let col = 0; col < LENGTH; col++) {
        if (row === MID && col === MID) {
          this.drawSquare(row, col, 'lightgreen');
        } else {
          this.drawEmptySquare(row, col);
        }
      }
    }
    radius_ctx.restore();
  }

  activeSquares() {
    for (let row = -RADIUS; row <= RADIUS; row++) {
      for (let col = -RADIUS; col <= RADIUS; col++) {
        if (row === 0 && col === 0) continue;
        // if (row % 2 === 1 && Math.abs(col % 2) === 1) continue;
        if (row % 2 === 1 && Math.abs(col % 2) === 1) continue;
        // if (Math.abs(row) !== Math.abs(col)) continue;

        this.drawSquare(row + RADIUS, col + RADIUS, 'red');
      }
    }
  }

  neighbors(row, col) {
    const matrix = this.state;
    const l = matrix.length;
    const radius = this.radius;
    const results = {};

    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        // if (i === 0 && j === 0) continue;
        // if (Math.abs(i) !== Math.abs(j)) continue;
        if (i % 2 === 1 && Math.abs(j % 2) === 1) continue;
        // if (Math.abs(i) <= 1 || Math.abs(j) <= 3) continue;
        // if (i % 3 !== 0 && j % 3 !== 0) continue;

        const value = matrix[mod(row - i, l)][mod(col - j, l)];
        if (results[value]) {
          results[value]++;
        } else {
          results[value] = 1;
        }
      }
    }
    return results;
  }

  drawEmptySquare(row, col) {
    this.drawSquare(row, col);
  }

  drawSquare(row, col, color = 'lightgrey') {
    radius_ctx.save();
    radius_ctx.fillStyle = color;
    radius_ctx.translate(this.squareSize * col, this.squareSize * row);
    radius_ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH
    );

    radius_ctx.restore();
  }
}
