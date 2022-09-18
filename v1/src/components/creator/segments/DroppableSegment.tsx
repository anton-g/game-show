import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { QuestionSegmentType, Segment } from '../../../overmind/types'
import { QuestionSegment } from './QuestionSegment'
import { DRAG_TYPES, PLACEHOLDER_ID } from '../Board'
import { useAppState } from '../../../overmind'
import { ScoreSegment } from './ScoreSegment'
import { SegmentPlaceholder } from './SegmentPlaceholder'

type Props = {
  segmentId: QuestionSegmentType['id']
  isSortingContainer: boolean
}

export const DroppableSegment = ({ segmentId, isSortingContainer }: Props) => {
  const segment = useAppState<Segment | undefined>(
    (state) => state.selectedShowSegments[segmentId]
  )

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

  const isHoveringSelf = segmentId === over?.id
  const isSegment = active?.data.current?.type !== DRAG_TYPES.SEGMENT
  const isHoveringSegmentQuestion = !!(
    over &&
    segment?.type === 'QUESTIONS' &&
    Boolean(segment?.questions[over.id])
  )
  const isOverContainer = over
    ? (isHoveringSelf && isSegment) || isHoveringSegmentQuestion
    : false

  const style = { transform: CSS.Transform.toString(transform), transition }

  if (segmentId === PLACEHOLDER_ID) {
    return (
      <SegmentPlaceholder
        ref={setNodeRef}
        disabled={isSortingContainer}
        isHovered={isOverContainer}
        style={style}
      />
    )
  }

  if (!segment) throw new Error('should never happen')

  switch (segment.type) {
    case 'QUESTIONS':
      return (
        <QuestionSegment
          ref={setNodeRef}
          isSortingContainer={isSortingContainer}
          handleProps={{ ...attributes, ...listeners }}
          style={style}
          segmentId={segmentId}
          isDragging={isDragging}
          isHovered={isOverContainer}
        ></QuestionSegment>
      )
    case 'SCORES':
      return (
        <ScoreSegment
          ref={setNodeRef}
          segmentId={segment.id}
          handleProps={{ ...attributes, ...listeners }}
          style={style}
          isDragging={isDragging}
        ></ScoreSegment>
      )
    default:
      const _exhaustiveCheck: never = segment
      return _exhaustiveCheck
  }
}
