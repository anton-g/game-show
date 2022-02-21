import { QuestionPlayer } from '../components/player/QuestionPlayer'
import { QuestionAdmin } from '../components/presentation/QuestionAdmin'
import { QuestionMachineId } from '../machines/machines.types'
import { QuestionActor } from '../machines/questionMachine'
import { AnyQuestionActor } from '../machines/showMachine'
import { getQuestionAnswer } from '../utils/question-utils'
import { PresentationMessage } from './usePresentation'

export function useQuestionFromMachine(
  machine: AnyQuestionActor | null | undefined,
  send: (msg: PresentationMessage) => void = () => {}
) {
  if (!machine) {
    return {
      player: null,
      admin: null,
      info: null,
    }
  }

  const machineId = machine.getSnapshot()?.machine?.id as QuestionMachineId

  switch (machineId) {
    case QuestionMachineId.Question:
      return {
        player: <QuestionPlayer machine={machine} />,
        admin: <QuestionAdmin actor={machine} sendMessage={send} />,
        info: <QuestionInfo actor={machine} />,
      }
  }
}

function QuestionInfo({ actor }: { actor: QuestionActor }) {
  const question = actor.getSnapshot()?.context.question

  if (!question) return null

  return (
    <div>
      <h2>{question.question}</h2>
      <p>{getQuestionAnswer(question)}</p>
      <p style={{ fontStyle: 'italic' }}>{question.lore}</p>
    </div>
  )
}
