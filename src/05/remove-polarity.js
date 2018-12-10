const isUpperCase = letter => letter === letter.toUpperCase();
const isLowerCase = letter => letter === letter.toLowerCase();
const lettersAreEqual = (a, b) => a.toUpperCase() === b.toUpperCase();
const last = array => array[array.length - 1];

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

  for (const letter of polymer) {
    if (doesReact(letter, last(output))) {
      output.pop();
    } else {
      output.push(letter);
    }
  }

  // minus one for the emptry string at the start
  return output.length - 1;
};

module.exports = removePolarity;
