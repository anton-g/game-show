import { QuestionSegmentPlayer } from '../components/player/segmentPlayers/QuestionSegmentPlayer'
import { ScoreSegmentPlayer } from '../components/player/segmentPlayers/ScoreSegmentPlayer'
import { QuestionSegmentAdmin } from '../components/presentation/QuestionSegmentAdmin'
import { ScoreSegmentAdmin } from '../components/presentation/ScoreSegmentAdmin'
import { QuestionSegmentActor } from '../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../machines/scoreSegmentMachine'
import { AnySegmentActor } from '../machines/showMachine'

export function useSegmentFromMachine(machine: AnySegmentActor | null) {
  if (!machine) {
    return {
      player: null,
      admin: null,
    }
  }

  const machineId = machine.getSnapshot()?.machine?.id
  switch (machineId) {
    case 'questionSegment':
      return {
        player: (
          <QuestionSegmentPlayer
            machine={machine as QuestionSegmentActor}
          ></QuestionSegmentPlayer>
        ),
        admin: (
          <QuestionSegmentAdmin
            actor={machine as QuestionSegmentActor}
          ></QuestionSegmentAdmin>
        ),
      }
    case 'scoreSegment':
      return {
        player: (
          <ScoreSegmentPlayer
            machine={machine as ScoreSegmentActor}
          ></ScoreSegmentPlayer>
        ),
        admin: (
          <ScoreSegmentAdmin
            actor={machine as ScoreSegmentActor}
          ></ScoreSegmentAdmin>
        ),
      }
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}
