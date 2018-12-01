const streamToNumbers = require("./stream-to-lines");
const PassThrough = require("stream").PassThrough;

const findDuplicates = async stream => {
  let found = false;
  let frequency = 0;
  const frequenciesFound = [0];

  while (!found) {
    for await (const number of streamToNumbers(stream)) {
      frequency += number;
      if (frequenciesFound.includes(frequency)) {
        return frequency;
      }
      frequenciesFound.push(frequency);
    }
  }
};

module.exports = findDuplicates;
