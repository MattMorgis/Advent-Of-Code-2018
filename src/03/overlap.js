const streamToClaim = require("./stream-to-claims");

const generateFabric = () => {
  const fabric = [];

  for (const i of Array(1000).keys()) {
    fabric_columns = [];
    for (const j of Array(1000).keys()) {
      fabric_columns.push("*");
    }
    fabric.push(fabric_columns);
  }
  return fabric;
};

const claimData = input => {
  claimChars = [...input];

  const at = claimChars.indexOf("@");
  const colon = claimChars.indexOf(":");

  const coords = input.substr(at + 1, colon - at - 1);
  const lengths = input.substr(colon + 1);

  const xPos = Number(coords.split(",")[0]);
  const yPos = Number(coords.split(",")[1]);
  const xLength = Number(lengths.split("x")[0]);
  const yLength = Number(lengths.split("x")[1]);
  return {xPos, yPos, xLength, yLength};
};

const overlap = async stream => {
  const fabric = generateFabric();
  let numberBlocked = 0;

  for await (const claim of streamToClaim(stream)) {
    const data = claimData(claim);
    for (const i of Array(data.xLength).keys()) {
      for (const j of Array(data.yLength).keys()) {
        if (fabric[data.xPos + i][data.yPos + j] === "*") {
          fabric[data.xPos + i][data.yPos + j] = "#";
        } else if (fabric[data.xPos + i][data.yPos + j] === "#") {
          fabric[data.xPos + i][data.yPos + j] = "X";
          numberBlocked++;
        }
      }
    }
  }

  return numberBlocked;
};

module.exports = overlap;
