import styled from 'styled-components'
import { useAppState } from '../../../overmind'
import type { ScoreSegmentType } from '../../../overmind/types'
import { useSegmentDrag } from './useSegmentDrag'
import { useSegmentDrop } from './useSegmentDrop'

type Props = {
  segmentId: ScoreSegmentType['id']
}

export const ScoreSegment = ({ segmentId }: Props) => {
  const segment = useAppState(
    (state) => state.selectedShow!.segments[segmentId] as ScoreSegmentType
  )

  const [segmentDragSource, preview, { isDragging }] = useSegmentDrag(
    segmentId,
    segment.position
  )

  const [segmentDropTarget] = useSegmentDrop(segmentId)

  return (
    <Wrapper
      dragging={isDragging}
      ref={(node) => preview(segmentDropTarget(node))}
    >
      <Inner ref={segmentDragSource}>Scores</Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ dragging: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px; // 80
  max-width: 300px; // 80
  padding: 64px 8px 8px;
  opacity: ${(p) => (p.dragging ? 0 : 1)};
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
