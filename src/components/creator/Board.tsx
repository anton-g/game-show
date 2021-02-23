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
    reorderSegmentQuestion,
    moveSegmentQuestion,
    reorderSegment,
  } = useActions()

  function handleSegmentDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) {
      return
    }

    reorderSegment({
      sourcePosition: source.index,
      targetPosition: destination.index,
    })
  }

  function handleQuestionDragEnd(result: DropResult) {
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

  function handleDragEnd(result: DropResult) {
    if (result.type === 'SEGMENT') {
      handleSegmentDragEnd(result)
    } else {
      handleQuestionDragEnd(result)
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="SEGMENT" direction="horizontal">
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {segments.map((segment, index) => (
                <Draggable
                  draggableId={segment.id}
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
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      <Drawer></Drawer>
    </>
  )
}

const Container = styled.div`
  background-color: rebeccapurple;
  height: 100%;
  min-width: 100vw;
  display: inline-flex;
`
