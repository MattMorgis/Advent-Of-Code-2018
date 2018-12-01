const assert = require("assert");

const findDuplicate = require("./find-duplicate");

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

it("+1 -2 reaches 0 twice", async () => {
  const stream = mockFileStream("+1\n", "-1\n");
  const result = await findDuplicate(stream);
  assert.equal(result, 0);
});
