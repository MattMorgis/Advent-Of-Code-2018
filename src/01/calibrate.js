const streamToFrequencies = require("./stream-to-frequencies");
const PassThrough = require("stream").PassThrough;

const clone = stream => {
  return stream.pipe(new PassThrough());
};

const calibrate = async stream => {
  let currentFrequency = 0;
  const frequenciesFound = new Set([0]);
  let iter = 0;

  while (true) {
    // clone stream and put in cold storage
    // in case we need to re-read inputs.
    let frozenStream = clone(stream);
    iter += 1;

    for await (const frequency of streamToFrequencies(stream)) {
      process.stdout.write(`reading file ${iter} times\r`);

      currentFrequency += frequency;

      if (frequenciesFound.has(currentFrequency)) {
        return currentFrequency;
      }

      frequenciesFound.add(currentFrequency);
    }
    stream = frozenStream;
  }
};

module.exports = calibrate;
