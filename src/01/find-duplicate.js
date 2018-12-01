const streamToNumbers = require("./stream-to-lines");
const PassThrough = require("stream").PassThrough;

const clone = stream => {
  return stream.pipe(new PassThrough());
};

const findDuplicates = async stream => {
  let frequency = 0;
  const frequenciesFound = new Set([0]);
  let iter = 0;

  while (true) {
    // clone stream and put in cold storage
    // in case we need to re-read inputs.
    let frozenStream = clone(stream);
    iter += 1;

    for await (const number of streamToNumbers(stream)) {
      process.stdout.write(`reading file ${iter} times\r`);

      frequency += number;

      if (frequenciesFound.has(frequency)) {
        return frequency;
      }

      frequenciesFound.add(frequency);
    }
    stream = frozenStream;
  }
};

module.exports = findDuplicates;
