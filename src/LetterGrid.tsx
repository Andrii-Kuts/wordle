import { getDefaultGuessState, GUESSES_COUNT, WORD_LENGTH, type State } from "./logic"

const LetterGrid: React.FC<{
  state: State
  getGuessState: (guess: string) => string[]
}> = ({
  state,
  getGuessState,
}) => {

  console.log(state?.guesses);

  return (
    <div>
      {Array.from<number>({ length: GUESSES_COUNT })
        .map((_, index) => state.guesses[index] ?? " ".repeat(WORD_LENGTH))
        .map((word, index) => ({ word: word, guessState: index >= state.guesses.length ? getDefaultGuessState() : getGuessState(word) }))
        .map(({ word, guessState }, index) => (
          <div key={index}>
            {word.split('').map((letter, index) => (
              <span key={index} style={{
                display: 'inline-block',
                margin: '0.25em',
                padding: '0.25rem',
                background: guessState[index]
              }}>
                {letter == ' ' ? '_' : letter}
              </span>
          ))}
          </div>
        ))}
    </div>
  )
}

export default LetterGrid
