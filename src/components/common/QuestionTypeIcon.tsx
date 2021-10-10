import {
  ImageIcon,
  LetterCaseCapitalizeIcon,
  SpeakerLoudIcon,
  VideoIcon,
} from '@radix-ui/react-icons'
import { Question } from '../../overmind/state'

export function QuestionTypeIcon({ question }: { question: Question }) {
  switch (question.type) {
    case 'TEXT':
      return <LetterCaseCapitalizeIcon></LetterCaseCapitalizeIcon>
    case 'IMAGE':
      return <ImageIcon></ImageIcon>
    case 'VIDEO':
      return <VideoIcon></VideoIcon>
    case 'SOUND':
      return <SpeakerLoudIcon></SpeakerLoudIcon>
  }
}
