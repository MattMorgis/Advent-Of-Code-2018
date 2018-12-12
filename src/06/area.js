const getCoordinates = require("./stream-to-coordinates");
const {
  calcuateGridSize,
  generateGrid,
  plotCoordinates,
  calculateMinimumDistances
} = require("./grid");

var count = (searchValue, array) =>
  array.reduce((n, val) => {
    return n + (val === searchValue);
  }, 0);

const calculateDistancesBetweenCoordinates = (grid, coordinates) => {
  // for every cell
  grid.forEach((row, x) => {
    row.forEach((column, y) => {
      // calculate the manhattan distance to every coordinate
      const minimumDistances = calculateMinimumDistances([x, y], coordinates);
      const cellShoudBeMarked =
        count(Math.min(...minimumDistances), minimumDistances) === 1;
      if (cellShoudBeMarked) {
        grid[x][y] = minimumDistances.indexOf(Math.min(...minimumDistances));
      }
    });
  });
  return grid;
};

const coordinatesThatExtendInfinitely = grid => {
  const edgeValues = new Set();
  grid.forEach((row, x) => {
    row.forEach((column, y) => {
      // console.log(y);
      if (x === 0 || x === grid.length - 1) {
        edgeValues.add(column);
      } else if (y === 0 || y === row.length) {
        edgeValues.add(column);
      }
    });
  });
  edgeValues.delete(-1);
  return edgeValues;
};

const countFiniteCoordinates = (number, grid) => {
  let count = 0;
  grid.forEach(row => {
    row.forEach(column => {
      if (column === number) count++;
    });
  });
  return count;
};

const largestArea = async inputStream => {
  const coordinates = await getCoordinates(inputStream);
  const gridSize = calcuateGridSize(coordinates);
  let grid = generateGrid(gridSize);
  grid = plotCoordinates(grid, coordinates);
  grid = calculateDistancesBetweenCoordinates(grid, coordinates);
  badCoordinates = coordinatesThatExtendInfinitely(grid);
  const finiteCoordinates = Object.keys(coordinates).filter(
    i => !badCoordinates.has(Number(i))
  );
  const finiteSpaceSizes = finiteCoordinates.map(value => {
    return countFiniteCoordinates(Number(value), grid);
  });
  return Math.max(...finiteSpaceSizes);
};

module.exports = largestArea;
