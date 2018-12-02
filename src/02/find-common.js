const streamToProductId = require("./stream-to-ids");

const generatePairs = array => {
  return array.reduce(
    (acc, _, i1) => [
      ...acc,
      ...new Array(array.length - 1 - i1)
        .fill(0)
        .map((_, i2) => [array[i1], array[i1 + 1 + i2]])
    ],
    []
  );
};

const hammingDistance = (stringOne, stringTwo) => {
  let distance = 0;
  let commonLetters = "";
  for (let i = 0; i < stringOne.length; i++) {
    if (stringOne[i] !== stringTwo[i]) {
      distance += 1;
    } else {
      commonLetters = commonLetters.concat(stringOne[i]);
    }
  }
  return [distance, commonLetters];
};

const findLowestPairAndRemoveDifferences = pairs => {
  let lowestDistance = Infinity;
  let lowestPair;
  pairs.forEach(pair => {
    const [distance, commonLetters] = hammingDistance(...pair);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      lowestPair = commonLetters;
    }
  });
  return lowestPair;
};

const productIds = async stream => {
  const ids = [];
  for await (const productId of streamToProductId(stream)) {
    ids.push(productId);
  }
  return ids;
};

const findCommon = async stream => {
  return findLowestPairAndRemoveDifferences(
    generatePairs(await productIds(stream))
  );
};

module.exports = findCommon;
