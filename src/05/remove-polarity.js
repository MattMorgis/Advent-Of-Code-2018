const isUpperCase = letter => letter === letter.toUpperCase();
const isLowerCase = letter => letter === letter.toLowerCase();
const lettersAreEqual = (a, b) => a.toUpperCase() === b.toUpperCase();

const removePolarity = polymer => {
  polymer = [...polymer];

  let restart = true;

  while (restart) {
    let found = false;

    for (const [i, letter] of polymer.entries()) {
      if (i === polymer.length - 1) {
        break;
      }
      const nextLetter = polymer[i + 1];

      if (
        (isLowerCase(letter) && isUpperCase(nextLetter)) ||
        (isUpperCase(letter) && isLowerCase(nextLetter))
      ) {
        if (lettersAreEqual(letter, nextLetter)) {
          polymer.splice(i, 2);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      restart = false;
    }
  }
  return polymer.length;
};

module.exports = removePolarity;
