const getCoordinates = require("./stream-to-coordinates");
const {
  calcuateGridSize,
  generateGrid,
  plotCoordinates,
  calculateMinimumDistances
} = require("./grid");

const MAGIC_NUMBER = 32;

const plotRegion = (grid, coordinates) => {
  // for every cell
  grid.forEach((row, x) => {
    row.forEach((column, y) => {
      // calculate the manhattan distance to every coordinate
      const distances = calculateMinimumDistances([x, y], coordinates);
      const total = distances.reduce((a, b) => a + b, 0);
      if (total < MAGIC_NUMBER) {
        grid[x][y] = "#";
      }
    });
  });
  return grid;
};

const countRegion = grid => {
  let count = 0;
  grid.forEach(row => {
    row.forEach(column => {
      if (column === "#") count++;
    });
  });
  return count;
};

const findRegion = async input => {
  const coordinates = await getCoordinates(input);
  const gridSize = calcuateGridSize(coordinates);
  let grid = generateGrid(gridSize);
  grid = plotCoordinates(grid, coordinates);
  grid = plotRegion(grid, coordinates);
  return countRegion(grid);
};

module.exports = findRegion;
