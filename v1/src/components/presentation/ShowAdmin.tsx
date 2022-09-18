import { useMachine } from '@xstate/react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { createShowMachine } from '../../machines/showMachine'
import { Spacer } from '../common/Spacer'
import { DevPanel } from './DevPanel'
import { ControlPanel } from './ControlPanel'
import { playersMock, usePresentationContext } from './PresentationsControl'
import { useSegmentFromMachine } from '../../hooks/useSegmentFromMachine'
import { Player } from '../player/Player'

type ShowAdminProps = {
  machine: ReturnType<typeof createShowMachine>
}

export function ShowAdmin({ machine }: ShowAdminProps) {
  const [{ startConnection, sendMessage, terminateConnection }, errors] =
    usePresentationContext()
  const [state, internalSend] = useMachine(machine, { devTools: true })
  const { admin, info } = useSegmentFromMachine(state.context.segmentMachineRef)

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const send = (...params: Parameters<typeof internalSend>) => {
    sendMessage({
      type: 'EVENT',
      payload: { machine: state.machine!.id, event: params },
    })
    internalSend(...params)
  }

  return (
    <Wrapper>
      <DevPanel
        players={playersMock}
        onBuzz={(teamId) => send({ type: 'BUZZ', team: teamId })}
      ></DevPanel>
      <Column>
        <ControlPanel title="Presentation controls">
          <button onClick={() => startConnection('/play/external')}>
            start
          </button>{' '}
          <button onClick={() => terminateConnection()}>stop</button>{' '}
          <button
            onClick={() => {
              sendMessage({ type: 'PLAYERS', payload: playersMock })
            }}
          >
            fake players
          </button>{' '}
        </ControlPanel>
        <h3>show {state.context.show.name}</h3>
        <Spacer size={16} />
        <ControlPanel title="Show controls">
          <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
            next
          </button>{' '}
          Current state: {state.value}
        </ControlPanel>
        <Spacer size={16} />
        {admin}
      </Column>
      <Spacer axis={'horizontal'} size={16} />
      <Column>
        <h3>Scores</h3>
        <ol>
          {Object.values(state.context.players)
            .sort((a, b) => b.score - a.score)
            .map((x) => (
              <li key={x.id}>
                {x.name} - {x.score} pts
              </li>
            ))}
        </ol>
      </Column>
      <Spacer axis={'horizontal'} size={16} />
      <Column>
        <Preview>
          <Player showState={state} />
        </Preview>
        <Spacer size={16} />
        <ControlPanel title="Info">{info}</ControlPanel>
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
`

const Preview = styled.div`
  width: 450px;
  aspect-ratio: 16 / 9;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  overflow: hidden;
`

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
`
