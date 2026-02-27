const HEIGHT = 6;

const LetterGrid: React.FC = () => {
  return (
    <div>
      {Array.from<string>({ length: HEIGHT })
        .fill("     ")
        .map((word, index) => (
          <div key={index}>
            {word.split('').map((letter, index) => (
              <span key={index} style={{
                margin: '0 0.25em'
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
