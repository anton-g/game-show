import { ActorRefFrom, EventFrom, send, sendParent, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { TimerActor, timerMachine } from './timerMachine'

const questionModel = createModel(
  {
    timerRef: undefined as TimerActor | undefined,
    customReveal: false,
  },
  {
    events: {
      START: () => ({}),
      BUZZ: () => ({}),
      CORRECT: () => ({}),
      INCORRECT: () => ({}),
      REVEAL: () => ({}),
      END: () => ({}),
      'TIMER.END': () => ({}),
    },
  }
)

export type QuestionEvent = EventFrom<typeof questionModel>

export const questionMachine = questionModel.createMachine({
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
        BUZZ: 'buzzed',
        'TIMER.END': 'waitingForReveal',
      },
    },
    buzzed: {
      entry: send({ type: 'PAUSE' }, { to: 'timer' }),
      on: {
        CORRECT: 'waitingForReveal',
        INCORRECT: 'idle',
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

export type QuestionActor = ActorRefFrom<typeof questionMachine>
