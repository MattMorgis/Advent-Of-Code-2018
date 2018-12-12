const fs = require("fs").promises;
const largestArea = require("./area");
const findRegion = require("./region");

const main = async () => {
  try {
    const input = await fs.readFile(__dirname + "/input.txt", {
      encoding: "utf-8"
    });
    const part1 = await largestArea(input);
    console.log({part1});
    const part2 = await findRegion(input);
    console.log({part2});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
