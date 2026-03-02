import { useState } from "react"
import Keyboard from "./Keyboard"
import LetterGrid from "./LetterGrid"
import { createState, getGuessState, getKeyboardCharacterState, type State } from "./logic"

const App: React.FC = () => {

  const [state, setState] = useState<State>();

  if (!state) { 
    return (
      <>
        <h1>Wordle</h1>
        <button onClick={() => setState(createState())}>
          Play!
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Wordle</h1>
      <LetterGrid state={state} getGuessState={(guess: string) => getGuessState(state, guess)} />
      <Keyboard getCharacterState={(character: string) => getKeyboardCharacterState(state, character)} />
    </>
  )
}

export default App
