const streamToCoordinates = require("./stream-to-coordinates");

const getCoordinates = async coordinateStream => {
  const coords = [];
  for await (const coordinate of streamToCoordinates(coordinateStream)) {
    coords.push(coordinate);
  }
  return coords;
};

const calcuateGridSize = coordinates => {
  const padding = 5;
  let largestX = 0;
  let largestY = 0;
  for (const [x, y] of coordinates) {
    if (x > largestX) largestX = x;
    if (y > largestY) largestY = y;
  }

  return [largestX + padding, largestY + padding];
};

const area = async inputStream => {
  const coordinates = await getCoordinates(inputStream);
  const [maxX, maxY] = calcuateGridSize(coordinates);

  return null;
};

module.exports = area;
