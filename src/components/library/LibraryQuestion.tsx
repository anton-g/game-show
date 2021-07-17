import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Question } from '../../overmind/state'
import { AnswerTypeIcon } from './AnswerTypeIcon'
import { QuestionTypeIcon } from './QuestionTypeIcon'

export function LibraryQuestion({
  question,
  to,
}: {
  question: Question
  to: string
}) {
  return (
    <QuestionWrapper to={to} type={question.type}>
      <LibraryQuestionContent>
        <QuestionTitle>{question.question}</QuestionTitle>
        <LibraryQuestionAnswer question={question}></LibraryQuestionAnswer>
      </LibraryQuestionContent>
      <LibraryQuestionFooter question={question}></LibraryQuestionFooter>
    </QuestionWrapper>
  )
}

function LibraryQuestionAnswer({ question }: { question: Question }) {
  switch (question.answer.type) {
    case 'BUZZ_SINGLE':
      return <p>{question.answer.value}</p>
    case 'OPTIONS_SINGLE':
      return <p>{question.answer.options[question.answer.correctOption]}</p>
  }
}

const LibraryQuestionContent = styled.div`
  padding: 8px 16px 16px;
  display: flex;
  flex-direction: column;
`

function LibraryQuestionFooter({ question }: { question: Question }) {
  return (
    <FooterWrapper>
      <QuestionTypeIcon type={question.type}></QuestionTypeIcon>
      <AnswerTypeIcon type={question.answer.type}></AnswerTypeIcon>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};
  padding: 8px 16px;
`

const QuestionWrapper = styled(Link)<{ type: Question['type'] }>`
  display: flex;
  color: inherit;
  text-decoration: none;
  flex-direction: column;
  box-shadow: 0px 1px 3px hsl(0 0% 0% / 0.2);
  border-radius: 4px;
  border-top: 4px solid ${({ type, theme }) => theme.colors.types[type]};
  transition: box-shadow 0.2s ease-in-out;
  max-width: 300px;

  &:hover {
    box-shadow: 0px 4px 6px hsl(0 0% 0% / 0.2);
  }

  &:active {
    box-shadow: 0px 1px 1px hsl(0 0% 0% / 0.2);
  }
`

const QuestionTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 1.2;
`
