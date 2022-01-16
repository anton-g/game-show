import { ActorRefFrom, send, sendParent, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { Player } from '../components/admin/Admin'
import { Question } from '../overmind/types'
import { TimerActor, timerMachine } from './timerMachine'

export const createQuestionMachine = (question: Question) => {
  const questionModel = createModel(
    {
      question: question,
      timerRef: null! as TimerActor,
      customReveal: true,
      activeTeam: null as Player['id'] | null,
    },
    {
      events: {
        START: () => ({}),
        BUZZ: (team: string) => ({ team }),
        CORRECT: () => ({}),
        INCORRECT: () => ({}),
        REVEAL: () => ({}),
        END: () => ({}),
        'TIMER.END': () => ({}),
      },
    }
  )

  // type QuestionEvent = EventFrom<typeof questionModel>

  const questionMachine = questionModel.createMachine({
    id: 'question',
    initial: 'intro',
    context: questionModel.initialContext,
    states: {
      intro: {
        entry: questionModel.assign({
          timerRef: () => spawn(timerMachine, 'timer'),
        }),
        on: {
          START: 'idle',
        },
      },
      idle: {
        entry: send({ type: 'START' }, { to: 'timer' }),
        on: {
          BUZZ: {
            actions: questionModel.assign({
              activeTeam: (_, event) => event.team,
            }),
            target: 'buzzed',
          },
          'TIMER.END': 'waitingForReveal',
        },
      },
      buzzed: {
        entry: send({ type: 'PAUSE' }, { to: 'timer' }),
        on: {
          CORRECT: {
            actions: sendParent((context) => ({
              type: 'QUESTION.SCORE',
              team: context.activeTeam,
              score: context.question.scoring.value,
            })),
            target: 'waitingForReveal',
          },
          INCORRECT: {
            actions: questionModel.assign({
              activeTeam: null,
            }),
            target: 'idle',
          },
        },
      },
      waitingForReveal: {
        always: {
          target: 'revealed',
          cond: (context) => !context.customReveal,
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
        entry: sendParent('QUESTION.END'),
      },
    },
  })

  return questionMachine
}

export type QuestionActor = ActorRefFrom<
  ReturnType<typeof createQuestionMachine>
>
