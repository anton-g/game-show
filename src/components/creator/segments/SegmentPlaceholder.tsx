import styled from 'styled-components'
import { useActions } from '../../../overmind'

type Props = {
  disabled: boolean
  setNodeRef?: (node: HTMLElement | null) => void // TODO replace with forwardref
  isHovered?: boolean
  style?: React.CSSProperties
}

export function SegmentPlaceholder({
  disabled,
  setNodeRef,
  isHovered,
  style,
}: Props) {
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
