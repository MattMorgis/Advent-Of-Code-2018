const fs = require("fs");

const sum = require("./sum");
const calibrate = require("./calibrate");

const frequencyStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    const frequencySum = await sum(frequencyStream());
    console.log({frequencySum});
    const frequencyCalibration = await calibrate(frequencyStream());
    console.log({frequencyCalibration});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
