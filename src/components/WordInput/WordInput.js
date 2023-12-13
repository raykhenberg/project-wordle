import React from 'react';

function WordInput({ handleGuess, hasWon, hasLost }) {
  const [guess, setGuess] = React.useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // validate word
    if (guess.length !== 5) {
      alert("Must be a five letter word");
      return;
    }
    if (hasWon || hasLost) {
      alert(`The game is over, you ${hasWon ? "won" : "lost"}`);
      setGuess('');
      return;
    }
    console.info({ guess });
    handleGuess(guess);
    setGuess('');
  }
  return (
    <form onSubmit={handleSubmit} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        value={guess}
        id="guess-input"
        type="text"
        onChange={(event) => {
          setGuess(event.target.value.toUpperCase())}
        } />
    </form>
  );
}

export default WordInput;
