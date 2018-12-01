const fs = require("fs");

const sum = require("./sum");
const findDuplicate = require("./find-duplicate");

const fileStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    console.log({sum: await sum(fileStream())});
    console.log({duplicate: await findDuplicate(fileStream())});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
