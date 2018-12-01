// Generator
// "+1\n+2\n" yields -> 1 -> 2
async function* chunksToNumbers(stream) {
  let previous = "";
  for await (const chunk of stream) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL
      const number = previous.slice(0, eolIndex);
      yield parseInt(number);
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield parseInt(previous);
  }
}

const addNumbers = async numbers => {
  let sum = 0;
  for await (const number of numbers) {
    sum += number;
  }
  return sum;
};

const sum = stream => {
  return addNumbers(chunksToNumbers(stream));
};

module.exports = sum;
