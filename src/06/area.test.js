const assert = require("assert");

const area = require("./area");

const mockFileStream = (...inputs) => {
  const mockStream = {
    [Symbol.asyncIterator]: () => {
      return {
        next: () => ({
          done: inputs.length === 0,
          value: inputs.shift()
        })
      };
    }
  };
  return mockStream;
};

it("largest area should equal 17", async () => {
  const stream = mockFileStream(
    "1, 1\n",
    "1, 6\n",
    "8, 3\n",
    "3, 4\n",
    "5, 5\n",
    "8, 9"
  );
  const result = await area(stream);
  assert.equal(result, 17);
});
