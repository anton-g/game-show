import { useActor, useMachine } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import { SegmentActor } from '../../machines/segmentMachine'
import { showMachine } from '../../machines/showMachine'

export function Player() {
  const [state, send] = useMachine(showMachine)

  return (
    <div>
      <h3>show</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>
      {state.value}
      {state.context.segmentMachineRef && (
        <SegmentPlayer
          machine={state.context.segmentMachineRef}
          segment={state.context.segments[state.context.currentSegmentIndex]}
        ></SegmentPlayer>
      )}
    </div>
  )
}

type SegmentPlayerProps = {
  machine: SegmentActor
  segment: string // TODO
}

function SegmentPlayer({ machine, segment }: SegmentPlayerProps) {
  const [state, send] = useActor(machine)

  return (
    <div>
      <h3>segment {segment}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>
      {state.value}
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
      <button disabled={!state.can('START')} onClick={() => send('START')}>
        start
      </button>
      <button disabled={!state.can('BUZZ')} onClick={() => send('BUZZ')}>
        buzz
      </button>
      <button disabled={!state.can('CORRECT')} onClick={() => send('CORRECT')}>
        correct
      </button>
      <button
        disabled={!state.can('INCORRECT')}
        onClick={() => send('INCORRECT')}
      >
        incorrect
      </button>
      <button disabled={!state.can('REVEAL')} onClick={() => send('REVEAL')}>
        reveal
      </button>
      <button disabled={!state.can('END')} onClick={() => send('END')}>
        end
      </button>
      <div>
        {state.value} {elapsed}
      </div>
    </div>
  )
}
