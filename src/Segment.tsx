import React from 'react'
import { useOvermindState } from './overmind'

export function Segment() {
  const state = useOvermindState()

  return (
    <div>
      <h1>segment: {state.segment?.name}</h1>
    </div>
  )
}
