import { useActor } from '@xstate/react'
import { QuestionActor } from '../../machines/questionMachine'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor } from '../../machines/showMachine'

export function SegmentPlayerFactory({
  machine,
}: {
  machine: AnySegmentActor
}) {
  switch (
    (machine as any).machine.id // TODO fix types
  ) {
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
  // const segment = state.context.segment

  return (
    <div>
      <h3>Scores</h3>
      {state.matches('visible') && (
        <ol>
          {Object.values(state.context.players)
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
