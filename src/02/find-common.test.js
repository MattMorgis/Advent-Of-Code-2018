const assert = require("assert");

const findCommon = require("./find-common");

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

it("common id should be `fgij`", async () => {
  const stream = mockFileStream(
    "abcde\n",
    "fghij\n",
    "klmno\n",
    "pqrst\n",
    "fguij\n",
    "axcye\n",
    "wvxyz\n"
  );
  const result = await findCommon(stream);
  assert.equal(result, "fgij");
});
