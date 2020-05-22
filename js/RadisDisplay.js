var radiusDisplay = document.getElementById('canvas-radius');
var radius_ctx = radiusDisplay.getContext('2d');

const W_100_RADIUS = radiusDisplay.width;
const H_100_RADIUS = radiusDisplay.height;

var LENGTH = RADIUS * 2 + 1;
var MID = (LENGTH - 1) / 2;

class RadiusDisplay {
  constructor({ radius }) {
    this.squareSize = H_100_RADIUS / LENGTH;
    this.state = emptyMatrix(LENGTH, LENGTH);
    this.radius = radius;
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
    const RADIUS = this.radius;
    for (let row = -RADIUS; row <= RADIUS; row++) {
      for (let col = -RADIUS; col <= RADIUS; col++) {
        if (row === 0 && col === 0) continue;
        // if (row % 2 === 1 && Math.abs(col % 2) === 1) continue;
        // if (row % 2 === 1 && Math.abs(col % 2) === 1) continue;
        // if (Math.abs(row) !== Math.abs(col)) continue;
        if (!(row % 3 === 0 || col % 3 === 0)) continue;

        this.drawSquare(row + RADIUS, col + RADIUS, 'red');
      }
    }
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
