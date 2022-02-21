import { useActor } from '@xstate/react'
import { QuestionSegmentPlayer } from '../components/player/segmentPlayers/QuestionSegmentPlayer'
import { ScoreSegmentPlayer } from '../components/player/segmentPlayers/ScoreSegmentPlayer'
import { QuestionSegmentAdmin } from '../components/presentation/QuestionSegmentAdmin'
import { ScoreSegmentAdmin } from '../components/presentation/ScoreSegmentAdmin'
import { SegmentMachineId } from '../machines/machines.types'
import { QuestionSegmentActor } from '../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../machines/scoreSegmentMachine'
import { AnySegmentActor } from '../machines/showMachine'
import { useQuestionFromMachine } from './useQuestionFromMachine'

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

  const { info } = useQuestionFromMachine(state.context.questionMachineRef)

  switch (state.value) {
    case 'intro':
      return <div>Showing segment intro</div>
    case 'question':
      return info
    case 'end':
      return <div>Segment ended</div>
    default:
      throw Error('Unhandled machine state')
  }
}
