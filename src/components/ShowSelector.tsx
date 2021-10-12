import styled from 'styled-components'
import { useActions, useAppState } from '../overmind'
import { Show } from '../overmind/types'

export function ShowSelector() {
  const { shows, selectedShow } = useAppState()
  const { selectShow } = useActions()

  return (
    <>
      {Object.values(shows).map((show) => (
        <ShowCard
          key={show.id}
          selected={show === selectedShow}
          show={show}
          onClick={() => selectShow(show.id)}
        ></ShowCard>
      ))}
    </>
  )
}

type Props = {
  show: Show
  onClick: () => void
  selected: boolean
}

function ShowCard({ show, onClick, selected }: Props) {
  return (
    <Card selected={selected} onClick={onClick}>
      <h1>{show.name}</h1>
      <p>{show.segments.length} segments</p>
    </Card>
  )
}

const Card = styled.button<{ selected: boolean }>`
  cursor: pointer;
  background: none;
  border-radius: 8px;
  border: none;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary5 : 'transparent'};
  box-shadow: 0 1px 3px hsl(0 0% 0% / 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
