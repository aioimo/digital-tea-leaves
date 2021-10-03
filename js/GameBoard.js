class GameBoard {
  constructor(colors, gridSize, radius, threshold) {
    this.matrix = new Matrix(colors, gridSize, radius, threshold);

    this.radiusDisplay = new RadiusDisplay({
      radius,
      threshold,
      numberColors: colors.length,
    });

    this.draw();
    this.updateStatistics();
    this.updateRegions();
  }

  updateRadiusDisplay() {
    this.radiusDisplay.recalculate({
      radius: this.matrix.radius,
      threshold: this.matrix.threshold,
      numberColors: this.matrix.colors.length,
    });
  }

  handleStart() {
    console.log($schema.value);
    $shuffle.classList.add('hidden');
    // $start.innerText = 'STOP';
    // $start.classList.add('red');
    // $start.classList.remove('start-button');
    $radius.disabled = true;
    $colors.disabled = true;
    $threshold.disabled = true;
  }

  handleColorChange() {
    const colors = getActiveColors();
    updateColorsStatisticsBoard(colors);
    this.setColors(colors);
    this.reset();
  }

  handleSchemaChange(value) {
    $schema.value = value;
    filterSchema = chooseSchema(value);
    this.matrix.stable = false;
    this.updateRadiusDisplay();
  }

  draw() {
    ctx.save();
    ctx.clearRect(0, 0, W_100, H_100);

    for (let row = 0; row < this.matrix.state.length; row++) {
      for (let col = 0; col < this.matrix.state[row].length; col++) {
        this.drawSquare(row, col);
      }
    }
    ctx.restore();
  }

  isStable() {
    return this.matrix.stable;
  }

  nextState() {
    this.matrix.nextState();
    this.draw();
    this.updateStatistics();
    this.updateRegions();
  }

  reset() {
    this.matrix.reset();
    this.draw();
    this.updateStatistics();
    this.updateRegions();
    $colors.disabled = false;
    $reset.classList.add('hidden');
    $start.classList.remove('hidden');
    this.clearAfterEffects();
  }

  setColors(colors) {
    this.matrix.setColors(colors);
  }

  setThreshold(val) {
    this.matrix.setThreshold(val);
    $threshold.value = this.matrix.threshold;
    $threshold_display_value.innerText = this.matrix.threshold;
    this.updateRadiusDisplay();
  }

  setRadius(val) {
    this.matrix.setRadius(val);
    $radius_display_value.innerText = this.matrix.radius;
    this.updateRadiusDisplay();
  }

  drawSquare(row, col) {
    const color = this.matrix.state[row][col];
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(this.matrix.squareSize * col, this.matrix.squareSize * row);
    ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.matrix.squareSize - 2 * BORDER_WIDTH,
      this.matrix.squareSize - 2 * BORDER_WIDTH
    );

    ctx.restore();
  }

  formatPercentage(n) {
    const p = n ? (n * 100) / this.matrix.size ** 2 : 0;
    return p.toFixed(2);
  }

  formatChange(prev, next) {
    if (prev) {
      return next > prev ? '↑' : '↓';
    }
    return '-';
  }

  updateStatistics() {
    const previous = this.matrix.stats;
    const results = this.matrix.countAll();

    $iterations.innerText = this.matrix.numberIterations;

    this.matrix.colors.forEach((color) => {
      const $count = document.getElementById(colorCountId(color));
      $count.innerText = results[color] || 0;

      const $percentage = document.getElementById(colorPercentageId(color));
      $percentage.innerText = this.formatPercentage(results[color]);

      const $change = document.getElementById(colorChangeId(color));
      $change.innerText = this.formatChange(previous[color], results[color]);
    });

    this.matrix.stats = results;
  }

  updateRegions() {
    if (this.matrix.size > 89) {
      return;
    }

    const results = countRegions(this.matrix.state);

    this.matrix.colors.forEach((color) => {
      const $region = document.getElementById(numberRegions(color));
      $region.innerText = results[color] || 0;
    });
  }

  handleGameEnd() {
    $shuffle.classList.remove('hidden');
    $reset.classList.remove('hidden');
    clearInterval(interval);
    $radius.disabled = false;
    $threshold.disabled = false;
    interval = null;
    this.onAfterEffect();
    handleData(this.matrix);
  }

  clearAfterEffects() {
    $hiddenSurprise.classList.add('hidden');
    $hiddenSurprise.innerText = '';
  }

  handle69() {
    const n = this.matrix.numberIterations;
    if (n === 69) {
      $hiddenSurprise.classList.remove('hidden');
      $hiddenSurprise.innerText = ';)';
    }
  }

  onAfterEffect() {
    this.handle69();
  }
}
