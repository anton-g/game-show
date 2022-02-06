import { PresentationMessage } from '../../hooks/usePresentation'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { AnySegmentActor } from '../../machines/showMachine'
import { Players } from './PresentationsControl'
import { QuestionSegmentAdmin } from './QuestionSegmentAdmin'
import { ScoreSegmentAdmin } from './ScoreSegmentAdmin'

export function SegmentAdminFactory({
  machine,
  players,
  sendMessage,
}: {
  players: Players
  machine: AnySegmentActor
  sendMessage: (msg: PresentationMessage) => void
}) {
  const machineId = machine.getSnapshot()?.machine?.id
  switch (machineId) {
    case 'questionSegment':
      return (
        <QuestionSegmentAdmin
          actor={machine as QuestionSegmentActor}
          players={players}
          sendMessage={sendMessage}
        ></QuestionSegmentAdmin>
      )
    case 'scoreSegment':
      return (
        <ScoreSegmentAdmin
          actor={machine as ScoreSegmentActor}
          sendMessage={sendMessage}
        ></ScoreSegmentAdmin>
      )
    default:
      throw new Error(`Unsupported segment machine ${machine.id}`)
  }
}
