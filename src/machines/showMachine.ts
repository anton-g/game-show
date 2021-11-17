import { spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { ModelContextFrom } from 'xstate/lib/model.types'
import { Show } from '../overmind/types'
import {
  QuestionSegmentActor,
  questionSegmentMachine,
  ScoreSegmentActor,
  scoreSegmentMachine,
} from './segmentMachine'

export type AnySegmentActor = QuestionSegmentActor | ScoreSegmentActor

export const createShowMachine = (show: Show) => {
  const showModel = createModel(
    {
      show: show,
      segments: Object.values(show.segments).sort(
        (a, b) => a.position - b.position
      ),
      currentSegmentIndex: -1,
      segmentMachineRef: null as AnySegmentActor | null,
    },
    {
      events: {
        NEXT: () => ({}),
        'SEGMENT.END': () => ({}),
      },
    }
  )

  // Workaround due to weird typings ;(
  // Would be fantastic if this could be put in actions instead but: https://github.com/statelyai/xstate/pull/2426/files
  const nextSegmentAssign = (context: ModelContextFrom<typeof showModel>) => {
    const nextSegmentIndex = context.currentSegmentIndex + 1

    const segment = context.segments[nextSegmentIndex]
    if (!segment) return { currentSegmentIndex: nextSegmentIndex }

    const machine =
      segment.type === 'QUESTIONS'
        ? questionSegmentMachine
        : scoreSegmentMachine
    const ref = spawn(machine)

    return {
      currentSegmentIndex: nextSegmentIndex,
      segmentMachineRef: ref as AnySegmentActor, // This shouldn't be needed? :(
    }
  }

  return showModel.createMachine({
    id: 'show',
    initial: 'intro',
    context: showModel.initialContext,
    states: {
      intro: {
        on: {
          NEXT: {
            target: 'segment',
            actions: showModel.assign(nextSegmentAssign),
          },
        },
      },
      segment: {
        on: {
          NEXT: {
            target: 'segment',
            actions: showModel.assign(nextSegmentAssign),
          },
          'SEGMENT.END': [
            {
              target: 'end',
              cond: (context) =>
                context.currentSegmentIndex >= context.segments.length - 1,
            },
            {
              target: 'segment',
              actions: showModel.assign(nextSegmentAssign),
            },
          ],
        },
      },
      end: {
        type: 'final',
      },
    },
  })
}

// export type ShowActor = ActorRefFrom<typeof showMachine>
