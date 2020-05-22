function mod(n, m) {
  return ((n % m) + m) % m;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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
