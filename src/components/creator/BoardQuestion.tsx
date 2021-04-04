import { useCallback } from 'react'
import { useActions, useAppState } from '../../overmind'
import type { Question } from '../../overmind/state'
import { useQuestionDrag } from './useQuestionDrag'
import { useQuestionDrop } from './useQuestionDrop'

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

export function DraggableQuestion({
  question,
  index,
  segmentId,
  move,
  reorder,
}: Props) {
  useAppState()
  const { getQuestionSegment } = useActions()

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
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: 8,
        cursor: 'move',
        backgroundColor: 'white',
        border: '1px dashed hsl(0, 0%, 70%)',
        opacity: isDragging ? 0.1 : 1,
      }}
    >
      {question.question}
      <p>
        {segmentId} - {index}
      </p>
    </div>
  )
}
