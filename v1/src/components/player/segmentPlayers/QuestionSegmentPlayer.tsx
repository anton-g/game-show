import { useActor } from '@xstate/react'
import { useQuestionFromMachine } from '../../../hooks/useQuestionFromMachine'
import { QuestionSegmentActor } from '../../../machines/questionSegmentMachine'

type QuestionSegmentPlayerProps = {
  machine: QuestionSegmentActor
}

export function QuestionSegmentPlayer({ machine }: QuestionSegmentPlayerProps) {
  const [state] = useActor(machine)
  const segment = state.context.segment

  const { player } = useQuestionFromMachine(state.context.questionMachineRef)

  return player ? player : <div>{segment.name}</div>
}
