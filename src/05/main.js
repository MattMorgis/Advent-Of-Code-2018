const fs = require("fs").promises;
const removePolarity = require("./remove-polarity");

const main = async () => {
  try {
    const input = await fs.readFile(__dirname + "/input.txt", {
      encoding: "utf-8"
    });
    const part1 = removePolarity(input);

    console.log({part1});
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
