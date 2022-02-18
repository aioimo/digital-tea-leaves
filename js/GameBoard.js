function getActiveColorsFromDom() {
  return Array.from($colors.querySelectorAll('input'))
    .filter((color) => color.checked)
    .map((color) => color.name);
}

class GameBoard {
  constructor(colors, gridSize, radius, threshold) {
    this.gameId = genRanHex(6);
    this.matrix = new Matrix(colors, gridSize, radius, threshold);
    this.radiusDisplay = new RadiusDisplay({
      radius,
      threshold,
      numberColors: colors.length,
      matrix: this.matrix,
    });

    this.initialiseDomValues();
    this.draw();
    this.updateColorsStatisticsBoard();
    this.updateStatistics();
    this.updateRegions();
  }

  updateRadiusDisplay() {
    this.radiusDisplay.recalculate({
      radius: this.matrix.radius,
      threshold: this.matrix.threshold,
      numberColors: this.matrix.colors.length,
      matrix: this.matrix,
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
    const colors = getActiveColorsFromDom();
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
    this.updateRadiusDisplay();
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

  initialiseDomValues() {
    // Set radius to default
    $radius.value = this.matrix.radius;
    $radius_display_value.innerText = this.matrix.radius;

    // Set threshold to default
    $threshold.value = this.matrix.radius;
    $threshold_display_value.innerText = this.matrix.radius;

    // Set schema to default
    $schema.value = defaultSchemaValue;
    this.updateAllDomCheckboxes();
  }

  clearAllRows() {
    $tableBody.innerHTML = '';
  }

  updateColorsStatisticsBoard() {
    const colors = this.matrix.colors;
    this.clearAllRows();
    colors.forEach((color) => {
      this.createRow({ color });
    });
  }

  setColours(colors) {
    this.matrix.colors = colors;
    const newColors = this.matrix.colors;
    const schema = newColors.map((c) => ({ title: c, color: c }));

    this.updateAllDomCheckboxes(schema);

    newColors.forEach((color) => {
      const $input = document.getElementById(color);
      $input.checked = true;
    });
  }

  // Create all checkboxes
  createCheckbox({ title, color }) {
    const $div = document.createElement('div');

    const $input = document.createElement('input');
    $input.type = 'checkbox';
    $input.id = title;
    $input.name = title;
    $input.value = title;
    $input.checked = EDIT_MODE ? random(['checked', null]) : 'checked';

    const $label = document.createElement('label');
    $label.innerText = color;
    $label.for = color;

    $div.appendChild($input);
    $div.appendChild($label);

    $colors.appendChild($div);
  }

  createAllDomCheckboxes() {
    this.matrix.colors.forEach((color) => {
      this.createCheckbox({ title: color, color: color });
    });
  }

  clearAllDomCheckboxes() {
    $colors.innerHTML = '';
  }

  updateAllDomCheckboxes() {
    this.clearAllDomCheckboxes();
    this.createAllDomCheckboxes();
  }

  createRow({ color }) {
    // td "Color"
    const $col1 = document.createElement('td');

    const $coloredSquare1 = document.createElement('div');
    $coloredSquare1.classList.add('small-square');
    // $coloredSquare1.innerText = color;
    $coloredSquare1.style.color = color;
    $coloredSquare1.style.backgroundColor = color;

    $col1.appendChild($coloredSquare1);

    // td "Count"
    const $col2 = document.createElement('td');
    $col2.classList.add('hidden');
    $col2.id = colorCountId(color);

    // td "Percentage"
    const $col3 = document.createElement('td');
    $col3.id = colorPercentageId(color);

    // td "Number of regions"
    const $col4 = document.createElement('td');
    $col4.classList.add('hidden');
    $col4.id = numberRegions(color);

    // td "Delta"
    const $col5 = document.createElement('td');
    $col5.classList.add('hidden');
    $col5.id = colorChangeId(color);

    const $row = document.createElement('tr');

    $row.appendChild($col1);
    $row.appendChild($col2);
    $row.appendChild($col3);
    $row.appendChild($col4);
    $row.appendChild($col5);

    $tableBody.appendChild($row);
  }
}
