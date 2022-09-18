import { EmittedFrom } from 'xstate'
import { QuestionState } from '../../../machines/questionMachine'
import { TimerActor } from '../../../machines/timerMachine'
import { Question } from '../../../overmind/types'
import { ImageQuestionPlayer } from './ImageQuestionPlayer'
import { TextQuestionPlayer } from './TextQuestionPlayer'

type QuestionPlayerFactoryProps = {
  question: Question
  machineState: QuestionState
  timerState: EmittedFrom<TimerActor>
}

export function QuestionPlayerFactory({
  question,
  machineState,
  timerState,
}: QuestionPlayerFactoryProps) {
  switch (question.type) {
    case 'IMAGE':
      return (
        <ImageQuestionPlayer
          question={question}
          machineState={machineState}
          timerState={timerState}
        ></ImageQuestionPlayer>
      )
    case 'SOUND':
      return <div>sound</div>
    case 'TEXT':
      return (
        <TextQuestionPlayer
          question={question}
          machineState={machineState}
        ></TextQuestionPlayer>
      )
    case 'VIDEO':
      return <div>video</div>
    default:
      const _exhaustiveCheck: never = question
      return _exhaustiveCheck
  }
}
