import React, { useState } from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useActions, useAppState } from '../../overmind'
import { DraggableQuestion } from './DraggableQuestion'

export const Drawer = () => {
  const [open, setOpen] = useState(true)
  const { unusedQuestions } = useAppState()
  const { addSegment } = useActions()

  return (
    <Wrapper open={open}>
      <button
        style={{ alignSelf: 'flex-start' }}
        onClick={() => setOpen((x) => !x)}
      >
        X
      </button>
      <h1>Drawer</h1>
      <button onClick={() => addSegment()} style={{ marginBottom: 16 }}>
        Mock segment
      </button>
      <Droppable droppableId="DRAWER" type="QUESTION">
        {(provided) => (
          <QuestionsList ref={provided.innerRef} {...provided.droppableProps}>
            {unusedQuestions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <DraggableQuestion
                    question={question}
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </QuestionsList>
        )}
      </Droppable>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ open: boolean }>`
  position: fixed;
  height: 100%;
  width: 350px;
  right: 0;
  top: 0;
  background-color: palegoldenrod;
  display: flex;
  flex-direction: column;
  align-items: center;
  // Issue with DnD when using transform, so workaround \o/
  margin-right: ${({ open }) => (open ? 0 : '-300px')};
  /* transform: translateX(${({ open }) => (open ? 0 : 90)}%); */
  transition: margin-right 0.3s ease-out;
`

const QuestionsList = styled.div`
  height: 100%;
  background-color: palegoldenrod;
  width: 300px;
  height: 100%;
  overflow-y: scroll;
`
