var radiusDisplay = document.getElementById('canvas-radius');
var radius_ctx = radiusDisplay.getContext('2d');

const W_100_RADIUS = radiusDisplay.width;
const H_100_RADIUS = radiusDisplay.height;

class RadiusDisplay {
  constructor({ radius }) {
    this.setup(radius);
  }

  updateRadius(r) {
    this.setup(r);
  }

  setup(radius) {
    this.radius = Number(radius);
    this.length = this.radius * 2 + 1;
    this.squareSize = H_100_RADIUS / this.length;
    this.neighbouringPoints = 0;
    this.draw();
    this.activeSquares();
    this.displayNumberContactPoints();
  }

  draw() {
    const LENGTH = this.length;
    const RADIUS = this.radius;
    radius_ctx.save();
    radius_ctx.clearRect(0, 0, W_100_RADIUS, H_100_RADIUS);

    for (let row = 0; row < LENGTH; row++) {
      for (let col = 0; col < LENGTH; col++) {
        if (row === RADIUS && col === RADIUS) {
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
        if (filterRadius(row, col, RADIUS)) continue;

        this.neighbouringPoints++;
        this.drawSquare(row + RADIUS, col + RADIUS, 'red');
      }
    }
  }

  displayNumberContactPoints() {
    $points_of_contact.innerText = this.neighbouringPoints;
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
