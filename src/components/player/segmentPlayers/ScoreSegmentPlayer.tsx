import { useActor } from '@xstate/react'
import styled from 'styled-components'
import { ScoreSegmentActor } from '../../../machines/scoreSegmentMachine'

type ScoreSegmentPlayerProps = {
  machine: ScoreSegmentActor
}

export function ScoreSegmentPlayer({ machine }: ScoreSegmentPlayerProps) {
  const [state] = useActor(machine)

  const players = Object.values(state.context.players)

  return (
    <Wrapper>
      <h3 style={{ textAlign: 'center' }}>Scores</h3>
      {state.matches('visible') && (
        <List>
          {players
            .sort((a, b) => b.score - a.score)
            .map((x) => (
              <li key={x.id}>
                {x.name} - {x.score} pts
              </li>
            ))}
        </List>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const List = styled.ol`
  font-size: 85%;
`
