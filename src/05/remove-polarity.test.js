const assert = require("assert");
const {removePolarity, bestPolarity} = require("./remove-polarity");

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

it("abAB doesn't react and returns 4", () => {
  const polymer = "abAB";
  const result = removePolarity(polymer);
  assert.equal(result, 4);
});

it("aBbC returns 2", () => {
  const polymer = "aBbC";
  const result = removePolarity(polymer);
  assert.equal(result, 2);
});

it("aabAAB returns 6", () => {
  const polymer = "aabAAB";
  const result = removePolarity(polymer);
  assert.equal(result, 6);
});

it("dabAcCaCBAcCcaDA returns 10", () => {
  const polymer = "dabAcCaCBAcCcaDA";
  const result = removePolarity(polymer);
  assert.equal(result, 10);
});

// Part 2

it("dabAcCaCBAcCcaDA returns 4", () => {
  const polymer = "dabAcCaCBAcCcaDA";
  const result = bestPolarity(polymer);
  assert.equal(result, 4);
});
