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

module.exports = {calcuateGridSize};
