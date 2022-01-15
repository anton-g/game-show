import { useActor, useMachine } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { SegmentQuestion } from '../../overmind/types'

export function Player() {
  const show = useAppState((state) => state.selectedShow)
  if (!show) return null

  const showMachine = createShowMachine(show)

  return <ShowPlayer machine={showMachine} />
}

type ShowPlayerProps = {
  machine: ReturnType<typeof createShowMachine>
}

function ShowPlayer({ machine }: ShowPlayerProps) {
  const [state, send] = useMachine(machine, { devTools: true })

  return (
    <div style={{ padding: 16 }}>
      <h3>show {state.context.show.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next segment
      </button>{' '}
      Current state: {state.value}
      {state.context.segmentMachineRef && (
        <SegmentPlayerFactory
          machine={state.context.segmentMachineRef}
        ></SegmentPlayerFactory>
      )}
    </div>
  )
}

function SegmentPlayerFactory({ machine }: { machine: AnySegmentActor }) {
  switch (
    (machine as any).machine.id // TODO fix types
  ) {
    case 'questionSegment':
      return (
        <QuestionSegmentPlayer
          machine={machine as QuestionSegmentActor}
        ></QuestionSegmentPlayer>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentPlayer
          machine={machine as ScoreSegmentActor}
        ></ScoreSegmentPlayer>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}

type ScoreSegmentPlayerProps = {
  machine: ScoreSegmentActor
}

function ScoreSegmentPlayer({ machine }: ScoreSegmentPlayerProps) {
  const [state, send] = useActor(machine)
  const segment = state.context.segment

  return (
    <div>
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>{' '}
      Current state: {state.value}
    </div>
  )
}

type QuestionSegmentPlayerProps = {
  machine: QuestionSegmentActor
}

function QuestionSegmentPlayer({ machine }: QuestionSegmentPlayerProps) {
  const [state, send] = useActor(machine)
  const segment = state.context.segment

  return (
    <div>
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next question
      </button>{' '}
      Current state: {state.value}
      {state.context.questionMachineRef && (
        <QuestionPlayer
          machine={state.context.questionMachineRef}
          question={state.context.questions[state.context.currentQuestionIndex]}
        ></QuestionPlayer>
      )}
    </div>
  )
}

type QuestionPlayerProps = {
  machine: QuestionActor
  question: SegmentQuestion
}

function QuestionPlayer({ machine, question }: QuestionPlayerProps) {
  const [state, send] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)

  const { elapsed } = timerState.context

  return (
    <div>
      <h3>{question.question.question}</h3>
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
    </div>
  )
}
