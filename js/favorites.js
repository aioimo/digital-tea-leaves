const favorites = [
  {
    id: 'grid_t12_r2_c6',
    name: 'Duel',
    radius: 2,
    threshold: 0,
    schema: 'grid',
    colors: 2,
  },
  {
    id: 'test_1',
    name: 'Grid - T12 - R2 - C6',
    radius: 2,
    threshold: 12,
    schema: 'grid',
    colors: 6,
  },
  {
    id: 'test_2',
    name: 'Diaganol - T8 - R4 - C5',
    radius: 4,
    threshold: 8,
    schema: 'diaganol',
    colors: 5,
  },
];

const THREE_COLOR_SIMPLE = {
  id: 'grid_t2_r4_c3',
  schema: 'grid',
  gridSize: 125,
  radius: 2,
  threshold: 2,
  colors: 3,
};

const DUEL = {
  id: 'grid_t0_r2_c2',
  schema: 'grid',
  gridSize: 125,
  radius: 2,
  threshold: 0,
  colors: 2,
};

const DIAGANOL_FIVE = {
  id: 'diaganol_t4_r4_c5',
  schema: 'diaganol',
  gridSize: 125,
  radius: 4,
  threshold: 8,
  colors: 5,
};

// High threshold, big loose shapes
// one dominant, no extinctions
const DIAGANOL_3C_12R_25T = {
  id: 'diaganol_t8_r4_c3',
  schema: 'diaganol',
  gridSize: 125,
  radius: 12,
  threshold: 25,
  colors: 3,
};

// High threshold, intricate patterns,
// one dominant, no extinctions
const DIAGANOL_03C_08R_18T = {
  id: 'diaganol_t8_r4_c3',
  schema: 'diaganol',
  gridSize: 125,
  radius: 8,
  threshold: 18,
  colors: 3,
};
