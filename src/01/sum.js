const streamToFrequencies = require("./stream-to-frequencies");
const addFrequencies = async frequencies => {
  let sum = 0;
  for await (const frequency of frequencies) {
    sum += frequency;
  }
  return sum;
};

const sum = stream => {
  return addFrequencies(streamToFrequencies(stream));
};

module.exports = sum;
