import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { QuestionSegmentType } from '../../../overmind/types'
import { QuestionSegment } from './QuestionSegment'
import { DRAG_TYPES } from '../Board'

type Props = {
  segmentId: QuestionSegmentType['id']
  isSortingContainer: boolean
}

export const DroppableSegment = ({ segmentId, isSortingContainer }: Props) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id: segmentId,
    data: {
      type: DRAG_TYPES.SEGMENT,
    },
    // animateLayoutChanges,
  })

  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <QuestionSegment
      isSortingContainer={isSortingContainer}
      setNodeRef={setNodeRef}
      // active={active}
      handleProps={{ ...attributes, ...listeners }}
      style={style}
      segmentId={segmentId}
      isDragging={isDragging}
    ></QuestionSegment>
  )
}
