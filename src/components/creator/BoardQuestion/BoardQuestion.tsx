import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useActions, useAppState } from '../../../overmind'
import type { Question } from '../../../overmind/state'
import { useQuestionDrag } from '../useQuestionDrag'
import { useQuestionDrop } from '../useQuestionDrop'
import { QuestionMoveDialog } from './QuestionMoveDialog'
import { QuestionOptions } from './QuestionOptions'

type Props = {
  question: Question
  segmentId: string | null
  index: number
  move: (
    id: string,
    fromSegmentId: string | null,
    toSegmentId: string | null,
    toIndex?: number
  ) => void
  reorder: (id: string, segmentId: string, toIndex: number) => void
}

export function BoardQuestion({
  question,
  index,
  segmentId,
  move,
  reorder,
}: Props) {
  const [showMoveDialog, setShowMoveDialog] = useState(false)
  const { segments } = useAppState()
  const {
    getQuestionSegment,
    removeSegmentQuestion,
    moveSegmentQuestion,
  } = useActions()

  const [isDragging, drag] = useQuestionDrag(question.id, {
    onMove: useCallback(
      (id, targetSegmentId) => {
        move(id, segmentId, targetSegmentId)
      },
      [move, segmentId]
    ),
    onReorder: useCallback(
      (id, fromSegmentId) => {
        reorder(id, fromSegmentId, index)
      },
      [index, reorder]
    ),
  })

  const drop = useQuestionDrop(
    segmentId,
    {
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId === question.id) return // Hovering itself

        const draggedFromSegment = getQuestionSegment(draggedId)
        if (!draggedFromSegment) {
          move(draggedId, null, segmentId, index)
          return
        }

        if (segmentId === draggedFromSegment.id) {
          reorder(draggedId, draggedFromSegment.id, index)
        } else {
          move(draggedId, draggedFromSegment.id, segmentId, index)
        }
      },
    },
    [question, index, move]
  )

  return (
    <Wrapper ref={(node) => drag(drop(node))} isDragging={isDragging}>
      <Header>
        <span>{question.question}</span>
        <QuestionOptions
          onRemove={() =>
            removeSegmentQuestion({
              segmentId: segmentId!,
              questionId: question.id,
            })
          }
          onMove={() => setShowMoveDialog(true)}
        ></QuestionOptions>
      </Header>
      <p>
        {segmentId} - {index}
      </p>
      <QuestionMoveDialog
        open={showMoveDialog}
        segments={segments.filter((x) => x.id !== segmentId)}
        onOpenChange={setShowMoveDialog}
        onSelectedSegment={(targetSegmentId) =>
          moveSegmentQuestion({
            fromSegmentId: segmentId,
            toSegmentId: targetSegmentId,
            questionId: question.id,
          })
        }
      ></QuestionMoveDialog>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isDragging: boolean }>`
  padding: 8px;
  cursor: move;
  background-color: white;
  border: 1px dashed hsl(0 0% 70%);
  opacity: ${(p) => (p.isDragging ? 0.1 : 1)};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
