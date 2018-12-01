const streamToNumbers = require("./stream-to-lines");
const addNumbers = async numbers => {
  let sum = 0;
  for await (const number of numbers) {
    sum += number;
  }
  return sum;
};

const sum = stream => {
  return addNumbers(streamToNumbers(stream));
};

module.exports = sum;
