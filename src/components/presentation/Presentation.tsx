import { useMachine } from '@xstate/react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
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
  const machine = createShowMachine(show, players)
  const [state, send] = useMachine(machine)
  const { addMessageHandler } = usePresentation()

  useEffect(() => {
    addMessageHandler((data: PresentationMessage) => {
      if (data.type !== 'EVENT') return

      const event = data.payload.event as Parameters<typeof send>
      send(...event)
    })
  }, [addMessageHandler, send])

  return (
    <Wrapper>
      <Player showState={state} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
