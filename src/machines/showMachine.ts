import { spawn } from 'xstate'
import { stop } from 'xstate/lib/actions'
import { assign } from 'xstate/lib/actionTypes'
import { createModel } from 'xstate/lib/model'
import { ModelContextFrom } from 'xstate/lib/model.types'
import { Player, Players } from '../components/admin/Admin'
import { Show } from '../overmind/types'
import {
  QuestionSegmentActor,
  createQuestionSegmentMachine,
} from './questionSegmentMachine'
import {
  ScoreSegmentActor,
  createScoreSegmentMachine,
} from './scoreSegmentMachine'

export type AnySegmentActor = QuestionSegmentActor | ScoreSegmentActor

export const createShowMachine = (show: Show, players: Players) => {
  const showModel = createModel(
    {
      show: show,
      players: players,
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
        'SEGMENT.SCORE': ({
          team,
          score,
        }: {
          team: Player['id']
          score: number
        }) => ({ team, score }),
      },
    }
  )

  type ShowMachineContext = ModelContextFrom<typeof showModel>

  // Workaround due to weird typings ;(
  // Would be fantastic if this could be put in actions instead but: https://github.com/statelyai/xstate/pull/2426/files
  const nextSegmentAssign = (context: ShowMachineContext) => {
    const nextSegmentIndex = context.currentSegmentIndex + 1

    const segment = context.segments[nextSegmentIndex]
    if (!segment) return { currentSegmentIndex: nextSegmentIndex }

    const machine =
      segment.type === 'QUESTIONS'
        ? createQuestionSegmentMachine(segment)
        : createScoreSegmentMachine(segment, context.players)
    const ref = spawn(machine)

    return {
      currentSegmentIndex: nextSegmentIndex,
      segmentMachineRef: ref as AnySegmentActor, // This shouldn't be needed? :(
    }
  }

  const showMachine = showModel.createMachine({
    id: 'show',
    preserveActionOrder: true, // TODO remove in v5
    initial: 'intro',
    context: showModel.initialContext,
    states: {
      intro: {
        on: {
          NEXT: 'segment',
        },
      },
      segment: {
        entry: showModel.assign(nextSegmentAssign),
        exit: stop((context) => context.segmentMachineRef!),
        on: {
          NEXT: [
            {
              cond: (context) =>
                context.currentSegmentIndex >= context.segments.length - 1,
              target: 'end',
            },
            {
              target: 'segment',
            },
          ],
          'SEGMENT.SCORE': {
            actions: showModel.assign((context, event) => {
              const updatedPlayers = context.players
              updatedPlayers[event.team].score += event.score
              return {
                players: updatedPlayers,
              }
            }),
          },
          'SEGMENT.END': [
            {
              cond: (context) =>
                context.currentSegmentIndex >= context.segments.length - 1,
              target: 'end',
            },
            {
              target: 'segment',
            },
          ],
        },
      },
      end: {
        entry: showModel.assign(() => ({ segmentMachineRef: null })),
        type: 'final',
      },
    },
  })

  return showMachine
}
