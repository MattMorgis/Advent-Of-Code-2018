const fs = require("fs");

const checksum = require("./checksum");

const productIdStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    const part1 = await checksum(productIdStream());
    console.log({part1});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
