import { useActor } from '@xstate/react'
import { ScoreSegmentActor } from '../../machines/scoreSegmentMachine'
import { ControlPanel } from './ControlPanel'
import { usePresentationContext } from './PresentationsControl'

type ScoreSegmentAdminProps = {
  actor: ScoreSegmentActor
}

export function ScoreSegmentAdmin({ actor }: ScoreSegmentAdminProps) {
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
    <ControlPanel title="Score controls">
      <h3>segment {segment.name}</h3>
      <button disabled={!state.can('NEXT')} onClick={() => send('NEXT')}>
        next
      </button>{' '}
      Current state: {state.value}
    </ControlPanel>
  )
}
