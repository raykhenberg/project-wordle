import React from 'react';

import {range, sample} from '../../utils';
import { WORDS } from '../../data';
import WordInput from "../WordInput";
import Guesses from "../Guesses";
import {NUM_OF_GUESSES_ALLOWED} from "../../constants";
import {checkGuess} from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function createGuess(word) {
  let statuses = checkGuess(word, answer);
  return word.split("").map((letter, index) => {
    return {
      letter,
      id: crypto.randomUUID(),
      status: statuses[index].status,
    }
  })
}

function Game() {
  const [hasWon, setHasWon] = React.useState(false);
  const [hasLost, setHasLost] = React.useState(false);
  const [guesses, setGuesses] = React.useState(range(0, NUM_OF_GUESSES_ALLOWED).map((index) => {
    return {
      word: range(0, 5).map((index) => {
        return {
          letter: undefined,
          id: crypto.randomUUID(),
          status: undefined,
        }
      }),
      isEmpty: true,
      id: crypto.randomUUID(),
    }
  }));

  function handleGuess(word) {
    const nextGuesses = [...guesses];
    const firstEmptyIndex = nextGuesses.findIndex((guess) => guess.isEmpty);
    nextGuesses[firstEmptyIndex].word = createGuess(word);
    nextGuesses[firstEmptyIndex].isEmpty = false;
    setGuesses(nextGuesses);
    if (word.toLowerCase() === answer.toLowerCase()) {
      setHasWon(true);
    } else if (nextGuesses.filter(guess => guess.isEmpty).length === 0) {
      setHasLost(true);
    }
  }
  return (
    <>
      {hasWon && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            {' '}
            <strong>{guesses.filter(guess => !guess.isEmpty).length} guesses</strong>.
          </p>
        </div>
      )}
      <Guesses guesses={guesses} />
      <WordInput hasWon={hasWon} hasLost={hasLost} handleGuess={handleGuess} />
      {hasLost && (
        <div className="sad banner">
          <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        </div>
      )}
    </>
  );
}

export default Game;
