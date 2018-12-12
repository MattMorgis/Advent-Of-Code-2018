const streamToCoordinates = require("./stream-to-coordinates");

const manhattanDistance = ([x1, y1], [x2, y2]) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

var count = (searchValue, array) =>
  array.reduce((n, val) => {
    return n + (val === searchValue);
  }, 0);
const getCoordinates = async inputStream => {
  const coordinates = [];
  const coordinateStream = streamToCoordinates(inputStream);
  for await (const coordinate of coordinateStream) {
    coordinates.push(coordinate);
  }
  return coordinates;
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
  console.log(grid);
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
  const counts = finiteCoordinates.map(value => {
    return countFiniteCoordinates(Number(value), grid);
  });
  return Math.max(...counts);
};

module.exports = largestArea;
