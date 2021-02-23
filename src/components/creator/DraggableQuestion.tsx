import React from 'react'
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Question } from '../../overmind/state'

type Props2 = {
  question: Question
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const DraggableQuestion = React.forwardRef<HTMLDivElement, Props2>(
  ({ question, draggableProps, dragHandleProps }, ref) => {
    return (
      <Wrapper ref={ref} {...draggableProps} {...dragHandleProps}>
        {question.question}
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  background-color: paleturquoise;
  padding: 8px 16px 32px;
  margin-bottom: 8px;
`
