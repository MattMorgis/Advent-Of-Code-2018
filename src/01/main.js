const fs = require("fs");

const sum = require("./sum");
const calibrate = require("./calibrate");

const fileStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    console.log({frequencySum: await sum(fileStream())});
    console.log({frequencyCalibration: await calibrate(fileStream())});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
