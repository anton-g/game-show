import { useMachine } from '@xstate/react'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ActorRef } from 'xstate'
import usePresentation, {
  PresentationMessage,
} from '../../hooks/usePresentation'
import { createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { Show } from '../../overmind/types'
import { Players } from '../admin/Admin'
import { Player } from '../player/Player'

export function PresentationControl() {
  const show = useAppState((state) => state.selectedShow)
  const [players, setPlayers] = useState<Players>()
  const { addMessageHandler } = usePresentation()

  useEffect(() => {
    addMessageHandler((data: PresentationMessage) => {
      if (data.type !== 'PLAYERS') return

      setPlayers(data.payload)
    })
  }, [addMessageHandler])

  if (!show || !players) return null

  return <Presentation show={show} players={players} />
}

type PresentationProps = {
  show: Show
  players: Players
}

function Presentation({ show, players }: PresentationProps) {
  const machine = useMemo(
    () => createShowMachine(show, players),
    [show, players]
  )
  const [state, send] = useMachine(machine)
  const { addMessageHandler } = usePresentation()

  useEffect(() => {
    addMessageHandler((data: PresentationMessage) => {
      if (data.type !== 'EVENT') return
      console.log('Running handler for event', data.payload.event)

      if (data.payload.machine === machine.id) {
        const event = data.payload.event as Parameters<typeof send>
        send(...event)
      } else {
        const children = Object.values(state.children)
        const targetActor = findChild(children, data.payload.machine)

        if (!targetActor) return // something went wrong :(

        const event = data.payload.event as Parameters<typeof targetActor.send>
        targetActor?.send(...event)
      }
    })
  }, [addMessageHandler, send, machine.id, state.children])

  return (
    <Wrapper>
      <Player showState={state} />
    </Wrapper>
  )
}

const findChild = (
  actors: ActorRef<any, any>[],
  targetMachineId: string
): ActorRef<any, any> | null => {
  console.log('Looking for child: ', targetMachineId)
  for (const actor of actors) {
    console.log('Is this the child:', actor.id)
    if (actor.id === targetMachineId) {
      console.log('Yep!')
      return actor
    } else {
      console.log('No, then does this child have children?')
      const snapshot = actor.getSnapshot()
      if (!snapshot) continue

      const child = findChild(Object.values(snapshot.children), targetMachineId)
      if (child) return child
    }
  }

  console.log('Nope, no children either.')

  return null
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
