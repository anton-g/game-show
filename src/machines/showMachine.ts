import { spawn, assign, createMachine } from 'xstate'
import { stop } from 'xstate/lib/actions'
import { PlayerType, Players } from '../components/admin/Admin'
import { Segment, Show } from '../overmind/types'
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
  const showMachine = createMachine(
    {
      context: {
        show: show,
        players: players,
        segments: Object.values(show.segments).sort(
          (a, b) => a.position - b.position
        ),
        currentSegmentIndex: -1,
        segmentMachineRef: null as AnySegmentActor | null,
      },
      tsTypes: {} as import('./showMachine.typegen').Typegen0,
      schema: {
        context: {} as {
          show: Show
          players: Players
          segments: Segment[]
          currentSegmentIndex: number
          segmentMachineRef: AnySegmentActor | null
        },
        events: {} as
          | { type: 'NEXT' }
          | { type: 'SEGMENT.END' }
          | { type: 'SEGMENT.SCORE'; team: PlayerType['id']; score: number },
      },
      preserveActionOrder: true,
      id: 'show',
      initial: 'loading',
      states: {
        loading: {
          on: {
            NEXT: {
              target: '#show.ready',
            },
          },
        },
        ready: {
          on: {
            NEXT: {
              target: '#show.intro',
            },
          },
        },
        intro: {
          on: {
            NEXT: {
              target: '#show.segment',
            },
          },
        },
        segment: {
          entry: 'assignNextSegment',
          exit: 'stopSegmentActor',
          on: {
            NEXT: [
              {
                cond: 'outOfSegments',
                target: '#show.end',
              },
              {
                target: '#show.segment',
              },
            ],
            'SEGMENT.SCORE': {
              actions: 'assignScore',
            },
            'SEGMENT.END': [
              {
                cond: 'outOfSegments',
                target: '#show.end',
              },
              {
                target: '#show.segment',
              },
            ],
          },
        },
        end: {
          entry: 'removeSegmentActor',
          type: 'final',
        },
      },
    },
    {
      actions: {
        assignNextSegment: assign((context) => {
          const nextSegmentIndex = context.currentSegmentIndex + 1

          const segment = context.segments[nextSegmentIndex]
          if (!segment) return { currentSegmentIndex: nextSegmentIndex }

          const ref =
            segment.type === 'QUESTIONS'
              ? spawn(createQuestionSegmentMachine(segment))
              : spawn(createScoreSegmentMachine(segment, context.players))

          return {
            currentSegmentIndex: nextSegmentIndex,
            segmentMachineRef: ref,
          }
        }),
        assignScore: assign((context, event) => {
          const updatedPlayers = context.players
          updatedPlayers[event.team].score += event.score
          return {
            players: updatedPlayers,
          }
        }),
        removeSegmentActor: assign((context) => ({
          segmentMachineRef: null,
        })),
        stopSegmentActor: stop((context) => context.segmentMachineRef!),
      },
      guards: {
        outOfSegments: (context) =>
          context.currentSegmentIndex >= context.segments.length - 1,
      },
    }
  )

  return showMachine
}
