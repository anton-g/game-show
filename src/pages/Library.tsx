import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppState } from '../overmind'
import { Question } from '../overmind/state'

export function Library() {
  const { questionsList } = useAppState()

  return (
    <Wrapper>
      <Title>Library</Title>
      <Link to="/library/question">New</Link>
      <Questions>
        {questionsList.map((q) => (
          <LibraryQuestion
            key={q.id}
            to={`/library/question/${q.id}`}
            question={q}
          ></LibraryQuestion>
        ))}
      </Questions>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 16px;
`

const Title = styled.h1``

const Questions = styled.div`
  --gap: 18px;
  display: flex;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`

function LibraryQuestion({ question, to }: { question: Question; to: string }) {
  return (
    <QuestionWrapper to={to} type={question.type}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <QuestionIcon type={question.type}></QuestionIcon>
        <QuestionTitle>{question.question}</QuestionTitle>
      </div>
      <p>Answer: {question.answer.type}</p>
    </QuestionWrapper>
  )
}

const QuestionWrapper = styled(Link)<{ type: Question['type'] }>`
  display: flex;
  color: inherit;
  text-decoration: none;
  flex-direction: column;
  padding: 8px 16px;
  box-shadow: 0px 1px 3px hsl(0 0% 0% / 0.2);
  border-radius: 4px;
  border-top: 4px solid ${({ type, theme }) => theme.colors.types[type]};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 6px hsl(0 0% 0% / 0.2);
  }

  &:active {
    box-shadow: 0px 1px 1px hsl(0 0% 0% / 0.2);
  }
`

const QuestionTitle = styled.h2`
  margin: 0;
  margin-left: 4px;
  padding: 0;
  font-size: 20px;
`

function QuestionIcon({ type }: { type: Question['type'] }) {
  if (type === 'SOUND')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        style={{ width: 20, height: 20 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    )

  if (type === 'TEXT')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ width: 20, height: 20 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    )

  if (type === 'IMAGE')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ width: 20, height: 20 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    )

  if (type === 'VIDEO')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style={{ width: 20, height: 20 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    )

  return null
}
