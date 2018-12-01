const streamToNumbers = require("./stream-to-lines");
const PassThrough = require("stream").PassThrough;

const findDuplicates = async stream => {
  let frequency = 0;
  const frequenciesFound = [0];

  while (true) {
    let frozenStream = stream.pipe(new PassThrough());
    for await (const number of streamToNumbers(stream)) {
      frequency += number;
      if (frequenciesFound.includes(frequency)) {
        return frequency;
      }
      frequenciesFound.push(frequency);
    }
    stream = frozenStream;
  }
};

module.exports = findDuplicates;
