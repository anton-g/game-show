import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  Droppable,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
import { Segment } from '../../overmind/state'
import { DraggableQuestion } from './DraggableQuestion'
import { useOnScreen } from '../../hooks/useOnScreen'

type Props = {
  segment: Segment
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const DraggableSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ segment, draggableProps, dragHandleProps }, ref) => {
    const ref2 = useRef<HTMLDivElement>(null!)
    const onScreen = useOnScreen(ref2, { threshold: 0.1 })
    console.log(onScreen)
    return (
      <Wrapper ref={ref} {...draggableProps}>
        <Header {...dragHandleProps} ref={ref2}>
          <Title>{segment.name}</Title>
        </Header>
        <Droppable
          droppableId={segment.id}
          type="QUESTION"
          isDropDisabled={!onScreen}
        >
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
  overflow-y: scroll;
`
