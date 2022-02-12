import { useActor } from '@xstate/react'
import { QuestionSegmentPlayer } from '../components/player/segmentPlayers/QuestionSegmentPlayer'
import { ScoreSegmentPlayer } from '../components/player/segmentPlayers/ScoreSegmentPlayer'
import { QuestionSegmentAdmin } from '../components/presentation/QuestionSegmentAdmin'
import { ScoreSegmentAdmin } from '../components/presentation/ScoreSegmentAdmin'
import { SegmentMachineId } from '../machines/machines.types'
import { QuestionActor } from '../machines/questionMachine'
import { QuestionSegmentActor } from '../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../machines/scoreSegmentMachine'
import { AnySegmentActor } from '../machines/showMachine'
import { getQuestionAnswer } from '../utils/question-utils'

export function useSegmentFromMachine(machine: AnySegmentActor | null) {
  if (!machine) {
    return {
      player: null,
      admin: null,
      info: <ShowInfo />,
    }
  }

  const machineId = machine.getSnapshot()?.machine?.id as SegmentMachineId
  switch (machineId) {
    case SegmentMachineId.QuestionSegment:
      return {
        player: (
          <QuestionSegmentPlayer machine={machine as QuestionSegmentActor} />
        ),
        admin: <QuestionSegmentAdmin actor={machine as QuestionSegmentActor} />,
        info: <QuestionSegmentInfo actor={machine as QuestionSegmentActor} />,
      }
    case SegmentMachineId.ScoreSegment:
      return {
        player: <ScoreSegmentPlayer machine={machine as ScoreSegmentActor} />,
        admin: <ScoreSegmentAdmin actor={machine as ScoreSegmentActor} />,
        info: <ScoreSegmentInfo />,
      }
  }
}

function ShowInfo() {
  return <div>Waiting for first segment..</div>
}

function ScoreSegmentInfo() {
  return <div>Showing scores.</div>
}

function QuestionSegmentInfo({ actor }: { actor: QuestionSegmentActor }) {
  const [state] = useActor(actor)

  switch (state.value) {
    case 'intro':
      return <div>Showing segment intro</div>
    case 'question':
      return state.context.questionMachineRef ? (
        <QuestionInfo actor={state.context.questionMachineRef}></QuestionInfo>
      ) : null
    case 'end':
      return <div>Segment ended</div>
    default:
      throw Error('Unhandled machine state')
  }
}

function QuestionInfo({ actor }: { actor: QuestionActor }) {
  const question = actor.getSnapshot()?.context.question

  if (!question) return null

  return (
    <div>
      <h2>{question.question}</h2>
      <p>{getQuestionAnswer(question)}</p>
      <p style={{ fontStyle: 'italic' }}>{question.lore}</p>
    </div>
  )
}
