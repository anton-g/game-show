import { useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Segment } from '../../../overmind/state'
import { BoardQuestion } from '../BoardQuestion/BoardQuestion'
import { useQuestionDrop } from '../useQuestionDrop'
import { SegmentOptions } from './SegmentOptions'

type Props = {
  segment: Segment
  index: number
  move: (segmentId: string, toIndex: number) => void
}

export const BoardSegment = ({ segment, index, move }: Props) => {
  useAppState()
  const {
    reorderSegmentQuestion,
    moveSegmentQuestion,
    getQuestionSegment,
    addSegmentQuestion,
    removeSegment,
  } = useActions()
  const questionDropArea = useQuestionDrop(segment.id, {
    hover({ id: draggedId }) {
      const draggedFromSegment = getQuestionSegment(draggedId)
      if (!draggedFromSegment) {
        addSegmentQuestion({
          segmentId: segment.id,
          questionId: draggedId,
        })
        return
      }

      if (segment.id === draggedFromSegment.id) {
        return
      }

      moveQuestion(
        draggedId,
        draggedFromSegment.id,
        segment.id,
        segment.questions.length
      )
    },
  })

  const [{ isDragging }, segmentDragSource, preview] = useDrag(
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
    (
      id: string,
      fromSegmentId: string | null,
      toSegmentId: string | null,
      toIndex?: number
    ) =>
      moveSegmentQuestion({
        fromSegmentId: fromSegmentId,
        toSegmentId: toSegmentId,
        questionId: id,
        toIndex,
      }),
    [moveSegmentQuestion]
  )

  const reorderQuestion = useCallback(
    (id: string, segmentId: string, toIndex: number) =>
      reorderSegmentQuestion({
        segmentId: segmentId,
        questionId: id,
        targetPosition: toIndex,
      }),
    [reorderSegmentQuestion]
  )

  return (
    <Wrapper
      dragging={isDragging}
      ref={(node) => preview(segmentDropTarget(node))}
    >
      <Header ref={segmentDragSource}>
        <Title>{segment.name}</Title>
        <SegmentOptions
          onRemove={() => {
            if (
              segment.questions.length === 0 ||
              window.confirm('Are you sure?')
            ) {
              removeSegment(segment.id)
            }
          }}
        ></SegmentOptions>
      </Header>
      <QuestionsList ref={questionDropArea}>
        {segment.questions.map((question, index) => (
          <BoardQuestion
            key={question.id}
            question={question}
            segmentId={segment.id}
            move={moveQuestion}
            reorder={reorderQuestion}
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
  max-width: 300px;
  background-color: hsl(0, 0%, 90%);
  margin-right: 16px;
  padding: 0 8px 8px;
  opacity: ${(p) => (p.dragging ? 0 : 1)};
`

const Header = styled.div`
  padding: 16px 8px;
  cursor: move;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  margin: 0;
  padding: 0;
  padding-right: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

const QuestionsList = styled.div`
  height: 100%;
  border: 2px dashed hsl(0, 0%, 80%);
  border-radius: 8px;
  min-width: 150px;
  overflow-y: scroll;

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`
