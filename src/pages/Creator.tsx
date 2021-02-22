import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { useActions, useAppState } from '../overmind'

const Container = styled.div`
  background-color: rebeccapurple;
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`

const Segment = styled.div`
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

export function Creator() {
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
                  <Segment ref={provided.innerRef} {...provided.draggableProps}>
                    <h1 {...provided.dragHandleProps}>{segment.name}</h1>
                    <Droppable droppableId={segment.id} type="QUESTION">
                      {(provided, snapshot) => (
                        <QuestionsList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
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
                        </QuestionsList>
                      )}
                    </Droppable>
                  </Segment>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
