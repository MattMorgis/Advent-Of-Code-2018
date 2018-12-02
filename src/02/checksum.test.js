const assert = require("assert");

const checksum = require("./checksum");

const mockFileStream = (...checksums) => {
  const mockStream = {
    [Symbol.asyncIterator]: () => {
      return {
        next: () => ({
          done: checksums.length === 0,
          value: checksums.shift()
        })
      };
    }
  };
  return mockStream;
};

it("checksum should equal 12", async () => {
  const stream = mockFileStream(
    "abcdef\n",
    "bababc\n",
    "abbcde\n",
    "abcccd\n",
    "aabcdd\n",
    "abcdee\n",
    "ababab\n"
  );
  const result = await checksum(stream);
  assert.equal(result, 12);
});
