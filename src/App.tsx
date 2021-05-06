import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Ditt å Datt</h1>
        <Link to="/creator">Build show</Link>
        <Link to="/library">Library</Link>
      </header>
    </div>
  )
}

export default App
