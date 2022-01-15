import { ActorRefFrom, sendParent } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { Segment } from '../overmind/types'

export const createScoreSegmentMachine = (segment: Segment) => {
  const scoreSegmentModel = createModel({
    segment: segment,
  })

  return scoreSegmentModel.createMachine({
    id: 'scoreSegment',
    initial: 'hidden',
    context: scoreSegmentModel.initialContext,
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
        entry: sendParent('SEGMENT.END'),
      },
    },
  })
}

export type ScoreSegmentActor = ActorRefFrom<
  ReturnType<typeof createScoreSegmentMachine>
>
