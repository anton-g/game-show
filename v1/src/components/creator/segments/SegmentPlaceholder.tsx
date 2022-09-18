import React from 'react'
import styled from 'styled-components'
import { useActions } from '../../../overmind'

type Props = {
  disabled: boolean
  isHovered?: boolean
  style?: React.CSSProperties
}

export const SegmentPlaceholder = React.forwardRef<HTMLDivElement, Props>(
  ({ disabled, isHovered, style }, ref) => {
    const { addQuestionSegment, addScoreSegment } = useActions().builder

    return (
      <Wrapper style={style}>
        <NewQuestionSegment
          ref={disabled ? undefined : ref}
          hovered={isHovered}
          onClick={() => addQuestionSegment({})}
        >
          + Question segment
        </NewQuestionSegment>
        <NewScoreSegment onClick={addScoreSegment}>
          + Score segment
        </NewScoreSegment>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  padding: 64px 8px 8px;
  margin-right: 36px;
`

const NewSegment = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.gray4};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray11};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray12};
    border: 2px dashed ${({ theme }) => theme.colors.gray5};
  }
`

const NewQuestionSegment = styled(NewSegment)<{ hovered?: boolean }>`
  min-height: 300px;
  background-color: ${({ theme, hovered }) =>
    hovered ? theme.colors.gray3 : undefined};
  padding: 24px 0;

  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const NewScoreSegment = styled(NewSegment)`
  padding: 16px 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  &:hover {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`
