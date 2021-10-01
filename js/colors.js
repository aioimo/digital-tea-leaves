// Colors available to choose
const allColorOptions = [
  { title: 'yellow', color: 'yellow' },
  { title: 'purple', color: 'purple' },
  { title: 'green', color: 'green' },
  { title: 'blue', color: 'blue' },
  { title: 'lightblue', color: 'lightblue' },
  { title: 'magenta', color: 'magenta' },
  { title: 'black', color: 'black' },
  { title: 'white', color: 'white' },
  { title: 'orange', color: 'orange' },
  { title: 'red', color: 'red' },
];

const allColors = allColorOptions.map((c) => c.color);
const twoColorsPlusWhite = [
  { title: 'white', color: 'white' },
  ...pickN(
    allColorOptions.filter((c) => c.color !== 'white'),
    2
  ),
];

const goodColorSchemes = {
  2: [
    [
      { title: 'white', color: 'white' },
      { title: 'black', color: 'black' },
    ],
    [
      { title: 'magenta', color: 'magenta' },
      { title: 'black', color: 'black' },
    ],
    [
      { title: 'orange', color: 'orange' },
      { title: 'white', color: 'white' },
    ],
  ],
  3: [
    // [
    //   { title: 'magenta', color: 'magenta' },
    //   { title: 'black', color: 'black' },
    //   { title: 'white', color: 'white' },
    // ],
    // [
    //   { title: 'yellow', color: 'yellow' },
    //   { title: 'orange', color: 'orange' },
    //   { title: 'white', color: 'white' },
    // ],
    [
      { title: '#EED5C2', color: '#EED5C2' }, // Champagne Pink
      { title: '#6A4C93', color: '#6A4C93' }, // Royal Purple
      { title: '#241715', color: '#241715' }, // Smoky Black
      // { title: '#14591D', color: '#14591D' }, // Lincoln Green
    ],
  ],
};

function getGoodColorScheme(n) {
  const correctSizeSchemas = goodColorSchemes[String(n)];
  return pickN(correctSizeSchemas, 1)[0];
}
