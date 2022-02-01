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
  border: 1px solid ${({ theme }) => theme.colors.gray5};
`
