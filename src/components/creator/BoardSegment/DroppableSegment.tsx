import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { QuestionSegmentType, Segment } from '../../../overmind/types'
import { QuestionSegment } from './QuestionSegment'
import { DRAG_TYPES, PLACEHOLDER_ID } from '../Board'
import { useActions, useAppState } from '../../../overmind'
import { ScoreSegment } from './ScoreSegment'
import styled from 'styled-components'

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
        disabled={isSortingContainer}
        setNodeRef={setNodeRef}
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
          isSortingContainer={isSortingContainer}
          setNodeRef={setNodeRef}
          // active={active}
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

type PlaceholderProps = {
  disabled: boolean
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  isHovered?: boolean
  style?: React.CSSProperties
}

function SegmentPlaceholder({
  disabled,
  setNodeRef,
  isHovered,
  style,
}: PlaceholderProps) {
  const { addSegment } = useActions().builder

  return (
    <Wrapper
      onClick={() => addSegment({})}
      ref={disabled ? undefined : setNodeRef}
      style={style}
    >
      <Inner hovered={isHovered}>+ Add segment</Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
  max-width: 300px;
  padding: 64px 8px 8px;
  margin-right: 36px;
`

const Inner = styled.div<{ hovered?: boolean }>`
  height: 100%;
  background-color: ${({ theme, hovered }) =>
    hovered ? theme.colors.gray3 : undefined};
  border: 3px dotted ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray11};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray12};
    border: 3px dotted ${({ theme }) => theme.colors.gray5};
  }
`
