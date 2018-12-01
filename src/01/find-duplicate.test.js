const assert = require("assert");
const Readable = require("stream").Readable;
const findDuplicate = require("./find-duplicate");

const mockFileStream = (...numbers) => {
  const mockStream = new Readable();
  mockStream._read = () => {
    for (const number of numbers) {
      mockStream.push(number);
    }
    mockStream.push(null);
  };
  return mockStream;
};

it("+1 -2 reaches 0 twice", async () => {
  const stream = mockFileStream("+1\n", "-1\n");
  const result = await findDuplicate(stream);
  assert.equal(result, 0);
});
