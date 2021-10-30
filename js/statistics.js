function getIterationsKey(id) {
  return 'iterations-' + id;
}

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

function nsd(matrix) {
  const array = Object.values(matrix.stats);
  while (array.length < matrix.colors.length) {
    array.push(0);
  }

  return getStandardDeviation(array) / matrix.size ** 2;
}

function handleData(matrix) {
  console.log('MATRIX', matrix);
  const { stats } = matrix;
  console.log(stats);
  console.log('getStandardDeviation', nsd(matrix));
}
