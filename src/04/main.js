const fs = require("fs");

const {sleepyGuard, sleepyMinute} = require("./sleepy-guard");

const eventStream = () => {
  return fs.createReadStream(__dirname + "/input.txt", {
    encoding: "utf-8",
    highWaterMark: 256
  });
};

const main = async () => {
  try {
    const part1 = await sleepyGuard(eventStream());
    console.log({part1});
    const part2 = await sleepyMinute(eventStream());
    console.log({part2});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
