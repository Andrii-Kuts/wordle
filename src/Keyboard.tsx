import styles from './Keyboard.module.css'

type SpecialKey = {
  text: string
};

const ENTER: SpecialKey = { text: "Enter" };
const DELETE: SpecialKey = { text: "Delete" };

const rows: (string | SpecialKey)[][] = [
  ['qwertyuiop'], 
  ['asdfghjkl'],
  [DELETE, 'zxcvbnm', ENTER]
];

const DeleteKey: React.FC<React.HTMLAttributes<HTMLDivElement>> = (...props) => {
  return (
    <span className={styles.key} {...props}>
      Delete
    </span>
  );
}

const EnterKey: React.FC<React.HTMLAttributes<HTMLDivElement>> = (...props) => {
  return (
    <span className={styles.key} {...props}>
      Enter
    </span>
  );
}

const LetterKey: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  letter: string,
}> = ({
  letter,
  ...props
}) => {
  return (
    <span className={styles.key} {...props}>
      {letter.toUpperCase()}
    </span>
  );
}

const Keyboard: React.FC<{
  getCharacterState: (character: string) => string,
}> = ({
  getCharacterState,
}) => {
  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          {row.flatMap<string | SpecialKey>(element => {
            if(typeof element === "string")
              return element.split('');
            else
              return [element];
          })
          .map(character => {
            if(character == DELETE)
              return <DeleteKey key={character.text}/>
            else if(character == ENTER)
              return <EnterKey key={character.text}/>
            else if(typeof character === "string")
              return <LetterKey letter={character} key={character} style={{ background: getCharacterState(character) }} />
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
