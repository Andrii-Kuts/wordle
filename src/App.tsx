import Keyboard from "./Keyboard"
import LetterGrid from "./LetterGrid"

const App: React.FC = () => {
  return (
    <>
      <h1>Wordle</h1>
      <LetterGrid />
      <Keyboard />
    </>
  )
}

export default App
