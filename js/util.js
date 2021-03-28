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
