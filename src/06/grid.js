const manhattanDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const calcuateGridSize = coordinates => {
  // add some padding to the grid
  // to simulate and cut off "infinite space"
  const padding = 5;
  // grab largest coordinate to make grid a square
  let largestCoordinate = 0;
  for (const [x, y] of coordinates) {
    if (x > largestCoordinate) largestCoordinate = x;
    if (y > largestCoordinate) largestCoordinate = y;
  }
  const boundary = largestCoordinate + padding;
  return [boundary, boundary];
};

const generateGrid = size => {
  const [xBoundary, yBoundary] = size;
  const grid = [];

  for (const i of Array(xBoundary).keys()) {
    grid_columns = [];
    for (const j of Array(yBoundary).keys()) {
      grid_columns.push(-1);
    }
    grid.push(grid_columns);
  }
  return grid;
};

const plotCoordinates = (grid, coordinates) => {
  for (const [i, [x, y]] of coordinates.entries()) {
    grid[x][y] = i;
  }
  return grid;
};

const calculateMinimumDistances = ([x1, y1], coordinates) => {
  const distances = [];
  for (const [x2, y2] of coordinates) {
    const distance = manhattanDistance([x1, y1], [x2, y2]);
    distances.push(distance);
  }
  return distances;
};

module.exports = {
  calcuateGridSize,
  generateGrid,
  plotCoordinates,
  calculateMinimumDistances
};
