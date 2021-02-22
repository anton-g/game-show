import React from 'react'
import styled from 'styled-components'
import {
  Droppable,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
import { Segment } from '../../overmind/state'
import { DraggableQuestion } from './DraggableQuestion'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`

const QuestionsList = styled.div`
  height: 100%;
  background-color: palevioletred;
  margin-right: 8px;
  min-width: 150px;
`

type Props = {
  segment: Segment
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const DraggableSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ segment, draggableProps, dragHandleProps }, ref) => {
    return (
      <Wrapper ref={ref} {...draggableProps}>
        <h1 {...dragHandleProps}>{segment.name}</h1>
        <Droppable droppableId={segment.id} type="QUESTION">
          {(provided, snapshot) => (
            <QuestionsList ref={provided.innerRef} {...provided.droppableProps}>
              {segment.questions.map((question, index) => (
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
)
