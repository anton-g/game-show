import {
  DownloadIcon,
  HamburgerMenuIcon,
  HandIcon,
} from '@radix-ui/react-icons'
import { Question } from '../../overmind/state'

export function AnswerType({ question }: { question: Question }) {
  switch (question.answer.type) {
    case 'BUZZ_SINGLE':
      return (
        <>
          <DownloadIcon></DownloadIcon> Buzzer
        </>
      )
    case 'OPTIONS_SINGLE':
      return (
        <>
          <HamburgerMenuIcon></HamburgerMenuIcon> Single choice
        </>
      )
    case 'PHYSICAL':
      return (
        <>
          <HandIcon></HandIcon> Physical
        </>
      )
  }
}
