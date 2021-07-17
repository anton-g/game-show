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
import styled from 'styled-components'
import { useAppState } from '../../../overmind'
import { Question } from '../../../overmind/state'

type Props = {
  filter: string
}

export function LibraryTable({ filter }: Props) {
  const { questionsList } = useAppState()

  const filteredQuestions = questionsList.filter((x) =>
    x.question.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <Table>
      <TableHead>
        <HeadRow>
          <HeadCell>Type</HeadCell>
          <HeadCell>Question</HeadCell>
          <HeadCell>Answer</HeadCell>
          <HeadCell>Answer Type</HeadCell>
          <HeadCell>Score</HeadCell>
        </HeadRow>
      </TableHead>
      <tbody>
        {filteredQuestions.map((q) => (
          <TableRow key={q.id}>
            <IconCell type={q.type}>
              <TableQuestionType question={q}></TableQuestionType>
            </IconCell>
            <TextCell>
              <QuestionLink to={`/library/question/${q.id}`}>
                {q.question}
              </QuestionLink>
            </TextCell>
            <TextCell>
              <TableQuestionAnswer question={q}></TableQuestionAnswer>
            </TextCell>
            <TextCell>
              <TableAnswerType question={q}></TableAnswerType>
            </TextCell>
            <NumericCell style={{ textAlign: 'right' }}>
              {q.scoring.value}
            </NumericCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  table-layout: auto;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
`

const HeadRow = styled.tr``

const TableRow = styled.tr`
  vertical-align: top;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`

const TextCell = styled.td`
  padding: 4px 8px;
`

const NumericCell = styled(TextCell)`
  text-align: right;
  padding-right: 12px;
`

const IconCell = styled.td<{ type: Question['type'] }>`
  border-left: 4px solid ${({ theme, type }) => theme.colors.types[type]};
  padding: 4px;
  text-align: center;
`

const HeadCell = styled.th`
  padding: 4px;
`

const QuestionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray12};
`

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
