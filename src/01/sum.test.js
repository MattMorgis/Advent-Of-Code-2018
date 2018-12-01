const assert = require("assert");

const sum = require("./sum");

const mockFileStream = (...numbers) => {
  const mockStream = {
    [Symbol.asyncIterator]: () => {
      return {
        next: () => ({
          done: numbers.length === 0,
          value: numbers.shift()
        })
      };
    }
  };
  return mockStream;
};

it("adds +1 +2 to equal 3", async () => {
  const stream = mockFileStream("+1\n", "+2\n");
  const result = await sum(stream);
  assert.equal(result, 3);
});

it("adds +1 -2 to equal -1", async () => {
  const stream = mockFileStream("+1\n", "-2\n");
  const result = await sum(stream);
  assert.equal(result, -1);
});

it("adds +1 -2 -3 +1 to equal -3", async () => {
  const stream = mockFileStream("+1\n", "-2\n", "-3\n", "+1\n");
  const result = await sum(stream);
  assert.equal(result, -3);
});

it("adds +2 -2 to equal 0", async () => {
  const stream = mockFileStream("+2\n", "-2\n");
  const result = await sum(stream);
  assert.equal(result, 0);
});
