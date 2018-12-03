const fs = require("fs");

const {overlap, unique} = require("./overlap");

const claimStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    const part1 = await overlap(claimStream());
    console.log({part1});
    const part2 = await unique(claimStream());
    console.log({part2});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
