import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styled from 'styled-components'
import type { ScoreSegmentType } from '../../../overmind/types'
import { DRAG_TYPES } from '../Board'

type Props = {
  segmentId: ScoreSegmentType['id']
}

export const ScoreSegment = ({ segmentId }: Props) => {
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

  // TODO Move to util?
  // const isOverSegment = over
  //   ? (segmentId === over.id && active?.data.current?.type !== DRAG_TYPES.SEGMENT) ||
  //     items.includes(over.id)
  //   : false

  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      dragging={isDragging}
    >
      <Inner>Scores</Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ dragging?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 80px;
  max-width: 80px;
  padding: 64px 8px 8px;
  opacity: ${(p) => (p.dragging ? 0.5 : 1)};
`

const Inner = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 8px;
  writing-mode: vertical-lr;
  display: flex;
  align-items: center;
  padding-top: 24px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray11};
`
