import { useCallback, useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import LetterGrid from './LetterGrid';
import {
  createState,
  getGuessState,
  getKeyboardLetterState,
  type State,
  handleInputEvent,
  type WordleInputEvent,
  eraseEvent,
  submitEvent,
  letterEvent,
} from './logic';

const Wordle: React.FC = () => {
  const [state, setState] = useState<State>();

  const handleKeyboardEvent = useCallback(
    (event: WordleInputEvent) => {
      if (state == undefined) {
        console.error('State is undefined');
        return;
      }
      const result = handleInputEvent(state, event);
      if (result.result === 'success') setState(result.newState);
    },
    [state],
  );

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const key = event.key;
      if (key === 'Backspace') handleKeyboardEvent(eraseEvent());
      else if (key === 'Enter') handleKeyboardEvent(submitEvent());
      else if (
        key.length == 1 &&
        ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z'))
      )
        handleKeyboardEvent(letterEvent(key.toLowerCase()));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyboardEvent]);

  if (!state) {
    return (
      <div className="app">
        <button
          className="button button_start"
          onClick={() => setState(createState())}
        >
          Play!
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <LetterGrid
        state={state}
        getGuessState={(guess: string) => getGuessState(state, guess)}
      />
      <Keyboard
        getLetterState={(letter: string) =>
          getKeyboardLetterState(state, letter)
        }
        onKeyboardEvent={handleKeyboardEvent}
      />
    </div>
  );
};

export default Wordle;
