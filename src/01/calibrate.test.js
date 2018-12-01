const assert = require("assert");
const Readable = require("stream").Readable;

const calibrate = require("./calibrate");

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

it("+1 -1 reaches 0 twice", async () => {
  const stream = mockFileStream("+1\n", "-1\n");
  const result = await calibrate(stream);
  assert.equal(result, 0);
});

it("+1, -2, +3, +1, reaches 2 twice", async () => {
  const stream = mockFileStream("+1\n", "-2\n", "+3\n", "+1\n");
  const result = await calibrate(stream);
  assert.equal(result, 2);
});
