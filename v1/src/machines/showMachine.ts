import { spawn, assign, createMachine } from 'xstate'
import { forwardTo, stop } from 'xstate/lib/actions'
import {
  PlayerType,
  Players,
} from '../components/presentation/PresentationsControl'
import { Segment, Show } from '../overmind/types'
import { QuestionActor, QuestionMachine } from './questionMachine'
import {
  QuestionSegmentActor,
  createQuestionSegmentMachine,
} from './questionSegmentMachine'
import {
  ScoreSegmentActor,
  createScoreSegmentMachine,
} from './scoreSegmentMachine'
import { TimerActor } from './timerMachine'

export type AnySegmentActor = QuestionSegmentActor | ScoreSegmentActor
export type AnyQuestionActor = QuestionActor
export type AnyQuestionMachine = AnyQuestionActor | QuestionMachine
export type AnyActor = AnySegmentActor | AnyQuestionActor | TimerActor

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
          | { type: 'BUZZ'; team: string }
          | { type: 'SEGMENT.END' }
          | {
              type: 'SEGMENT.SCORE'
              scores: { team: PlayerType['id']; score: number }[]
            },
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
            BUZZ: {
              actions: 'forwardBuzz',
            },
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
              ? spawn(createQuestionSegmentMachine(segment), segment.id)
              : spawn(
                  createScoreSegmentMachine(segment, context.players),
                  segment.id
                )

          return {
            currentSegmentIndex: nextSegmentIndex,
            segmentMachineRef: ref,
          }
        }),
        assignScore: assign((context, event) => {
          const updatedPlayers = context.players

          for (const score of event.scores) {
            updatedPlayers[score.team].score += score.score
          }

          return {
            players: updatedPlayers,
          }
        }),
        removeSegmentActor: assign((context) => ({
          segmentMachineRef: null,
        })),
        stopSegmentActor: stop((context) => context.segmentMachineRef!),
        forwardBuzz: forwardTo((context) => context.segmentMachineRef!),
      },
      guards: {
        outOfSegments: (context) =>
          context.currentSegmentIndex >= context.segments.length - 1,
      },
    }
  )

  return showMachine
}
