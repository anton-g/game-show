import React, { useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions } from '../../overmind'
import type { Segment } from '../../overmind/state'
import { DraggableQuestion } from './DraggableQuestion'

type Props = {
  segment: Segment
  index: number
  move: (segmentId: string, toIndex: number) => void
}

export const DraggableSegment = ({ segment, index, move }: Props) => {
  const [, questionDropArea] = useDrop(() => ({
    accept: 'QUESTION',
    drop() {
      return {
        segmentId: segment.id,
      }
    },
  }))
  const { reorderSegmentQuestion } = useActions()

  const [{ isDragging }, segmentDragSource] = useDrag(
    () => ({
      type: 'SEGMENT',
      item: { id: segment.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id, index } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          move(id, index)
        }
      },
    }),
    [segment, index, move]
  )

  const [, segmentDropTarget] = useDrop(
    () => ({
      accept: 'SEGMENT',
      canDrop: () => false,
      hover({ id: draggedId }: any) {
        if (draggedId !== segment.id) {
          move(draggedId, index)
        }
      },
    }),
    [segment, move]
  )

  const moveQuestion = useCallback(
    (id: string, toIndex: number) => {
      console.log(`Moving question ${id} to idx ${toIndex}`)
      reorderSegmentQuestion({
        segmentId: segment.id,
        questionId: id,
        targetPosition: toIndex,
      })
    },
    [reorderSegmentQuestion, segment]
  )

  return (
    <Wrapper
      dragging={isDragging}
      ref={(node) => segmentDragSource(segmentDropTarget(node))}
    >
      <Header>
        <Title>{segment.name}</Title>
      </Header>
      <QuestionsList ref={questionDropArea}>
        {segment.questions.map((question, index) => (
          <DraggableQuestion
            key={question.id}
            question={question}
            move={moveQuestion}
            index={index}
          />
        ))}
      </QuestionsList>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  background-color: royalblue;
  margin-right: 16px;
  padding: 0 8px;
  opacity: ${(p) => (p.dragging ? 0 : 1)};
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
