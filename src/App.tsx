import React from 'react'
import { useState } from './overmind'

function App() {
  const state = useState()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ditt å Datt</h1>
        <p>{state.segment?.name}</p>
      </header>
    </div>
  )
}

export default App
