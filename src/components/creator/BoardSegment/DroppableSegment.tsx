import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { QuestionSegmentType } from '../../../overmind/types'
import { QuestionSegment } from './QuestionSegment'
import { DRAG_TYPES } from '../Board'
import { useAppState } from '../../../overmind'
import { ScoreSegment } from './ScoreSegment'

type Props = {
  segmentId: QuestionSegmentType['id']
  isSortingContainer: boolean
}

export const DroppableSegment = ({ segmentId, isSortingContainer }: Props) => {
  const segment = useAppState((state) => state.selectedShowSegments[segmentId])

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

  switch (segment.type) {
    case 'QUESTIONS':
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
    case 'SCORES':
      return (
        <ScoreSegment
          key={segment.id}
          segmentId={segment.id}
          setNodeRef={setNodeRef}
          // active={active}
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
