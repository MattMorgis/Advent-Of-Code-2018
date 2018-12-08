const parseLine = line => {
  const dateString = line.substr(1, 10);
  const timeString = line.substr(12, 5);
  const year = Number(dateString.split("-")[0]);
  const monthIndex = Number(dateString.split("-")[1]) - 1;
  const day = Number(dateString.split("-")[2]);
  const hour = Number(timeString.split(":")[0]);
  const minute = Number(timeString.split(":")[1]);
  const action = line.substr(19);
  const date = new Date(year, monthIndex, day, hour, minute);
  return {date, action};
};

// Generator
async function* streamToEvents(stream) {
  let previous = "";
  for await (const chunk of stream) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line excludes the EOL
      const line = previous.slice(0, eolIndex);
      yield parseLine(line);
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield parseLine(previous);
  }
}

module.exports = streamToEvents;
