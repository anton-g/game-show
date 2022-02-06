import {
  ActorRefFrom,
  assign,
  createMachine,
  send,
  sendParent,
  spawn,
} from 'xstate'
import { PlayerType } from '../components/presentation/PresentationsControl'
import { Question } from '../overmind/types'
import { TimerActor, timerMachine } from './timerMachine'

export const createQuestionMachine = (question: Question) => {
  const questionMachine = createMachine(
    {
      id: 'question',
      tsTypes: {} as import('./questionMachine.typegen').Typegen0,
      schema: {
        events: {} as
          | { type: 'START' }
          | { type: 'BUZZ'; team: string }
          | { type: 'CORRECT' }
          | { type: 'INCORRECT' }
          | { type: 'REVEAL' }
          | { type: 'END' }
          | { type: 'TIMER.END' },
        context: {} as {
          question: Question
          timerRef: TimerActor
          customReveal: boolean
          activeTeam: PlayerType['id'] | null
        },
      },
      initial: 'intro',
      context: {
        question: question,
        timerRef: null!,
        customReveal: true,
        activeTeam: null,
      },
      states: {
        intro: {
          entry: 'createTimer',
          on: {
            START: 'idle',
          },
        },
        idle: {
          entry: 'startTimer',
          on: {
            BUZZ: {
              actions: 'setTeam',
              target: 'buzzed',
            },
            'TIMER.END': 'waitingForReveal',
          },
        },
        buzzed: {
          entry: 'pauseTimer',
          on: {
            CORRECT: {
              actions: 'updateScore',
              target: 'waitingForReveal',
            },
            INCORRECT: {
              actions: 'resetTeam',
              target: 'idle',
            },
          },
        },
        waitingForReveal: {
          always: {
            target: 'revealed',
            cond: 'ignoreReveal',
          },
          on: {
            REVEAL: 'revealed',
          },
        },
        revealed: {
          on: {
            END: 'ended',
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
        updateScore: sendParent((context) => ({
          type: 'QUESTION.SCORE',
          scores: [
            { team: context.activeTeam, score: context.question.scoring.value },
          ],
        })),
        createTimer: assign({
          timerRef: (context) => spawn(timerMachine, 'timer'),
        }),
        startTimer: send(
          { type: 'START' },
          { to: (context) => context.timerRef }
        ),
        pauseTimer: send(
          { type: 'PAUSE' },
          { to: (context) => context.timerRef }
        ),
        setTeam: assign({
          activeTeam: (_, event) => event.team,
        }),
        resetTeam: assign((context) => ({
          activeTeam: null,
        })),
        notifyParent: sendParent('QUESTION.END'),
      },
      guards: {
        ignoreReveal: (context) => !context.customReveal,
      },
    }
  )

  return questionMachine
}

export type QuestionActor = ActorRefFrom<
  ReturnType<typeof createQuestionMachine>
>
