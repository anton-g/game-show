import { useDrop } from 'react-dnd'
import { useActions } from '../../../overmind'
import { Segment } from '../../../overmind/types'
import { DraggedSegment, DRAG_TYPES } from '../Board'

export function useSegmentDrop(segmentId: Segment['id']) {
  const { reorderSegment, findSegment } = useActions().builder

  const [, segmentDropTarget] = useDrop(
    () => ({
      accept: DRAG_TYPES.SEGMENT,
      canDrop: () => false,
      hover({ id: draggedId }: DraggedSegment, monitor) {
        if (draggedId !== segmentId) {
          console.log(monitor.getDifferenceFromInitialOffset())
          console.log(monitor.isOver())
          const { segment: hoveredSegment } = findSegment(segmentId) // TODO check if this can be removed?
          console.log('hovering segment at', hoveredSegment.position)
          reorderSegment({
            segmentId: draggedId,
            toPosition: hoveredSegment.position,
          })
        }
      },
    }),
    [reorderSegment, findSegment, segmentId]
  )

  return [segmentDropTarget] as const
}
