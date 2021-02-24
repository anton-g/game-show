import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { DraggableSegment } from '../../components/creator/DraggableSegment'
import { useActions, useAppState } from '../../overmind'
import { Drawer } from './Drawer'

export const Board = () => {
  const { segments } = useAppState()
  const {
    addSegmentQuestion,
    removeSegmentQuestion,
    reorderSegmentQuestion,
    moveSegmentQuestion,
    reorderSegment,
  } = useActions()

  function handleMoveSegment(result: DropResult) {
    const { source, destination } = result

    if (!destination) {
      return
    }

    reorderSegment({
      sourcePosition: source.index,
      targetPosition: destination.index,
    })
  }

  function handleMoveQuestion(result: DropResult) {
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

  function handleAddQuestion(result: DropResult) {
    const { destination, draggableId } = result

    if (!destination) {
      return
    }

    const destinationSegmentId = destination.droppableId

    addSegmentQuestion({
      segmentId: destinationSegmentId,
      questionId: draggableId,
    })
  }

  function handleRemoveQuestion(result: DropResult) {
    const { source, draggableId } = result

    if (!source) {
      return
    }

    removeSegmentQuestion({
      segmentId: source.droppableId,
      questionId: draggableId,
    })
  }

  function handleDragEnd(result: DropResult) {
    if (result.type === 'SEGMENT') {
      handleMoveSegment(result)
      return
    }

    if (result.source.droppableId === 'DRAWER') {
      handleAddQuestion(result)
      return
    }

    if (result?.destination?.droppableId === 'DRAWER') {
      handleRemoveQuestion(result)
      return
    }

    handleMoveQuestion(result)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="SEGMENT" direction="horizontal">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {segments.map((segment, index) => (
              <Draggable
                draggableId={`segment-${segment.id}`}
                index={index}
                key={segment.id}
              >
                {(provided, snapshot) => (
                  <DraggableSegment
                    segment={segment}
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Spacer />
          </Container>
        )}
      </Droppable>
      <Drawer></Drawer>
    </DragDropContext>
  )
}

const Container = styled.div`
  background-color: rebeccapurple;
  height: 100%;
  min-width: 100vw;
  display: inline-flex;
`

const Spacer = styled.div`
  margin-right: 350px;
`
