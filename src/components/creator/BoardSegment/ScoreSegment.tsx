import styled from 'styled-components'
import type { ScoreSegmentType } from '../../../overmind/types'

type Props = {
  segmentId: ScoreSegmentType['id']
  isDragging: boolean
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
}

export const ScoreSegment = ({
  segmentId,
  isDragging,
  setNodeRef,
  style,
  handleProps,
}: Props) => {
  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      {...handleProps}
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
  opacity: ${(p) => (p.dragging ? 0.2 : 1)};
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
