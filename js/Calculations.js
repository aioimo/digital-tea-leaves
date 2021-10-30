const DEFAULT_COLORS = ['a', 'b', 'c'];
const DEFAULT_GRID_SIZE = 100;
const DEFAULT_RADIUS = 8;
const DEFAULT_THRESHOLD = 18;

const sum = (arr) => arr.reduce((prev, curr) => prev + curr);

class Calculations {
  constructor(
    colors = DEFAULT_COLORS,
    gridSize = DEFAULT_GRID_SIZE,
    radius = DEFAULT_RADIUS,
    threshold = DEFAULT_THRESHOLD
  ) {
    this.matrix = new Matrix(colors, gridSize, radius, threshold);
    this.results = [];
  }

  run(n = 1) {
    for (let i = 0; i < n; i++) {
      console.log('starting trial', i + 1);
      this.matrix.runUntilStable();
      this.matrix.stats = this.matrix.countAll();
      console.log('Stats', this.matrix.stats);
      this.results.push(this.getResults());
      console.log('Results', this.getResults());
      this.matrix.reset();
      console.log('--------');
    }
  }

  getResults() {
    return {
      iterations: this.matrix.numberIterations,
      stats: this.matrix.stats,
      sd: nsd(this.matrix),
    };
  }

  getMaximumIterations() {
    const min = Math.min(...this.results.map((o) => o.iterations));
    const max = Math.max(...this.results.map((o) => o.iterations));
    const results = { min, max };
    console.log(results);
    return results;
  }

  getCumulativeAverageIterations() {
    const results =
      this.results
        .map((o) => o.iterations)
        .reduce((prev, current) => prev + current, 0) / this.results.length;

    console.log(results);
    return results;
  }

  getWinnerTookAllPercent() {
    const count = this.results.filter(
      (o) => Object.values(o.stats).filter((x) => x > 0).length === 1
    ).length;
    const avg = count / this.results.length;
    console.log('Percentage Winner Took All: ', (avg * 100).toFixed(2));
    return avg;
  }

  getWinnerTook75() {
    const count = this.results
      .map((r) => r.stats)
      .map((r) => Object.values(r))
      .filter(
        (arr) => arr.filter((n) => n / sum(arr) >= 0.75).length === 1
      ).length;

    const avg = count / this.results.length;
    console.log('Percentage Winner Took 75%: ', (avg * 100).toFixed(2));
    return avg;
  }

  getWinnerTook50() {
    const count = this.results
      .map((r) => r.stats)
      .map((r) => Object.values(r))
      .filter(
        (arr) => arr.filter((n) => n / sum(arr) >= 0.5).length === 1
      ).length;

    const avg = count / this.results.length;
    console.log('Percentage Winner Took 50%: ', (avg * 100).toFixed(2));
    return avg;
  }

  getAverageSD() {
    const s = sum(this.results.map((o) => o.sd));
    const avg = s / this.results.length;
    console.log('Average Standard Deviation: ', avg);
    return avg;
  }
}

// setTimeout(() => {
//   const stats = new Calculations();
//   stats.run(20);
//   console.log('-----Totals-----');
//   stats.getCumulativeAverageIterations();
//   stats.getMaximumIterations();
//   stats.getWinnerTookAllPercent();
//   stats.getWinnerTook75();
//   stats.getWinnerTook50();
//   stats.getAverageSD();
// }, 1);
