import { ActorRefFrom, sendParent } from 'xstate'
import { createModel } from 'xstate/lib/model'

export const timerModel = createModel(
  {
    elapsed: 0,
    duration: 5,
    interval: 0.1,
  },
  {
    events: {
      TICK: (value: number) => ({ value }),
      PAUSE: () => ({}),
      START: () => ({}),
    },
  }
)

export const timerMachine = timerModel.createMachine({
  id: 'timer',
  initial: 'paused',
  context: timerModel.initialContext,
  states: {
    running: {
      invoke: {
        src: (context) => (cb) => {
          const interval = setInterval(() => {
            cb('TICK')
          }, 1000 * context.interval)

          return () => {
            clearInterval(interval)
          }
        },
      },
      always: {
        target: 'ended',
        cond: (context) => {
          return context.elapsed >= context.duration
        },
      },
      on: {
        TICK: {
          actions: timerModel.assign({
            elapsed: (context) =>
              +(context.elapsed + context.interval).toFixed(2),
          }),
        },
        PAUSE: {
          target: 'paused',
        },
      },
    },
    paused: {
      on: {
        START: {
          target: 'running',
          cond: (context) => context.elapsed < context.duration,
        },
      },
    },
    ended: {
      type: 'final',
      entry: sendParent('TIMER.END'),
    },
  },
})

export type TimerActor = ActorRefFrom<typeof timerMachine>
