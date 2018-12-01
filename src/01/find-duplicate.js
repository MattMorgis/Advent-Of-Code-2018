const streamToNumbers = require("./stream-to-lines");

async function generateDuplicates(stream) {
  for await (const number of streamToNumbers(stream)) {
    return number;
  }
}

const findDuplicates = async stream => {
  return generateDuplicates(stream);
};

module.exports = findDuplicates;
