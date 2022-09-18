import { Question } from '../../../overmind/types'
import { ManualQuestionPlayer } from '../../player/QuestionPlayer'
import { createQuestionMachine } from '../../../machines/questionMachine'

export function QuestionPreview({
  question,
}: {
  question: Question | undefined
}) {
  if (!question) return null
  const machine = createQuestionMachine(question)

  return (
    <>
      <ManualQuestionPlayer machine={machine}></ManualQuestionPlayer>
    </>
  )
}
