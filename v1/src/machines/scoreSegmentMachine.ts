import { ActorRefFrom, createMachine, sendParent } from 'xstate'
import { Players } from '../components/presentation/PresentationsControl'
import { Segment } from '../overmind/types'
import { SegmentMachineId } from './machines.types'

export const createScoreSegmentMachine = (
  segment: Segment,
  players: Players
) => {
  const scoreMachine = createMachine(
    {
      id: SegmentMachineId.ScoreSegment,
      schema: {
        context: {} as {
          segment: Segment
          players: Players
        },
        events: {} as { type: 'NEXT' },
      },
      tsTypes: {} as import('./scoreSegmentMachine.typegen').Typegen0,
      initial: 'hidden',
      context: {
        segment: segment,
        players: players,
      },
      states: {
        hidden: {
          on: {
            NEXT: {
              target: 'visible',
            },
          },
        },
        visible: {
          on: {
            NEXT: {
              target: 'ended',
            },
          },
        },
        ended: {
          type: 'final',
          entry: 'notifyParent',
        },
      },
    },
    {
      actions: {
        notifyParent: sendParent('SEGMENT.END'),
      },
    }
  )

  return scoreMachine
}

export type ScoreSegmentActor = ActorRefFrom<
  ReturnType<typeof createScoreSegmentMachine>
>
