const streamToFrequencies = require("./stream-to-frequencies");
const PassThrough = require("stream").PassThrough;

const clone = stream => {
  return stream.pipe(new PassThrough());
};

const calibrate = async stream => {
  let currentFrequency = 0;
  const frequenciesFound = new Set([0]);

  while (true) {
    // clone stream and put in cold storage
    // in case we need to re-read inputs.
    let frozenStream = clone(stream);

    let iter = 0;
    for await (const frequency of streamToFrequencies(stream)) {
      process.stdout.write(
        iter % 2 === 0 ? "calibrating... ▮\r" : "calibrating... ▯\r"
      );
      iter += 1;

      currentFrequency += frequency;

      if (frequenciesFound.has(currentFrequency)) {
        process.stdout.write("\n");
        return currentFrequency;
      }

      frequenciesFound.add(currentFrequency);
    }
    stream = frozenStream;
  }
};

module.exports = calibrate;
