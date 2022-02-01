import { useActor } from '@xstate/react'
import styled from 'styled-components'
import { StateFrom } from 'xstate'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'

type PlayerProps = {
  showState: StateFrom<ReturnType<typeof createShowMachine>>
}

export function Player({ showState }: PlayerProps) {
  if (showState.matches('loading'))
    return (
      <Wrapper>
        <h3>Loading</h3>
      </Wrapper>
    )
  if (showState.matches('ready'))
    return (
      <Wrapper>
        <h3>ready</h3>
      </Wrapper>
    )
  if (showState.matches('intro'))
    return (
      <Wrapper>
        <h3>{showState.context.show.name}</h3>
      </Wrapper>
    )

  if (showState.matches('segment') && showState.context.segmentMachineRef) {
    return (
      <Wrapper>
        <SegmentPlayerFactory
          machine={showState.context.segmentMachineRef}
        ></SegmentPlayerFactory>
      </Wrapper>
    )
  }

  return <h3>end</h3>
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: ${({ theme }) => theme.colors.gray1};
  background-size: 20px 20px;
  background-image: repeating-linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.gray3} 0,
    ${({ theme }) => theme.colors.gray3} 2px,
    ${({ theme }) => theme.colors.gray1} 0,
    ${({ theme }) => theme.colors.gray1} 50%
  );
`

function SegmentPlayerFactory({ machine }: { machine: AnySegmentActor }) {
  const machineId = machine.getSnapshot()?.machine?.id
  switch (machineId) {
    case 'questionSegment':
      return (
        <QuestionSegmentPlayer
          machine={machine as QuestionSegmentActor}
        ></QuestionSegmentPlayer>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentPlayer
          machine={machine as ScoreSegmentActor}
        ></ScoreSegmentPlayer>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}

type ScoreSegmentPlayerProps = {
  machine: ScoreSegmentActor
}

function ScoreSegmentPlayer({ machine }: ScoreSegmentPlayerProps) {
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

type QuestionSegmentPlayerProps = {
  machine: QuestionSegmentActor
}

function QuestionSegmentPlayer({ machine }: QuestionSegmentPlayerProps) {
  const [state] = useActor(machine)
  const segment = state.context.segment

  return (
    <div>
      {state.context.questionMachineRef ? (
        <QuestionPlayer
          machine={state.context.questionMachineRef}
        ></QuestionPlayer>
      ) : (
        segment.name
      )}
    </div>
  )
}

type QuestionPlayerProps = {
  machine: QuestionActor
}

function QuestionPlayer({ machine }: QuestionPlayerProps) {
  const [state] = useActor(machine)
  const [timerState] = useActor(state.context.timerRef!)
  const question = state.context.question

  const { elapsed } = timerState.context

  return (
    <div>
      <h3>{question.question}</h3>
      <div>
        Current state: {state.value}, {elapsed && `Timer: ${elapsed}`}
      </div>
    </div>
  )
}
