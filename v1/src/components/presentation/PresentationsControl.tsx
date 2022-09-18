import { createContext, ReactNode, useContext, useMemo } from 'react'
import usePresentation, {
  PresentationMessage,
} from '../../hooks/usePresentation'
import { createShowMachine } from '../../machines/showMachine'
import { useAppState } from '../../overmind'
import { ShowAdmin } from './ShowAdmin'

export type PlayerType = {
  id: string
  name: string
  score: number
}

export type Players = Record<PlayerType['id'], PlayerType>

export const playersMock: Players = {
  '1': {
    id: '1',
    name: 'Crewbb',
    score: 0,
  },
  '2': {
    id: '2',
    name: 'Penelopé Crews',
    score: 0,
  },
  '3': {
    id: '3',
    name: 'Player3',
    score: 0,
  },
  '4': {
    id: '4',
    name: 'Player4',
    score: 0,
  },
}

const PresentationContext = createContext<
  [
    {
      startConnection: (urlParams: string | string[]) => void
      sendMessage: (msg: PresentationMessage) => void
      terminateConnection: () => void
      addMessageHandler: (handler: (msg: PresentationMessage) => void) => void
    },
    Error[]
  ]
>(null!)

export function PresentationMessageProvider({
  children,
}: {
  children: ReactNode
}) {
  const {
    startConnection,
    sendMessage,
    errors,
    terminateConnection,
    addMessageHandler,
  } = usePresentation()

  const handlers = useMemo(
    () => ({
      startConnection,
      sendMessage,
      terminateConnection,
      addMessageHandler,
    }),
    [sendMessage, startConnection, terminateConnection, addMessageHandler]
  )

  return (
    <PresentationContext.Provider value={[handlers, errors]}>
      {children}
    </PresentationContext.Provider>
  )
}

export const usePresentationContext = () => useContext(PresentationContext)

export function PresentationControls() {
  const show = useAppState((state) => state.selectedShow)
  if (!show) return null

  const showMachine = createShowMachine(show, playersMock)

  return (
    <PresentationMessageProvider>
      <ShowAdmin machine={showMachine} />
    </PresentationMessageProvider>
  )
}
