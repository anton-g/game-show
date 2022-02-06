import { useActor } from '@xstate/react'
import { PresentationMessage } from '../../hooks/usePresentation'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { Spacer } from '../common/Spacer'
import { Players } from './PresentationsControl'
import { ControlPanel } from './ControlPanel'
import { QuestionAdmin } from './QuestionAdmin'

type QuestionSegmentAdminProps = {
  actor: QuestionSegmentActor
  players: Players
  sendMessage: (msg: PresentationMessage) => void
}

export function QuestionSegmentAdmin({
  actor,
  players,
  sendMessage,
}: QuestionSegmentAdminProps) {
  const [state, internalSend] = useActor(actor)
  const segment = state.context.segment

  const send = (...params: Parameters<typeof internalSend>) => {
    sendMessage({
      type: 'EVENT',
      payload: { machine: actor.id, event: params },
    })
    internalSend(...params)
  }

  return (
    <div>
      <ControlPanel title="Segment controls">
        <h3>segment {segment.name}</h3>
        <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
          next question
        </button>{' '}
        Current state: {state.value}
      </ControlPanel>
      <Spacer size={16} />
      {state.context.questionMachineRef && (
        <QuestionAdmin
          actor={state.context.questionMachineRef}
          players={players}
          sendMessage={sendMessage}
        ></QuestionAdmin>
      )}
    </div>
  )
}
