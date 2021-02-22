import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ditt å Datt</h1>
        <Link to="/creator">Show creator</Link>
      </header>
    </div>
  )
}

export default App
