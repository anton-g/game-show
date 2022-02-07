import { useMachine } from '@xstate/react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { createShowMachine } from '../../machines/showMachine'
import { Spacer } from '../common/Spacer'
import { Preview } from './Preview'
import { DevPanel } from './DevPanel'
import { ControlPanel } from './ControlPanel'
import { playersMock, usePresentationContext } from './PresentationsControl'
import { useSegmentFromMachine } from '../../hooks/useSegmentFromMachine'

type ShowAdminProps = {
  machine: ReturnType<typeof createShowMachine>
}

export function ShowAdmin({ machine }: ShowAdminProps) {
  const [{ startConnection, sendMessage, terminateConnection }, errors] =
    usePresentationContext()
  const [state, internalSend] = useMachine(machine, { devTools: true })
  const { admin } = useSegmentFromMachine(state.context.segmentMachineRef)

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
      <Tools>
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
      </Tools>
      <Spacer axis={'horizontal'} size={16} />
      <Overview>
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
      </Overview>
      <Spacer axis={'horizontal'} size={16} />
      <PreviewWrapper>
        <Preview showState={state}></Preview>
      </PreviewWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
`
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`
const Overview = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`
const PreviewWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`
