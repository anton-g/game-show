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

export function PresentationControls() {
  const show = useAppState((state) => state.selectedShow)
  if (!show) return null

  const showMachine = createShowMachine(show, playersMock)

  return <ShowAdmin machine={showMachine} />
}
