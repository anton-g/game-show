import { useActor } from '@xstate/react'
import { QuestionSegmentActor } from '../../machines/questionSegmentMachine'
import { Spacer } from '../common/Spacer'
import { ControlPanel } from './ControlPanel'
import { usePresentationContext } from './PresentationsControl'
import { QuestionAdmin } from './QuestionAdmin'

type QuestionSegmentAdminProps = {
  actor: QuestionSegmentActor
}

export function QuestionSegmentAdmin({ actor }: QuestionSegmentAdminProps) {
  const [state, internalSend] = useActor(actor)
  const [{ sendMessage }] = usePresentationContext()

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
          sendMessage={sendMessage}
        ></QuestionAdmin>
      )}
    </div>
  )
}
