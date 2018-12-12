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

module.exports = {calcuateGridSize, generateGrid, plotCoordinates};
