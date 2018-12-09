const assert = require("assert");
const removePolarity = require("./remove-polarity");

it("aA react and return empty string", () => {
  const polymer = "aA";
  const result = removePolarity(polymer);
  assert.equal(result, "");
});
