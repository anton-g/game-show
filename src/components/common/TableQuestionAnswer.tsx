import type { Question } from '../../overmind/types'

export function TableQuestionAnswer({ question }: { question: Question }) {
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
