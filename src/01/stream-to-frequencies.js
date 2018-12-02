// Generator
// "+1\n+2\n" yields -> 1 -> 2
async function* streamToFrequencies(stream) {
  let previous = "";
  for await (const chunk of stream) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line excludes the EOL
      const number = previous.slice(0, eolIndex);
      yield parseInt(number);
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield parseInt(previous);
  }
}

module.exports = streamToFrequencies;
