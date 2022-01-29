import { useActor } from '@xstate/react'
import { StateFrom } from 'xstate'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor, createShowMachine } from '../../machines/showMachine'

type PlayerProps = {
  showState: StateFrom<ReturnType<typeof createShowMachine>>
}

export function Player({ showState }: PlayerProps) {
  if (showState.matches('loading')) return <h3>Loading</h3>
  if (showState.matches('ready')) return <h3>ready</h3>
  if (showState.matches('intro')) return <h3>{showState.context.show.name}</h3>

  if (showState.matches('segment') && showState.context.segmentMachineRef) {
    return (
      <SegmentPlayerFactory
        machine={showState.context.segmentMachineRef}
      ></SegmentPlayerFactory>
    )
  }

  return <h3>end</h3>
}

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
