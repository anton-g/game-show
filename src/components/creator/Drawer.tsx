import React from 'react'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useActions, useAppState } from '../../overmind'
import { DraggableQuestion } from './DraggableQuestion'

export const Drawer = () => {
  const { unusedQuestions } = useAppState()

  return (
    <Wrapper>
      <h1>Drawer</h1>
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

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 350px;
  right: 0;
  top: 0;
  background-color: palegoldenrod;
`

const QuestionsList = styled.div`
  height: 100%;
  background-color: palegoldenrod;
  min-width: 150px;
  height: 100%;
  overflow-y: scroll;
`
