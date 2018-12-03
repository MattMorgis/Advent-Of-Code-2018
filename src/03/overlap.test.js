const assert = require("assert");
const Readable = require("stream").Readable;

const {overlap, unique} = require("./overlap");

const mockFileStream = (...claims) => {
  const mockStream = new Readable();
  mockStream._read = () => {
    for (const claim of claims) {
      mockStream.push(claim);
    }
    mockStream.push(null);
  };
  return mockStream;
};

it("claims overlap should equal 4", async () => {
  const stream = mockFileStream(
    "#1 @ 1,3: 4x4\n",
    "#2 @ 3,1: 4x4\n",
    "#3 @ 5,5: 2x2\n"
  );
  const result = await overlap(stream);
  assert.equal(result, 4);
});

it("unique claim should equal 3", async () => {
  const stream = mockFileStream(
    "#1 @ 1,3: 4x4\n",
    "#2 @ 3,1: 4x4\n",
    "#3 @ 5,5: 2x2\n"
  );
  const result = await unique(stream);
  assert.equal(result, 3);
});
