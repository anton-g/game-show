import { useDrag } from 'react-dnd'
import { useActions } from '../../../overmind'
import { Segment } from '../../../overmind/types'
import { DraggedSegment, DRAG_TYPES } from '../Board'

export function useSegmentDrag(
  segmentId: Segment['id'],
  originalPosition: number
) {
  const { reorderSegment } = useActions().builder

  const [{ isDragging }, segmentDragSource, preview] = useDrag(
    () => ({
      type: DRAG_TYPES.SEGMENT,
      item: {
        id: segmentId,
        originalPosition: originalPosition,
      } as DraggedSegment,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalPosition } = item
        const didDrop = monitor.didDrop()

        if (!didDrop) {
          // "Cancel", dropped outside, move back to original position
          // TEST Does this work?
          reorderSegment({
            segmentId: droppedId,
            toPosition: originalPosition,
          })
        }
      },
      isDragging: (monitor) => {
        return segmentId === monitor.getItem().id
      },
    }),
    [segmentId, reorderSegment]
  )

  return [segmentDragSource, preview, { isDragging }] as const
}
