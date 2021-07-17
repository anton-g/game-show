import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LibraryQuestion } from '../components/library/LibraryQuestion'
import { useAppState } from '../overmind'

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
  flex-wrap: wrap;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`
