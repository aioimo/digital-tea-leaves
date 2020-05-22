function colorCountId(color) {
  return `${color}-value`;
}

function colorPercentageId(color) {
  return `${color}-percentage`;
}

function colorChangeId(color) {
  return `${color}-change`;
}

function createRow({ color }) {
  $col1 = document.createElement('td');
  $col1.innerText = color;

  $col2 = document.createElement('td');
  $col2.id = colorCountId(color);

  $col3 = document.createElement('td');
  $col3.id = colorPercentageId(color);

  $col4 = document.createElement('td');
  $col4.id = colorChangeId(color);

  $row = document.createElement('tr');

  $row.appendChild($col1);
  $row.appendChild($col2);
  $row.appendChild($col3);
  $row.appendChild($col4);

  $tableBody.appendChild($row);
}

const colors = ['green', 'white', 'yellow', 'purple', 'lightblue', 'black'];

$iterations = document.getElementById('iterations');
$tableBody = document.getElementById('statistics');

colors.forEach((color) => {
  createRow({ color });
});
