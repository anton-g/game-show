import { useActor, useMachine } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import {
  QuestionSegmentActor,
  ScoreSegmentActor,
} from '../../machines/segmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { Segment } from '../../overmind/types'

export function Player() {
  const show = useAppState((state) => state.selectedShow)
  const showMachine = createShowMachine(show!) // TODO fix

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
        next
      </button>{' '}
      Current state: {state.value}
      {state.context.segmentMachineRef && (
        <SegmentPlayerFactory
          machine={state.context.segmentMachineRef}
          segment={state.context.segments[state.context.currentSegmentIndex]}
        ></SegmentPlayerFactory>
      )}
    </div>
  )
}

function SegmentPlayerFactory({
  machine,
  segment,
}: {
  machine: AnySegmentActor
  segment: Segment
}) {
  switch (
    (machine as any).machine.id // TODO fix types
  ) {
    case 'questionSegment':
      return (
        <QuestionSegmentPlayer
          machine={machine as QuestionSegmentActor}
          segment={segment}
        ></QuestionSegmentPlayer>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentPlayer
          machine={machine as ScoreSegmentActor}
          segment={segment}
        ></ScoreSegmentPlayer>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}

type ScoreSegmentPlayerProps = {
  machine: ScoreSegmentActor
  segment: Segment
}

function ScoreSegmentPlayer({ machine, segment }: ScoreSegmentPlayerProps) {
  const [state, send] = useActor(machine)

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
  segment: Segment
}

function QuestionSegmentPlayer({
  machine,
  segment,
}: QuestionSegmentPlayerProps) {
  const [state, send] = useActor(machine)

  return (
    <div>
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
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
  question: string // TODO
}

function QuestionPlayer({ machine, question }: QuestionPlayerProps) {
  const [state, send] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)

  const { elapsed } = timerState.context

  return (
    <div>
      <h3>question {question}</h3>
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
