// https://jsdoc.app
//Nomhle and Limpho 
/**
 * @function checkGuess
 * Checks guess for "mastermind" game against solution
 *
 * @param {string} guess - the solution to the
 * @param {string} solution - the target for the guess
 *
 * @returns {string} - an string representing the number of correct numbers
 *                     in the correct position and the number of correct
 *                     numbers in the incorrect position for the guess
 *
 * @example
 * checkGuess('1532, '1234')
 * // returns '2-1'
 * // two numbers in the correct place (1 and 3)
 * // and one correct number in the incorrect place (2)
 *
 */
function checkGuess(guess, solution) {
  let exact = 0; // correct numbers in the correct position
  let partial = 0; // correct numbers in the incorrect position

  const unmatchedGuess = [];
  const unmatchedSolution = [];

  //correct number in correct position
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      exact++;
    } else {
      unmatchedGuess.push(guess[i]);
      unmatchedSolution.push(solution[i]);
    }
  }
  // correct number in incorrect position
  unmatchedGuess.forEach((num) => {
    const index = unmatchedSolution.indexOf(num);
    if (index !== -1) {
      partial++;
      unmatchedSolution.splice(index, 1); // remove the matched number
    }
  });
  return `${exact}-${partial}`;
}

// https://jsdoc.app
/**
 * @function processInput
 * Checks guesses for "mastermind" game against solution
 *
 * @param {string} solution - the target for the guesses
 * @param {string[]} guesses - an array of strings representing guesses
 *
 * @returns {string[]} - an array of strings representing the number of
 *                       correct numbers in the correct position and the number
 *                       of correct numbers in the incorrect position for each
 *                       guess
 *
 * @example
 * // returns ['2-1', '0-1']
 * processInput('1234', ['1532', '8793'])
 *
 */
function processInput(solution, guesses) {
  return guesses.map((guess) => checkGuess(guess, solution));
}

// ----------- main program ------- //
// process arguments via destructuring
//
const [solution, guessCount, ...guesses] = process.argv.slice(2);

// (lightly) verify the input
if (guesses.length !== Number(guessCount)) {
  console.warn(
    `The number of guesses provided (${guesses.length}) does not match the guess count (${guessCount}).`
  );
  console.warn("Exiting.");
  process.exit(-1);
}

// pass the input to the processor and print the output
const output = processInput(solution, guesses);
console.log(output.join(" "));
