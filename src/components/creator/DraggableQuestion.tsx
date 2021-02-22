import React from 'react'
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'
import { Question } from '../../overmind/state'

type Props2 = {
  question: Question
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps?: DraggableProvidedDragHandleProps
}

export const DraggableQuestion = React.forwardRef<HTMLDivElement, Props2>(
  ({ question, draggableProps, dragHandleProps }, ref) => {
    return (
      <div ref={ref} {...draggableProps} {...dragHandleProps}>
        {question.question}
      </div>
    )
  }
)
