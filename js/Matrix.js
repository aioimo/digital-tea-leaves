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
  }

  nextState() {
    this.numberIterations++;
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

    this.state = nextState;
  }

  reset() {
    this.numberIterations = 0;
    this.state = randomMatrix(this.size, this.size, this.colors);
    this.stable = false;
    this.stats = {};
  }

  setRadius(r) {
    this.radius = Number(r);
    this.stable = false;
  }

  setThreshold(val) {
    this.threshold = Number(val);
    this.stable = false;
  }

  setColors(colors) {
    this.colors = colors;
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
    return winners.length === 1 ? winners[0] : null;
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
}
