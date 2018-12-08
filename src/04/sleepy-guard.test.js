const assert = require("assert");

const {sleepyGuard, sleepyMinute} = require("./sleepy-guard");

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

it("sleep guard should equal 240", async () => {
  const stream = mockFileStream(
    "[1518-11-01 00:05] falls asleep\n",
    "[1518-11-01 00:00] Guard #10 begins shift\n",
    "[1518-11-01 00:25] wakes up\n",
    "[1518-11-01 00:30] falls asleep\n",
    "[1518-11-01 00:55] wakes up\n",
    "[1518-11-02 00:40] falls asleep\n",
    "[1518-11-01 23:58] Guard #99 begins shift\n",
    "[1518-11-02 00:50] wakes up\n",
    "[1518-11-03 00:05] Guard #10 begins shift\n",
    "[1518-11-03 00:29] wakes up\n",
    "[1518-11-03 00:24] falls asleep\n",
    "[1518-11-04 00:36] falls asleep\n",
    "[1518-11-04 00:02] Guard #99 begins shift\n",
    "[1518-11-04 00:46] wakes up\n",
    "[1518-11-05 00:03] Guard #99 begins shift\n",
    "[1518-11-05 00:55] wakes up\n",
    "[1518-11-05 00:45] falls asleep\n"
  );
  const result = await sleepyGuard(stream);
  assert.equal(result, 240);
});

it("sleepy minute should equal 4455", async () => {
  const stream = mockFileStream(
    "[1518-11-01 00:05] falls asleep\n",
    "[1518-11-01 00:00] Guard #10 begins shift\n",
    "[1518-11-01 00:25] wakes up\n",
    "[1518-11-01 00:30] falls asleep\n",
    "[1518-11-01 00:55] wakes up\n",
    "[1518-11-02 00:40] falls asleep\n",
    "[1518-11-01 23:58] Guard #99 begins shift\n",
    "[1518-11-02 00:50] wakes up\n",
    "[1518-11-03 00:05] Guard #10 begins shift\n",
    "[1518-11-03 00:29] wakes up\n",
    "[1518-11-03 00:24] falls asleep\n",
    "[1518-11-04 00:36] falls asleep\n",
    "[1518-11-04 00:02] Guard #99 begins shift\n",
    "[1518-11-04 00:46] wakes up\n",
    "[1518-11-05 00:03] Guard #99 begins shift\n",
    "[1518-11-05 00:55] wakes up\n",
    "[1518-11-05 00:45] falls asleep\n"
  );
  const result = await sleepyMinute(stream);
  assert.equal(result, 4455);
});
