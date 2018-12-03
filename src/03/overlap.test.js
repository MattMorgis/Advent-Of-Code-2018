const assert = require("assert");

const overlap = require("./overlap");

const mockFileStream = (...claims) => {
  const mockStream = {
    [Symbol.asyncIterator]: () => {
      return {
        next: () => ({
          done: claims.length === 0,
          value: claims.shift()
        })
      };
    }
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
