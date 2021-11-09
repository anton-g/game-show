import { useActor, useMachine } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import { segmentMachine } from '../../machines/segmentMachine'

export function Player() {
  const [state, send] = useMachine(segmentMachine)

  return (
    <div>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>
      {state.value}
      {state.context.questionMachineRef && (
        <QuestionPlayer
          machine={state.context.questionMachineRef}
        ></QuestionPlayer>
      )}
    </div>
  )
}

function QuestionPlayer({ machine }: { machine: QuestionActor }) {
  const [state, send] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)

  const { elapsed } = timerState.context

  return (
    <div>
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
