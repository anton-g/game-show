import React from 'react'
import styled from 'styled-components/macro'
import { useActions, useState } from './overmind'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: whitesmoke;
  max-width: 400px;
  border: 1px solid hsl(0, 0%, 75%);
  border-radius: 4px;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  position: absolute;
  width: 100%;
  right: 8px;
  bottom: 8px;
`

const Heading = styled.h1`
  margin: 0;
  margin-bottom: 16px;
`

const Buttons = styled.div`
  display: flex;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`

const DevPanel = () => {
  const actions = useActions()
  const state = useState()

  return (
    <Wrapper>
      <Heading>Dev</Heading>
      <Buttons>
        <button onClick={actions.startShow}>Start show</button>
        <button onClick={actions.nextSegment}>Next segment</button>
      </Buttons>
    </Wrapper>
  )
}

export default DevPanel
