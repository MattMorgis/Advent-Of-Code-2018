const streamToProductId = require("./stream-to-ids");

const generatePairs = array => {
  return array.reduce(
    (acc, _, i1) => [
      ...acc,
      ...new Array(array.length - 1 - i1)
        .fill(0)
        .map((v, i2) => [array[i1], array[i1 + 1 + i2]])
    ],
    []
  );
};

const hammingDistance = (stringOne, stringTwo) => {
  let distance = 0;
  for (let i = 0; i < stringOne.length; i += 1) {
    if (stringOne[i] !== stringTwo[i]) {
      distance += 1;
    }
  }
  return distance;
};

const removeDifferentLetters = (stringOne, stringTwo) => {
  let commonLetters = "";
  for (let i = 0; i < stringOne.length; i += 1) {
    if (stringOne[i] === stringTwo[i]) {
      commonLetters = commonLetters.concat(stringOne[i]);
    }
  }
  return commonLetters;
};

const findCommon = async stream => {
  const productIds = [];
  for await (const productId of streamToProductId(stream)) {
    productIds.push(productId);
  }
  let lowestDistance = Infinity;
  let lowestPair;
  const pairs = generatePairs(productIds);
  pairs.forEach(pair => {
    const distance = hammingDistance(...pair);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      lowestPair = pair;
    }
  });
  const commonLetters = removeDifferentLetters(...lowestPair);
  return commonLetters;
};

module.exports = findCommon;
