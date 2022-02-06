import { useActor } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionTimer } from './QuestionTimer'

type QuestionPlayerProps = {
  machine: QuestionActor
}

export function QuestionPlayer({ machine }: QuestionPlayerProps) {
  const [state] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)
  const question = state.context.question

  const { elapsed, duration } = timerState.context

  return (
    <div>
      <QuestionTimer progress={(elapsed / duration) * 100}></QuestionTimer>
      <h3>{question.question}</h3>
      <div>
        Current state: {state.value}, {elapsed && `Timer: ${elapsed}`}
      </div>
    </div>
  )
}
