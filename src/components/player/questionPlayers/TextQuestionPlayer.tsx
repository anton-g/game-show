import { EmittedFrom } from 'xstate'
import { QuestionActor } from '../../../machines/questionMachine'
import { TextQuestion } from '../../../overmind/types'

type TextQuestionPlayerProps = {
  question: TextQuestion
  machineState: EmittedFrom<QuestionActor>
}

export function TextQuestionPlayer({
  question,
  machineState,
}: TextQuestionPlayerProps) {
  switch (machineState.value) {
    case 'intro':
      return null
    case 'idle':
    case 'buzzed':
    case 'waitingForReveal':
    case 'revealed':
      return <h3>{question.question}</h3>
    case 'ended':
    default:
      throw Error('Unhandled machine state')
  }
}
