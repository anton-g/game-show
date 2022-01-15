import { useActor, useMachine } from '@xstate/react'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { Spacer } from '../common/Spacer'
import { Preview } from './Preview'

export function Admin() {
  const show = useAppState((state) => state.selectedShow)
  if (!show) return null

  const showMachine = createShowMachine(show)

  return <ShowAdmin machine={showMachine} />
}

type ShowAdminProps = {
  machine: ReturnType<typeof createShowMachine>
}

function ShowAdmin({ machine }: ShowAdminProps) {
  const [state, send] = useMachine(machine, { devTools: true })

  return (
    <Wrapper>
      <Tools>
        <h3>show {state.context.show.name}</h3>
        <Spacer size={16} />
        <ControlPanel title="Show controls">
          <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
            next segment
          </button>{' '}
          Current state: {state.value}
        </ControlPanel>
        <Spacer size={16} />
        {state.context.segmentMachineRef && (
          <SegmentAdminFactory
            machine={state.context.segmentMachineRef}
          ></SegmentAdminFactory>
        )}
      </Tools>
      <Overview>scores</Overview>
      <PreviewWrapper>
        <Preview showState={state}></Preview>
      </PreviewWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 8px;
`

const Tools = styled.div`
  display: flex;
  flex-direction: column;
`

const Overview = styled.div``

const PreviewWrapper = styled.div`
  margin-left: auto;
`

function SegmentAdminFactory({ machine }: { machine: AnySegmentActor }) {
  switch (
    (machine as any).machine.id // TODO fix types
  ) {
    case 'questionSegment':
      return (
        <QuestionSegmentAdmin
          machine={machine as QuestionSegmentActor}
        ></QuestionSegmentAdmin>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentAdmin
          machine={machine as ScoreSegmentActor}
        ></ScoreSegmentAdmin>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}

type ScoreSegmentAdminProps = {
  machine: ScoreSegmentActor
}

function ScoreSegmentAdmin({ machine }: ScoreSegmentAdminProps) {
  const [state, send] = useActor(machine)
  const segment = state.context.segment

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
  machine: QuestionSegmentActor
}

function QuestionSegmentAdmin({ machine }: QuestionSegmentAdminProps) {
  const [state, send] = useActor(machine)
  const segment = state.context.segment

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
          machine={state.context.questionMachineRef}
        ></QuestionAdmin>
      )}
    </div>
  )
}

type QuestionAdminProps = {
  machine: QuestionActor
}

function QuestionAdmin({ machine }: QuestionAdminProps) {
  const [state, send] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)
  const question = state.context.question

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
        disabled={!state.can('BUZZ')}
        onClick={() => send('BUZZ')}
      >
        buzz
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
