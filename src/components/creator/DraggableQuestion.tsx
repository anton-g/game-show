import { useDrag, useDrop } from 'react-dnd'
import { useActions, useAppState } from '../../overmind'
import type { Question } from '../../overmind/state'
import type { DraggedItem } from './DraggableSegment'

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

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'QUESTION',
      item: { id: question.id } as DraggedItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id } = item
        const didDrop = monitor.didDrop()
        const r = monitor.getDropResult<{ segmentId: string }>()
        if (didDrop && r?.segmentId) {
          move(id, segmentId, r.segmentId)
        } else {
          const draggedFromSegment = getQuestionSegment(id)
          if (!draggedFromSegment) return

          reorder(id, draggedFromSegment.id, index)
        }
      },
      isDragging: (monitor) => {
        return question.id === monitor.getItem().id
      },
    }),
    [question.id, move, segmentId, getQuestionSegment, reorder, index]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'QUESTION',
      canDrop: () => false,
      hover({ id: draggedId }: DraggedItem) {
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
    }),
    [question, segmentId, index, move]
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
