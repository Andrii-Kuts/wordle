export const WORD_LENGTH = 5;
export const GUESSES_COUNT = 6;

export type State = {
  secretWord: string;
  guesses: string[];
  currentGuess: string;
};

export type LetterState = {
  color: string;
  isEmpty: boolean;
};

const letterStates = {
  missing: {
    color: 'gray',
    isEmpty: false,
  },
  wrongPosition: {
    color: 'yellow',
    isEmpty: false,
  },
  correct: {
    color: 'green',
    isEmpty: false,
  },
  empty: {
    color: 'black',
    isEmpty: true,
  },
};

export function createState(): State {
  return { secretWord: 'dizzy', guesses: [], currentGuess: '' };
}

export function getDefaultGuessState(): LetterState[] {
  return Array.from<LetterState>({ length: WORD_LENGTH }).fill(
    letterStates.empty,
  );
}

export function getGuessState(state: State, guess: string): LetterState[] {
  const states = Array.from<LetterState>({ length: WORD_LENGTH });
  const lettersCounts = new Map<string, number>();
  state.secretWord.split('').forEach((letter) => {
    lettersCounts.set(letter, (lettersCounts.get(letter) ?? 0) + 1);
  });

  // first pass for correct symbols
  for (let position = 0; position < WORD_LENGTH; position++) {
    if (state.secretWord[position] != guess[position]) continue;
    const count = lettersCounts.get(guess[position]) ?? 0;
    lettersCounts.set(guess[position], count - 1);
    states[position] = letterStates.correct;
  }
  // second pass for missing/wrong position
  for (let position = 0; position < WORD_LENGTH; position++) {
    if (states[position] != undefined) continue;
    const count = lettersCounts.get(guess[position]) ?? 0;
    if (count == 0) states[position] = letterStates.missing;
    else {
      lettersCounts.set(guess[position], count - 1);
      states[position] = letterStates.wrongPosition;
    }
  }
  return states;
}

export function getKeyboardLetterState(
  state: State,
  letter: string,
): LetterState {
  const presentInSecretWord = state.secretWord
    .split('')
    .some((wordLetter) => wordLetter === letter);
  const presentInGuesses = state.guesses.some((guess) =>
    guess.split('').some((guessLetter) => guessLetter === letter),
  );
  const positionMatching = state.guesses.some((guess) => {
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === letter && state.secretWord[i] === letter) return true;
    }
    return false;
  });
  if (positionMatching) return letterStates.correct;
  else if (presentInSecretWord && presentInGuesses)
    return letterStates.wrongPosition;
  else if (presentInGuesses) return letterStates.missing;
  else return letterStates.empty;
}

export type StateUpdateResult =
  | {
      result: 'success';
      newState: State;
    }
  | {
      result: 'fail';
    };

export type WordleInputEvent =
  | {
      type: 'letter';
      letter: string;
    }
  | {
      type: 'erase';
    }
  | {
      type: 'submit';
    };

export const eraseEvent = (): WordleInputEvent => {
  return { type: 'erase' };
};

export const submitEvent = (): WordleInputEvent => {
  return { type: 'submit' };
};

export const letterEvent = (letter: string): WordleInputEvent => {
  return { type: 'letter', letter };
};

export function handleInputEvent(
  state: State,
  event: WordleInputEvent,
): StateUpdateResult {
  if (state == undefined) {
    console.error('State is undefined');
    return { result: 'fail' };
  }
  if (event.type === 'letter') {
    if (
      state.currentGuess.length == WORD_LENGTH ||
      state.guesses.length == GUESSES_COUNT
    )
      return { result: 'fail' };
    return {
      result: 'success',
      newState: {
        ...state,
        currentGuess: state.currentGuess + event.letter,
      },
    };
  } else if (event.type === 'erase') {
    if (state.currentGuess === '') return { result: 'fail' };
    return {
      result: 'success',
      newState: {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      },
    };
  } else if (event.type === 'submit') {
    return submitGuess(state);
  } else {
    console.error(`Unknown input event type`);
    return { result: 'fail' };
  }
}

export function submitGuess(state: State): StateUpdateResult {
  if (
    state.guesses.length == GUESSES_COUNT ||
    state.currentGuess.length != WORD_LENGTH
  )
    return { result: 'fail' };
  return {
    result: 'success',
    newState: {
      ...state,
      guesses: [...state.guesses, state.currentGuess],
      currentGuess: '',
    },
  };
}
