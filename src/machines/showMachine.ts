import { ActorRefFrom, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { SegmentActor, segmentMachine } from './segmentMachine'

const showModel = createModel({
  segments: ['a', 'b', 'c'],
  currentSegmentIndex: -1,
  segmentMachineRef: null as SegmentActor | null,
}) // TODO should probably type events but weird TS issue so I give up D: https://github.com/statelyai/xstate/pull/2426/files

export const showMachine = showModel.createMachine(
  {
    id: 'show',
    initial: 'intro',
    context: showModel.initialContext,
    states: {
      intro: {
        on: {
          NEXT: {
            target: 'segment',
            actions: 'nextSegment',
          },
        },
      },
      segment: {
        on: {
          NEXT: {
            target: 'segment',
            actions: 'nextSegment',
          },
          'SEGMENT.END': [
            {
              target: 'end',
              cond: (context) =>
                context.currentSegmentIndex >= context.segments.length - 1,
            },
            {
              target: 'segment',
              actions: 'nextSegment',
            },
          ],
        },
      },
      end: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      nextSegment: showModel.assign((context) => {
        const nextSegmentIndex = context.currentSegmentIndex + 1

        const segment = context.segments[nextSegmentIndex]
        const machine = spawn(segmentMachine, segment)

        return {
          currentSegmentIndex: nextSegmentIndex,
          segmentMachineRef: machine,
        }
      }),
    },
  }
)

export type ShowActor = ActorRefFrom<typeof showMachine>
