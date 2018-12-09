const assert = require("assert");
const removePolarity = require("./remove-polarity");

it("aA reacts and returns 0", () => {
  const polymer = "aA";
  const result = removePolarity(polymer);
  assert.equal(result, 0);
});

it("abBA reacts and returns 0", () => {
  const polymer = "abBA";
  const result = removePolarity(polymer);
  assert.equal(result, 0);
});
