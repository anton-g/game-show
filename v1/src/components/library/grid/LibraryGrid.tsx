import styled from 'styled-components'
import { useAppState } from '../../../overmind'
import { GridQuestion } from './GridQuestion'

export function LibraryGrid() {
  const { questionsList } = useAppState()

  return (
    <Questions>
      {questionsList.map((q) => (
        <GridQuestion
          key={q.id}
          to={`/library/question/${q.id}`}
          question={q}
        ></GridQuestion>
      ))}
    </Questions>
  )
}

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
