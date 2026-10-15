export function generateRandomBetween(min, max, exclude) {
  if (min > max) {
    throw new Error('Invalid guessing range');
  }

  if (min === max) {
    if (min === exclude) {
      throw new Error('No valid guess available');
    }
    return min;
  }

  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === exclude);

  return randomNumber;
}

