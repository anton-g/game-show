import styled, { css } from 'styled-components'
import type { ScoreSegmentType } from '../../../overmind/types'

type Props = {
  segmentId: ScoreSegmentType['id']
  isDragging: boolean
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
  isDragOverlay?: boolean
}

export const ScoreSegment = ({
  segmentId,
  isDragging,
  setNodeRef,
  style,
  handleProps,
  isDragOverlay,
}: Props) => {
  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      {...handleProps}
      dragging={isDragging}
    >
      <Inner isDragOverlay={isDragOverlay}>Scores</Inner>
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
  user-select: none;
  cursor: grab;
`

const Inner = styled.div<{ isDragOverlay?: boolean }>`
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

  ${({ isDragOverlay }) =>
    isDragOverlay &&
    css`
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.02),
        0 1px 10px 0 rgba(34, 33, 81, 0.1);
    `}
`
