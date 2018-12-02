const streamToProductId = require("./stream-to-ids");

async function* generatePairs(batches) {
  for await (const batch of batches) {
    yield batch.reduce(
      (acc, _, i1) => [
        ...acc,
        ...new Array(batch.length - 1 - i1)
          .fill(0)
          .map((_, i2) => [batch[i1], batch[i1 + 1 + i2]])
      ],
      []
    );
  }
}

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

const findLowestPairAndRemoveDifferences = async batches => {
  let lowestDistance = Infinity;
  let lowestPair;
  for await (const pairs of batches) {
    pairs.forEach(pair => {
      const [distance, commonLetters] = hammingDistance(...pair);
      if (distance < lowestDistance) {
        lowestDistance = distance;
        lowestPair = commonLetters;
      }
    });
  }

  return lowestPair;
};

async function* getBatches(stream) {
  let batch = [];
  for await (const productId of streamToProductId(stream)) {
    batch.push(productId);
    if (batch.length === 5) {
      yield batch;
      batch = [];
    }
  }
  yield batch;
}

const findCommon = async stream => {
  return await findLowestPairAndRemoveDifferences(
    generatePairs(getBatches(stream))
  );
};

module.exports = findCommon;
