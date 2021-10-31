import React from 'react'
import styled, { css } from 'styled-components'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { DragHandle } from '../DragHandle'

type Props = {
  isDragging: boolean
  style?: React.CSSProperties
  handleProps?: React.HTMLAttributes<any>
  isDragOverlay?: boolean
}

export const ScoreSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ isDragging, style, handleProps, isDragOverlay }, ref) => {
    return (
      <Wrapper ref={ref} style={style} dragging={isDragging}>
        <Actions>
          <DragHandle {...handleProps}>
            <DragHandleDots2Icon />
          </DragHandle>
        </Actions>
        <Inner isDragOverlay={isDragOverlay}>Scores</Inner>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div<{ dragging?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 80px;
  max-width: 80px;
  opacity: ${(p) => (p.dragging ? 0.2 : 1)};
  user-select: none;
  cursor: grab;
  padding: 0 8px 8px;
`

const Actions = styled.div`
  min-height: 68px;
  padding: 16px 8px;
  align-self: flex-end;
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
