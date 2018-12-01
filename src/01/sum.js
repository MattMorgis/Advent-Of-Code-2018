const streamToFrequencies = require("./stream-to-frequencies");
const addNumbers = async numbers => {
  let sum = 0;
  for await (const number of numbers) {
    sum += number;
  }
  return sum;
};

const sum = stream => {
  return addNumbers(streamToFrequencies(stream));
};

module.exports = sum;
