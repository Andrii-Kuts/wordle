import classNames from 'classnames';
import {
  eraseEvent,
  letterEvent,
  submitEvent,
  type LetterState,
  type WordleInputEvent,
} from '../logic';
import styles from './Keyboard.module.css';

type SpecialKey = {
  text: string;
};

const ENTER: SpecialKey = { text: 'Enter' };
const DELETE: SpecialKey = { text: 'Delete' };

const rows: (string | SpecialKey)[][] = [
  ['qwertyuiop'],
  ['asdfghjkl'],
  [DELETE, 'zxcvbnm', ENTER],
];

const DeleteKey: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <button className={classNames(styles.key, styles.key_special)} {...props}>
      Delete
    </button>
  );
};

const EnterKey: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className={classNames(styles.key, styles.key_special)} {...props}>
      Enter
    </button>
  );
};

const LetterKey: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & {
    letter: string;
  }
> = ({ letter, ...props }) => {
  return <button {...props}>{letter.toUpperCase()}</button>;
};

const Keyboard: React.FC<{
  getLetterState: (letter: string) => LetterState;
  onKeyboardEvent: (event: WordleInputEvent) => void;
}> = ({ getLetterState, onKeyboardEvent }) => {
  return (
    <div className={styles.keyboard}>
      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          {row
            .flatMap<string | SpecialKey>((element) => {
              if (typeof element === 'string') return element.split('');
              else return [element];
            })
            .map((letter) => {
              if (letter == DELETE)
                return (
                  <DeleteKey
                    key={letter.text}
                    onClick={() => onKeyboardEvent(eraseEvent())}
                  />
                );
              else if (letter == ENTER)
                return (
                  <EnterKey
                    key={letter.text}
                    onClick={() => onKeyboardEvent(submitEvent())}
                  />
                );
              else if (typeof letter === 'string') {
                const letterState = getLetterState(letter);
                return (
                  <LetterKey
                    key={letter}
                    className={classNames(
                      styles.key,
                      styles.key_letter,
                      letterState.isEmpty
                        ? styles.key_letter_empty
                        : styles.key_letter_nonempty,
                    )}
                    letter={letter}
                    onClick={() => onKeyboardEvent(letterEvent(letter))}
                    style={{
                      background: `var(--${letterState.color})`,
                    }}
                  />
                );
              }
            })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
