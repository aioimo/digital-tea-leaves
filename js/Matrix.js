const BORDER_WIDTH = 0;

class Matrix {
  constructor(colors, size = 50, radius = 2, threshold = 0) {
    this.numberIterations = 0;
    this.colors = colors;
    this.size = size;
    this.state = randomMatrix(size, size, this.colors);
    this.squareSize = H_100 / this.state.length;
    this.radius = Number(radius);
    this.threshold = threshold;
    this.stable = false;
    this.stats = {};

    this.draw();
    this.updateStatistics();
    this.updateRegions();
  }

  reset() {
    this.numberIterations = 0;
    this.state = randomMatrix(this.size, this.size, this.colors);
    this.stable = false;
    this.stats = {};
    this.draw();
    this.updateStatistics();
    this.updateRegions();
  }

  update() {
    this.numberIterations++;
    this.nextState();
    this.draw();
    this.updateStatistics();
    this.updateRegions();
  }

  updateRadius(r) {
    this.radius = Number(r);
    matrix.stable = false;
  }

  updateThreshold(val) {
    this.threshold = Number(val);
    matrix.stable = false;
  }

  updateColors(colors) {
    this.colors = colors;
  }

  formatPercentage(n) {
    const p = n ? (n * 100) / this.size ** 2 : 0;
    return p.toFixed(2);
  }

  formatChange(prev, next) {
    if (prev) {
      return next > prev ? '↑' : '↓';
    }
    return '-';
  }

  updateRegions() {
    if (this.size > 89) {
      return;
    }

    const results = countRegions(this.state);

    this.colors.forEach((color) => {
      const $region = document.getElementById(numberRegions(color));
      $region.innerText = results[color] || 0;
    });
  }

  updateStatistics() {
    const previous = this.stats;
    const results = this.countAll();

    $iterations.innerText = this.numberIterations;

    this.colors.forEach((color) => {
      const $count = document.getElementById(colorCountId(color));
      $count.innerText = results[color] || 0;

      const $percentage = document.getElementById(colorPercentageId(color));
      $percentage.innerText = this.formatPercentage(results[color]);

      const $change = document.getElementById(colorChangeId(color));
      $change.innerText = this.formatChange(previous[color], results[color]);
    });

    this.stats = results;
  }

  draw() {
    ctx.save();
    ctx.clearRect(0, 0, W_100, H_100);

    for (let row = 0; row < this.state.length; row++) {
      for (let col = 0; col < this.state[row].length; col++) {
        this.drawSquare(row, col);
      }
    }
    ctx.restore();
  }

  drawSquare(row, col) {
    const color = this.state[row][col];
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(this.squareSize * col, this.squareSize * row);
    ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH
    );

    ctx.restore();
  }

  countAll() {
    const rows = this.state.length;
    const cols = this.state[0].length;

    const results = {};

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const value = this.state[row][col];
        if (results[value]) {
          results[value]++;
        } else {
          results[value] = 1;
        }
      }
    }
    return results;
  }

  most(results) {
    const entries = Object.entries(results);
    let threshold = this.threshold;
    let winners = [];

    entries.forEach(([state, count]) => {
      if (count > threshold) {
        threshold = count;
        winners = [state];
      } else if (count === threshold) {
        winners.push(state);
      }
    });

    return winners;
  }

  determine(winners) {
    return winners.length === 1 ? winners[0] : undefined;
  }

  neighbors(row_0, col_0) {
    const matrix = this.state;
    const l = matrix.length;
    const radius = this.radius;
    const results = {};

    for (let row = -radius; row <= radius; row++) {
      for (let col = -radius; col <= radius; col++) {
        if (filterSchema(row, col, radius)) continue;

        const value = matrix[mod(row_0 + row, l)][mod(col_0 + col, l)];
        if (results[value]) {
          results[value]++;
        } else {
          results[value] = 1;
        }
      }
    }

    return results;
  }

  nextValue(row, col) {
    return this.determine(this.most(this.neighbors(row, col)));
  }

  updateState(state) {
    this.state = state;
  }

  nextState() {
    const currentState = this.state;

    const rows = currentState.length;
    const cols = currentState[0].length;

    const nextState = emptyMatrix(rows, cols);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const r = this.nextValue(row, col);
        if (r) {
          nextState[row][col] = r;
        } else {
          nextState[row][col] = currentState[row][col];
        }
      }
    }

    if (areMatricesEqual(currentState, nextState)) {
      this.stable = true;
    }

    this.updateState(nextState);
  }
}
