class RadiusDisplay {
  constructor({ radius, threshold, numberColors, matrix }) {
    this.recalculate({
      radius,
      threshold,
      numberColors,
      matrix,
    });
  }

  recalculate({ radius, threshold, numberColors, matrix }) {
    this.radius = radius;
    this.threshold = threshold;
    this.numberColors = numberColors;
    this.length = radius * 2 + 1;
    this.squareSize = H_100_RADIUS / this.length;
    this.neighbouringPoints = 0;
    this.expected = 1 / this.numberColors;
    this.updateThreshold = matrix.setThreshold;

    this.draw();
    this.activeSquares();
    this.calculateNumberContactPoints();
    this.updateThresholdMinimum();
    this.difficulty = this.threshold / this.neighbouringPoints;
    this.normalisedDifficulty =
      (this.difficulty - this.expected) * (1 / (1 - this.expected));
    this.updateDifficulty();
  }

  draw() {
    const LENGTH = this.length;
    const RADIUS = this.radius;
    radius_ctx.save();
    radius_ctx.clearRect(0, 0, W_100_RADIUS, H_100_RADIUS);

    for (let row = 0; row < LENGTH; row++) {
      for (let col = 0; col < LENGTH; col++) {
        if (row === RADIUS && col === RADIUS) {
          this.drawSquare(row, col, 'red');
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
        if (filterSchema(row, col, RADIUS)) continue;

        this.neighbouringPoints++;
        this.drawSquare(row + RADIUS, col + RADIUS, 'white');
      }
    }
  }

  calculateNumberContactPoints() {
    $points_of_contact.innerText = this.neighbouringPoints;
    this.updateThresholdMaximum();

    if (this.threshold > this.thresholdMaximum) {
      this.updateThreshold(this.neighbouringPoints);
    }

    if (this.threshold < this.calculateThresholdMinimum()) {
      this.updateThreshold(this.calculateThresholdMinimum());
    }
  }

  drawEmptySquare(row, col) {
    this.drawSquare(row, col);
  }

  drawSquare(row, col, color = 'black') {
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

  calculateThresholdMinimum() {
    return Math.floor(this.neighbouringPoints / this.numberColors) + 1;
  }

  updateThresholdMaximum() {
    this.thresholdMaximum = this.neighbouringPoints;
    $threshold.max = this.thresholdMaximum;
    $threshold_max.innerText = this.thresholdMaximum;
  }

  updateThresholdMinimum() {
    const min = this.calculateThresholdMinimum();
    $threshold.min = min;
    $threshold_min.innerText = min;
  }

  updateDifficulty() {
    const percentage = this.normalisedDifficulty * 100;
    $difficulty.innerText = `${percentage.toFixed(2)} %`;
  }
}
