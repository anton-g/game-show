import styled from 'styled-components'
import { StateFrom } from 'xstate'
import { createShowMachine } from '../../machines/showMachine'
import { Player } from '../player/Player'

type PreviewProps = {
  showState: StateFrom<ReturnType<typeof createShowMachine>>
}

export function Preview({ showState }: PreviewProps) {
  return (
    <Wrapper>
      <Player showState={showState} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 450px;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  background-color: ${({ theme }) => theme.colors.gray1};
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.gray3} 0,
    ${({ theme }) => theme.colors.gray3} 2px,
    ${({ theme }) => theme.colors.gray1} 0,
    ${({ theme }) => theme.colors.gray1} 50%
  );
`