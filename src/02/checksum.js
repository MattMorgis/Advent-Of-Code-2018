const streamToProductId = require("./stream-to-ids");

// ['b', 'a', 'b', 'a', 'b', 'c'] returns Map {3 => 'b', 2 => 'a', 1 => 'c}
const count = array => {
  return new Map(
    [...new Set(array)].map(x => [array.filter(y => y === x).length, x])
  );
};

const checksum = async stream => {
  let idsWith2MatchingLetters = 0;
  let idsWith3MatchingLetters = 0;
  for await (const productId of streamToProductId(stream)) {
    const valueCounts = count([...productId]);
    if (valueCounts.has(2)) {
      idsWith2MatchingLetters++;
    }
    if (valueCounts.has(3)) {
      idsWith3MatchingLetters++;
    }
  }
  return idsWith2MatchingLetters * idsWith3MatchingLetters;
};

module.exports = checksum;
