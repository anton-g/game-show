import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import type { Question } from '../../overmind/types'
import { AnswerType } from './AnswerType'
import { QuestionTypeIcon } from './QuestionTypeIcon'
import { TableQuestionAnswer } from './TableQuestionAnswer'

type ListMode = 'LINK' | 'SELECT'

type Props = {
  questions: Question[]
  mode: ListMode
} & (LinkModeProps | SelectModeProps)

type LinkModeProps = {
  mode: 'LINK'
}

type SelectModeProps = {
  mode: 'SELECT'
  onSelect: (questionId: Question['id']) => void
}

export function QuestionList(props: Props) {
  const { mode, questions } = props

  const handleKeyUp = (e: React.KeyboardEvent, questionId: Question['id']) => {
    if (props.mode === 'LINK') return

    if (e.key === 'Enter' || e.key === ' ') {
      props.onSelect(questionId)
    }
  }

  const handleSelect = (questionId: Question['id']) => {
    if (props.mode === 'LINK') return

    props.onSelect(questionId)
  }

  return (
    <Table>
      <TableHead>
        <HeadRow>
          <HeadCell>Type</HeadCell>
          <HeadCell>Question</HeadCell>
          <HeadCell>Answer</HeadCell>
          <HeadCell>Answer Type</HeadCell>
          <NumericHeadCell>Score</NumericHeadCell>
        </HeadRow>
      </TableHead>
      <tbody>
        {questions.map((q) => (
          <TableRow
            key={q.id}
            selectMode={props.mode === 'SELECT'}
            onClick={() => handleSelect(q.id)}
            onKeyUp={(e) => handleKeyUp(e, q.id)}
          >
            <IconCell type={q.type}>
              <QuestionTypeIcon question={q}></QuestionTypeIcon>
            </IconCell>
            <TextCell>
              {mode === 'LINK' ? (
                <QuestionLink to={`/library/question/${q.id}`}>
                  {q.question}
                </QuestionLink>
              ) : (
                q.question
              )}
            </TextCell>
            <TextCell>
              <TableQuestionAnswer question={q}></TableQuestionAnswer>
            </TextCell>
            <TextCell>
              <AnswerType question={q}></AnswerType>
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
  min-width: min(900px, 95%);
`

const TableHead = styled.thead`
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
`

const HeadRow = styled.tr``

const TextCell = styled.td`
  padding: 8px 12px;
`

const NumericCell = styled(TextCell)`
  text-align: right;
  padding-right: 12px;
`

const IconCell = styled.td<{ type: Question['type'] }>`
  border-left: 4px solid ${({ theme, type }) => theme.colors.types[type]};
  padding: 4px;
  text-align: center;
  vertical-align: middle;
`

const HeadCell = styled.th`
  padding: 8px;
`

const NumericHeadCell = styled(HeadCell)`
  text-align: right;
`

const QuestionLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray12};
`

const TableRow = styled.tr.attrs<{ selectMode: boolean }>(
  ({ selectMode, ...rest }) => ({
    tabIndex: selectMode ? 0 : undefined,
    role: selectMode ? 'button' : undefined,
    onClick: selectMode ? rest.onClick : undefined,
    onKeyUp: selectMode ? rest.onKeyUp : undefined,
  })
)<{
  selectMode: boolean
}>`
  vertical-align: top;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.gray3};
  }

  ${(p) =>
    p.selectMode &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary4};
        cursor: pointer;
      }
    `}
`
