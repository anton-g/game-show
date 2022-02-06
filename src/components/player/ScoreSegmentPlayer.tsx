import { useActor } from '@xstate/react'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'

type ScoreSegmentPlayerProps = {
  machine: ScoreSegmentActor
}

export function ScoreSegmentPlayer({ machine }: ScoreSegmentPlayerProps) {
  const [state] = useActor(machine)

  const players = Object.values(state.context.players)

  return (
    <div>
      <h3>Scores</h3>
      {state.matches('visible') && (
        <ol>
          {players
            .sort((a, b) => b.score - a.score)
            .map((x) => (
              <li key={x.id}>
                {x.name} - {x.score} pts
              </li>
            ))}
        </ol>
      )}
    </div>
  )
}
