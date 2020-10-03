import React from 'react'
import usePresentation from './hooks/usePresentation'
import { useActions, useEffects } from './overmind'
import { MessageType } from './overmind/effects/presentation'

function App() {
  const { startConnection } = usePresentation()
  const { test } = useActions()
  const effects = useEffects()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ditt å Datt</h1>
        <button onClick={() => effects.presentation.startConnection('/')}>
          connect
        </button>
        <button
          onClick={() => {
            effects.presentation.sendMessage({
              type: MessageType.TEMP,
              payload: { foo: 'bar' },
            })
          }}
        >
          send
        </button>
      </header>
    </div>
  )
}

export default App
