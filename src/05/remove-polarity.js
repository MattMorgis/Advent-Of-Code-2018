const isUpperCase = letter => letter === letter.toUpperCase();
const isLowerCase = letter => letter === letter.toLowerCase();
const lettersAreEqual = (a, b) => a.toUpperCase() === b.toUpperCase();
const last = array => array[array.length - 1];

const unique = array => [
  ...new Map(array.map(s => [s.toLowerCase(), s])).values()
];

const doesReact = (a, b) => {
  let reacts = false;
  if (
    (isLowerCase(a) && isUpperCase(b)) ||
    (isUpperCase(a) && isLowerCase(b))
  ) {
    if (lettersAreEqual(a, b)) {
      reacts = true;
    }
  }
  return reacts;
};

const removePolarity = polymer => {
  polymer = [...polymer];
  const output = [""];

  for (const char of polymer) {
    if (doesReact(char, last(output))) {
      output.pop();
    } else {
      output.push(char);
    }
  }

  // minus one for the emptry string at the start
  return output.length - 1;
};

const bestPolarity = polymer => {
  polymer = [...polymer];
  const uniqueLetters = unique(polymer);
  const results = uniqueLetters.map(letter => {
    const strippedPolymer = polymer.filter(c => !lettersAreEqual(c, letter));
    return removePolarity(strippedPolymer);
  });

  return Math.min.apply(null, results);
};

module.exports = {removePolarity, bestPolarity};
