function mod(n, m) {
  return ((n % m) + m) % m;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function emptyMatrix(rows, cols) {
  let empty = [];
  for (let row = 0; row < rows; row++) {
    const rowArray = [];
    for (let col = 0; col < cols; col++) {
      rowArray.push(undefined);
    }
    empty.push(rowArray);
  }
  return empty;
}

function randomMatrix(rows, cols, vals) {
  let empty = [];
  for (let row = 0; row < rows; row++) {
    const rowArray = [];
    for (let col = 0; col < cols; col++) {
      rowArray.push(random(vals));
    }
    empty.push(rowArray);
  }
  return empty;
}

function areMatricesEqual(matrix1, matrix2) {
  try {
    for (let row = 0; row < matrix1.length; row++) {
      for (let col = 0; col < matrix1.length; col++) {
        if (matrix1[row][col] !== matrix2[row][col]) {
          return false;
        }
      }
    }
  } catch {
    return false;
  }

  return true;
}

function copyMatrix(matrix) {
  const copy = [];
  for (let i = 0; i < matrix.length; i++) {
    const row = [...matrix[i]];
    copy.push(row);
  }
  return copy;
}

function dfs(grid, row, col, val) {
  const length = grid.length;
  if (
    val == null ||
    row < 0 ||
    row > grid.length - 1 ||
    col < 0 ||
    col > grid[row].length - 1 ||
    grid[row][col] !== val
  ) {
    return 0;
  }

  grid[row][col] = null;
  dfs(grid, mod(row + 1, length), col, val);
  dfs(grid, mod(row - 1, length), col, val);
  dfs(grid, row, mod(col + 1, length), val);
  dfs(grid, row, mod(col - 1, length), val);

  return 1;
}

function countRegions(original) {
  if (original == null || original.length === 0) {
    return 0;
  }

  const grid = copyMatrix(original);

  const lengthRows = grid.length;
  const lengthCols = grid[0].length;

  let regions = {};

  for (let row = 0; row < lengthRows; row++) {
    for (let col = 0; col < lengthCols; col++) {
      const val = grid[row][col];
      if (val) {
        if (regions[val]) {
          regions[val] += dfs(grid, row, col, val);
        } else {
          regions[val] = dfs(grid, row, col, val);
        }
      }
    }
  }
  return regions;
}

/**
 * See https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
