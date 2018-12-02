// Generator
// "abcdef\n+bababc\n" yields -> abcdef -> bababc
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
