import { useActor } from '@xstate/react'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { QuestionPlayer } from './QuestionPlayer'

type QuestionSegmentPlayerProps = {
  machine: QuestionSegmentActor
}

export function QuestionSegmentPlayer({ machine }: QuestionSegmentPlayerProps) {
  const [state] = useActor(machine)
  const segment = state.context.segment

  return state.context.questionMachineRef ? (
    <QuestionPlayer machine={state.context.questionMachineRef}></QuestionPlayer>
  ) : (
    <div>{segment.name}</div>
  )
}
