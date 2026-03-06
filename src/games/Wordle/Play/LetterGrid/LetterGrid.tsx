import classNames from 'classnames';
import {
  getDefaultGuessState,
  GUESSES_COUNT,
  WORD_LENGTH,
  type LetterState,
  type State,
} from '../logic';
import styles from './LetterGrid.module.css';

const LetterCell: React.FC<{
  letter: string;
  state: LetterState;
}> = ({ letter, state }) => {
  const className = classNames(
    styles.cell,
    state.isEmpty ? styles.cell_empty : undefined,
  );
  return (
    <span
      className={className}
      style={{
        background: `var(--${state.color})`,
      }}
    >
      {letter.toUpperCase()}
    </span>
  );
};

const LetterGrid: React.FC<{
  state: State;
  getGuessState: (guess: string) => LetterState[];
}> = ({ state, getGuessState }) => {
  return (
    <div className={styles.grid}>
      {Array.from<number>({ length: GUESSES_COUNT })
        .map((_, index) => {
          if (index < state.guesses.length) {
            const word = state.guesses[index];
            return { word, guessState: getGuessState(word) };
          }
          if (index == state.guesses.length)
            return {
              word:
                state.currentGuess +
                ' '.repeat(WORD_LENGTH - state.currentGuess.length),
              guessState: getDefaultGuessState(),
            };
          return {
            word: ' '.repeat(WORD_LENGTH),
            guessState: getDefaultGuessState(),
          };
        })
        .map(({ word, guessState }, index) => (
          <div key={index} className={styles.grid_row}>
            {word.split('').map((letter, index) => (
              <LetterCell
                letter={letter}
                key={index.toString()}
                state={guessState[index]}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default LetterGrid;
