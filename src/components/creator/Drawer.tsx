import React from 'react'
import styled from 'styled-components'
import { useActions } from '../../overmind'

export const Drawer = () => {
  const { addQuestion } = useActions()

  return (
    <Wrapper>
      <h1>Drawer</h1>
      <button
        onClick={() =>
          addQuestion({
            segmentId: '1',
          })
        }
      >
        Add question
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 350px;
  right: 0;
  top: 0;
  background-color: palegoldenrod;
`
