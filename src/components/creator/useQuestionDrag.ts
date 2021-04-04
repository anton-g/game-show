import { useDrag } from 'react-dnd'
import { useActions } from '../../overmind'
import { DraggedQuestion } from './useQuestionDrop'

type DragProps = {
  onMove: (id: string, targetSegmentId: string) => void
  onReorder: (id: string, fromSegmentId: string) => void
}
export function useQuestionDrag(
  questionId: string,
  { onMove, onReorder }: DragProps
) {
  const { getQuestionSegment } = useActions()

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'QUESTION',
      item: { id: questionId } as DraggedQuestion,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id } = item
        const didDrop = monitor.didDrop()
        const r = monitor.getDropResult<{ segmentId: string }>()
        if (didDrop && r?.segmentId) {
          onMove(id, r.segmentId)
        } else {
          const draggedFromSegment = getQuestionSegment(id)
          if (!draggedFromSegment) return

          onReorder(id, draggedFromSegment.id)
        }
      },
      isDragging: (monitor) => {
        return questionId === monitor.getItem().id
      },
    }),
    [questionId, onMove, onReorder, getQuestionSegment]
  )

  return [isDragging, drag] as const
}
