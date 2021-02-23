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

type Props = {
  segment: Segment
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const DraggableSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ segment, draggableProps, dragHandleProps }, ref) => {
    return (
      <Wrapper ref={ref} {...draggableProps}>
        <Header {...dragHandleProps}>
          <Title>{segment.name}</Title>
        </Header>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background-color: royalblue;
  margin-right: 16px;
  padding: 0 8px;
`

const Header = styled.div`
  padding: 32px 8px;
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
`

const QuestionsList = styled.div`
  height: 100%;
  background-color: palevioletred;
  min-width: 150px;
  height: 100%;
  overflow-y: scroll;
`
