import { useActor } from '@xstate/react'
import { PresentationMessage } from '../../hooks/usePresentation'
import { QuestionActor } from '../../machines/questionMachine'
import { ControlPanel } from './ControlPanel'

type QuestionAdminProps = {
  actor: QuestionActor
  sendMessage: (msg: PresentationMessage) => void
}

export function QuestionAdmin({ actor, sendMessage }: QuestionAdminProps) {
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
    </ControlPanel>
  )
}
