const fs = require("fs");

const sum = require("./sum-stream");

const main = async () => {
  try {
    const fileStream = fs.createReadStream(__dirname + "/input.txt", {
      encoding: "utf-8",
      highWaterMark: 256
    });
    console.log(await sum(fileStream));
  } catch (e) {
    console.log(e.message);
    process.exit(-1);
  }
};

main();
