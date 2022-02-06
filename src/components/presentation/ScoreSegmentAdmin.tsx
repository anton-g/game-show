import { useActor } from '@xstate/react'
import { PresentationMessage } from '../../hooks/usePresentation'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { ControlPanel } from './ControlPanel'

type ScoreSegmentAdminProps = {
  actor: ScoreSegmentActor
  sendMessage: (msg: PresentationMessage) => void
}

export function ScoreSegmentAdmin({
  actor,
  sendMessage,
}: ScoreSegmentAdminProps) {
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
    <ControlPanel title="Score controls">
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>{' '}
      Current state: {state.value}
    </ControlPanel>
  )
}
