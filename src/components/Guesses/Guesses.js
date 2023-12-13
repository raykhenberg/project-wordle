import React from 'react';

function Guesses({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess) => {
        return (
          <p key={guess.id} className="guess">
            {guess.word.map((letter) => {
              return (
                <span key={letter.id} className={`cell ${letter.status}`}>
                  {letter.letter ?? ""}
                </span>
              );
            })}
          </p>
        )
      })}
    </div>
  );
}

export default Guesses;
