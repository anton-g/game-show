import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { useActions, useAppState } from '../overmind'

const Wrapper = styled.div`
  display: flex;
`

const DroppableSegment = styled.div`
  height: 100%;
`

export function Creator() {
  const { segments } = useAppState()
  const { reorderSegmentQuestion, moveSegmentQuestion } = useActions()

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const sourceSegmentId = source.droppableId
    const destinationSegmentId = destination.droppableId

    if (sourceSegmentId === destinationSegmentId) {
      reorderSegmentQuestion({
        segmentId: sourceSegmentId,
        sourcePosition: source.index,
        targetPosition: destination.index,
      })
    } else {
      moveSegmentQuestion({
        fromSegmentId: sourceSegmentId,
        toSegmentId: destinationSegmentId,
        questionIndex: source.index,
        targetIndex: destination.index,
      })
    }
  }

  return (
    <Wrapper>
      <DragDropContext onDragEnd={handleDragEnd}>
        {segments.map((segment) => (
          <Droppable key={segment.id} droppableId={segment.id}>
            {(provided, snapshot) => (
              <DroppableSegment
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {segment.name}
                {segment.questions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {question.question}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DroppableSegment>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Wrapper>
  )
}
