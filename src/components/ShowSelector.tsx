import { useActions, useAppState } from '../overmind'
import { Show } from '../overmind/state'

export function ShowSelector() {
  const { shows } = useAppState()
  const { selectShow } = useActions()

  return (
    <div>
      {Object.values(shows).map((show) => (
        <ShowCard show={show} onClick={() => selectShow(show.id)}></ShowCard>
      ))}
    </div>
  )
}

type Props = {
  show: Show
  onClick: () => void
}

function ShowCard({ show, onClick }: Props) {
  return (
    <button onClick={onClick}>
      <h1>{show.name}</h1>
      <p>{show.segments.length} segments</p>
    </button>
  )
}
