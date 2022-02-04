import { useActor, useMachine } from '@xstate/react'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import usePresentation, {
  PresentationMessage,
} from '../../hooks/usePresentation'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { DropdownMenu } from '../common/DropdownMenu'
import { Spacer } from '../common/Spacer'
import { Preview } from './Preview'

export type PlayerType = {
  id: string
  name: string
  score: number
}

export type Players = Record<PlayerType['id'], PlayerType>

const playersMock: Players = {
  '1': {
    id: '1',
    name: 'Player1',
    score: 0,
  },
  '2': {
    id: '2',
    name: 'Player2',
    score: 0,
  },
  '3': {
    id: '3',
    name: 'Player3',
    score: 0,
  },
  '4': {
    id: '4',
    name: 'Player4',
    score: 0,
  },
}

export function Admin() {
  const show = useAppState((state) => state.selectedShow)
  if (!show) return null

  const showMachine = createShowMachine(show, playersMock)

  return <ShowAdmin machine={showMachine} />
}

type ShowAdminProps = {
  machine: ReturnType<typeof createShowMachine>
}

function ShowAdmin({ machine }: ShowAdminProps) {
  const { startConnection, sendMessage, errors, terminateConnection } =
    usePresentation()
  const [state, internalSend] = useMachine(machine, { devTools: true })

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
        {state.context.segmentMachineRef && (
          <SegmentAdminFactory
            machine={state.context.segmentMachineRef}
            players={state.context.players}
            sendMessage={sendMessage} // Might actually wanna create a context for this
          ></SegmentAdminFactory>
        )}
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

function SegmentAdminFactory({
  machine,
  players,
  sendMessage,
}: {
  players: Players
  machine: AnySegmentActor
  sendMessage: (msg: PresentationMessage) => void
}) {
  const machineId = machine.getSnapshot()?.machine?.id
  switch (machineId) {
    case 'questionSegment':
      return (
        <QuestionSegmentAdmin
          actor={machine as QuestionSegmentActor}
          players={players}
          sendMessage={sendMessage}
        ></QuestionSegmentAdmin>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentAdmin
          actor={machine as ScoreSegmentActor}
          sendMessage={sendMessage}
        ></ScoreSegmentAdmin>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}

type ScoreSegmentAdminProps = {
  actor: ScoreSegmentActor
  sendMessage: (msg: PresentationMessage) => void
}

function ScoreSegmentAdmin({ actor, sendMessage }: ScoreSegmentAdminProps) {
  const [state, internalSend] = useActor(actor)
  const segment = state.context.segment

  const send = (...params: Parameters<typeof internalSend>) => {
    sendMessage({
      type: 'EVENT',
      payload: { machine: actor.id, event: params },
    })
    internalSend(...params)
  }

  return (
    <ControlPanel title="Score controls">
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>{' '}
      Current state: {state.value}
    </ControlPanel>
  )
}

type QuestionSegmentAdminProps = {
  actor: QuestionSegmentActor
  players: Players
  sendMessage: (msg: PresentationMessage) => void
}

function QuestionSegmentAdmin({
  actor,
  players,
  sendMessage,
}: QuestionSegmentAdminProps) {
  const [state, internalSend] = useActor(actor)
  const segment = state.context.segment

  const send = (...params: Parameters<typeof internalSend>) => {
    sendMessage({
      type: 'EVENT',
      payload: { machine: actor.id, event: params },
    })
    internalSend(...params)
  }

  return (
    <div>
      <ControlPanel title="Segment controls">
        <h3>segment {segment.name}</h3>
        <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
          next question
        </button>{' '}
        Current state: {state.value}
      </ControlPanel>
      <Spacer size={16} />
      {state.context.questionMachineRef && (
        <QuestionAdmin
          actor={state.context.questionMachineRef}
          players={players}
          sendMessage={sendMessage}
        ></QuestionAdmin>
      )}
    </div>
  )
}

type QuestionAdminProps = {
  actor: QuestionActor
  players: Players
  sendMessage: (msg: PresentationMessage) => void
}

function QuestionAdmin({ actor, players, sendMessage }: QuestionAdminProps) {
  const [state, internalSend] = useActor(actor)
  const [timerState] = useActor(state.context.timerRef!)
  const question = state.context.question

  const send = (...params: Parameters<typeof internalSend>) => {
    sendMessage({
      type: 'EVENT',
      payload: { machine: actor.id, event: params },
    })
    internalSend(...params)
  }

  const { elapsed } = timerState.context

  return (
    <ControlPanel title="Questions controls">
      <h3>{question.question}</h3>
      <button
        style={{ marginRight: 8 }}
        disabled={!state.can('START')}
        onClick={() => send('START')}
      >
        start
      </button>
      <button
        style={{ marginRight: 8 }}
        disabled={!state.can('CORRECT')}
        onClick={() => send('CORRECT')}
      >
        correct
      </button>
      <button
        style={{ marginRight: 8 }}
        disabled={!state.can('INCORRECT')}
        onClick={() => send('INCORRECT')}
      >
        incorrect
      </button>
      <button
        style={{ marginRight: 8 }}
        disabled={!state.can('REVEAL')}
        onClick={() => send('REVEAL')}
      >
        reveal
      </button>
      <button
        style={{ marginRight: 8 }}
        disabled={!state.can('END')}
        onClick={() => send('END')}
      >
        end
      </button>
      <div>
        Current state: {state.value}, {elapsed && `Timer: ${elapsed}`}
      </div>
      <div>
        {state.context.activeTeam && `Team: ${state.context.activeTeam}`}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenu.Trigger
            style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}
            disabled={!state.can({ type: 'BUZZ', team: '_' })}
          >
            buzz
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{
                height: 20,
                width: 20,
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {Object.values(players).map((p) => (
              <DropdownMenu.Item
                key={p.id}
                onSelect={() => send({ type: 'BUZZ', team: p.id })}
              >
                {p.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </ControlPanel>
  )
}

const ControlPanel = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <PanelWrapper>
      <PanelTitle>{title}</PanelTitle> {/* todo move to composable */}
      <Spacer size={8} />
      {children}
    </PanelWrapper>
  )
}

const PanelWrapper = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 4px;
`

const PanelTitle = styled.h2`
  width: fit-content;
  padding: 0 8px;
  margin: -24px -8px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
  background-color: ${({ theme }) => theme.colors.gray1};
  color: ${({ theme }) => theme.colors.gray11};
`
