const parseCoordinate = line => {
  const [x, y] = line.split(",");
  return [Number(x), Number(y)];
};
// Generator
async function* streamToCoordinates(stream) {
  let previous = "";
  for await (const chunk of stream) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line excludes the EOL
      const line = previous.slice(0, eolIndex);
      yield parseCoordinate(line);
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield parseCoordinate(previous);
  }
}

const getCoordinates = async inputStream => {
  const coordinates = [];
  const coordinateStream = streamToCoordinates(inputStream);
  for await (const coordinate of coordinateStream) {
    coordinates.push(coordinate);
  }
  return coordinates;
};

module.exports = getCoordinates;
