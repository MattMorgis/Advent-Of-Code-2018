const streamToClaim = require("./stream-to-claims");
const {PassThrough} = require("stream");
const generateFabricMatrix = () => {
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

  const id = Number(input.substr(1, at - 2));
  const xPosition = Number(input.substr(at + 1, colon - at - 1).split(",")[0]);
  const yPosition = Number(input.substr(at + 1, colon - at - 1).split(",")[1]);
  const xLength = Number(input.substr(colon + 1).split("x")[0]);
  const yLength = Number(input.substr(colon + 1).split("x")[1]);

  return {id, xPosition, yPosition, xLength, yLength};
};

const addToFabric = (claimData, fabric) => {
  for (const i of Array(claimData.xLength).keys()) {
    for (const j of Array(claimData.yLength).keys()) {
      if (fabric[claimData.xPosition + i][claimData.yPosition + j] === "*") {
        fabric[claimData.xPosition + i][claimData.yPosition + j] = "#";
      } else if (
        fabric[claimData.xPosition + i][claimData.yPosition + j] === "#"
      ) {
        fabric[claimData.xPosition + i][claimData.yPosition + j] = "X";
      }
    }
  }

  return fabric;
};

const blocked = fabric => {
  let numberBlocked = 0;
  for (let i = 0; i < fabric.length; i++) {
    const arr = fabric[i].filter(val => val === "X");
    numberBlocked += arr.length;
  }
  return numberBlocked;
};

const overlap = async stream => {
  let fabric = generateFabricMatrix();

  for await (const claim of streamToClaim(stream)) {
    fabric = addToFabric(claimData(claim), fabric);
  }

  return blocked(fabric);
};

const unique = async stream => {
  let fabric = generateFabricMatrix();
  const cloned = stream.pipe(new PassThrough({encoding: "utf-8"}));

  for await (const claim of streamToClaim(stream)) {
    fabric = addToFabric(claimData(claim), fabric);
  }

  for await (const claim of streamToClaim(cloned)) {
    const data = claimData(claim);

    const totalLength = data.xLength * data.yLength;
    let checkUnique = 0;

    for (const i of Array(data.xLength).keys()) {
      for (const j of Array(data.yLength).keys()) {
        if (fabric[data.xPosition + i][data.yPosition + j] === "#") {
          checkUnique++;
        }
      }
    }
    if (checkUnique === totalLength) {
      return data.id;
    }
  }
};

module.exports = {overlap, unique};
