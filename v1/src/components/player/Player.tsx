import styled from 'styled-components'
import { StateFrom } from 'xstate'
import { useSegmentFromMachine } from '../../hooks/useSegmentFromMachine'
import { createShowMachine } from '../../machines/showMachine'

type PlayerProps = {
  showState: StateFrom<ReturnType<typeof createShowMachine>>
}

export function Player({ showState }: PlayerProps) {
  const { player } = useSegmentFromMachine(showState.context.segmentMachineRef)

  if (showState.matches('loading'))
    return (
      <Wrapper>
        <h3>Loading</h3>
      </Wrapper>
    )
  if (showState.matches('ready'))
    return (
      <Wrapper>
        <h3>ready</h3>
      </Wrapper>
    )
  if (showState.matches('intro'))
    return (
      <Wrapper>
        <h3>{showState.context.show.name}</h3>
      </Wrapper>
    )

  if (showState.matches('segment')) {
    return <Wrapper>{player}</Wrapper>
  }

  return <h3>end</h3>
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: black; // todo replace with color from theme
  color: white; // todo replace with color from theme
`
