const rows = [
  'qwertyuiop', 
  'asdfghjkl',
  'zxcvbnm'
];

const Keyboard: React.FC = () => {
  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          {row.split('').map((character) => (
            <span key={character} style={{
              display: 'inline-block',
              margin: '0.25rem',
              border: '1px solid black',
              padding: '0.25rem',
              background: 'gray',
            }}>
              {character}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
