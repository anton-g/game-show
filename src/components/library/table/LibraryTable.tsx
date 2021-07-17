import {
  DownloadIcon,
  HamburgerMenuIcon,
  HandIcon,
  ImageIcon,
  LetterCaseCapitalizeIcon,
  SpeakerLoudIcon,
  VideoIcon,
} from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { useAppState } from '../../../overmind'
import { Question } from '../../../overmind/state'

export function LibraryTable() {
  const { questionsList } = useAppState()

  return (
    <table>
      <thead style={{ textAlign: 'left' }}>
        <tr>
          <th>Type</th>
          <th>Question</th>
          <th>Answer</th>
          <th>Answer Type</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {questionsList.map((q) => (
          <tr key={q.id} style={{ margin: 8, verticalAlign: 'top' }}>
            <td>
              <TableQuestionType question={q}></TableQuestionType>
            </td>
            <td>
              <Link to={`/library/question/${q.id}`}>{q.question}</Link>
            </td>
            <td>
              <TableQuestionAnswer question={q}></TableQuestionAnswer>
            </td>
            <td>
              <TableAnswerType question={q}></TableAnswerType>
            </td>
            <td style={{ textAlign: 'right' }}>{q.scoring.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TableQuestionAnswer({ question }: { question: Question }) {
  switch (question.answer.type) {
    case 'BUZZ_SINGLE':
    case 'PHYSICAL':
      return <span>{question.answer.value}</span>
    case 'OPTIONS_SINGLE':
      return (
        <>
          <span>{question.answer.options[question.answer.correctOption]}</span>{' '}
          <span style={{ color: 'gray' }}>
            of {Object.values(question.answer.options).filter(Boolean).length}
          </span>
        </>
      )
  }
}

function TableQuestionType({ question }: { question: Question }) {
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

function TableAnswerType({ question }: { question: Question }) {
  switch (question.answer.type) {
    case 'BUZZ_SINGLE':
      return <DownloadIcon></DownloadIcon>
    case 'OPTIONS_SINGLE':
      return <HamburgerMenuIcon></HamburgerMenuIcon>
    case 'PHYSICAL':
      return <HandIcon></HandIcon>
  }
}
