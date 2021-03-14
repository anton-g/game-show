import React, { useCallback } from 'react'
import styled from 'styled-components'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DraggableSegment } from '../../components/creator/DraggableSegment'
import { useActions, useAppState } from '../../overmind'
import { Drawer } from './Drawer'
import type { Question, Segment } from '../../overmind/state'

export const Board = () => {
  const { segments } = useAppState()

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <SegmentArea segment={segments[0]}></SegmentArea>
      </Wrapper>
    </DndProvider>
  )
}

function SegmentArea({ segment }: { segment: Segment }) {
  const [, drop] = useDrop(() => ({ accept: 'QUESTION' }))
  const { reorderSegmentQuestion } = useActions()

  const questions = segment.questions

  const findQuestion = useCallback(
    (id: string) => {
      const question = questions.find((q) => q.id === id)
      return {
        question,
        index: questions.findIndex((q) => q.id === id),
      }
    },
    [questions]
  )

  const moveQuestion = useCallback(
    (id: string, atIndex: number) => {
      const { question, index } = findQuestion(id)
      reorderSegmentQuestion({
        segmentId: segment.id,
        sourcePosition: index,
        targetPosition: atIndex,
      })
    },
    [findQuestion, reorderSegmentQuestion, segment]
  )

  return (
    <div ref={drop}>
      {questions.map((q) => (
        <Questions
          key={q.id}
          moveQuestion={moveQuestion}
          findQuestion={findQuestion}
          question={q}
        />
      ))}
    </div>
  )
}

function Questions({
  question,
  moveQuestion,
  findQuestion,
}: {
  question: Question
  moveQuestion: any
  findQuestion: any
}) {
  const originalIndex = findQuestion(question.id).index
  useAppState()

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'QUESTION',
      item: { id: question.id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveQuestion(droppedId, originalIndex)
        }
      },
    }),
    [question, originalIndex, moveQuestion]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'QUESTION',
      canDrop: () => false,
      hover({ id: draggedId }: any) {
        if (draggedId !== question.id) {
          const { index: overIndex } = findQuestion(question.id)
          moveQuestion(draggedId, overIndex)
        }
      },
    }),
    [question, findQuestion, moveQuestion]
  )

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: 8,
        cursor: 'move',
        backgroundColor: 'white',
        border: '1px dashed deeppink',
        opacity: isDragging ? 0 : 1,
      }}
    >
      {question.question}
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Segments = styled.div`
  background-color: rebeccapurple;
  height: 100%;
  display: inline-flex;
  overflow-x: scroll;
`

const Spacer = styled.div`
  margin-right: 350px;
`
