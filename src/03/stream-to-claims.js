// Generator
// "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4" yields -> "#1 @ 1,3: 4x4" -> "#2 @ 3,1: 4x4"
async function* streamToProdctId(stream) {
  let previous = "";
  for await (const chunk of stream) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // productId excludes the EOL
      const productId = previous.slice(0, eolIndex);
      yield productId;
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

module.exports = streamToProdctId;
