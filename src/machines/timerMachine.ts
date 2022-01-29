import { ActorRefFrom, assign, createMachine, sendParent } from 'xstate'

export const timerMachine = createMachine(
  {
    context: { elapsed: 0, duration: 30, interval: 0.1 },
    tsTypes: {} as import('./timerMachine.typegen').Typegen0,
    schema: {
      context: {} as { elapsed: number; duration: number; interval: number },
      events: {} as { type: 'START' } | { type: 'TICK' } | { type: 'PAUSE' },
    },
    id: 'timer',
    initial: 'paused',
    states: {
      running: {
        invoke: {
          id: 'interval',
          src: 'interval',
        },
        always: {
          cond: 'hasEnded',
          target: '#timer.ended',
        },
        on: {
          TICK: {
            actions: 'update',
            target: '#timer.running',
          },
          PAUSE: {
            target: '#timer.paused',
          },
        },
      },
      paused: {
        on: {
          START: {
            cond: 'notEnded',
            target: '#timer.running',
          },
        },
      },
      ended: {
        entry: 'notifyParent',
        type: 'final',
      },
    },
  },
  {
    actions: {
      notifyParent: sendParent('TIMER.END'),
      update: assign({
        elapsed: (context) => +(context.elapsed + context.interval).toFixed(2),
      }),
    },
    guards: {
      notEnded: (context) => context.elapsed < context.duration,
      hasEnded: (context) => context.elapsed >= context.duration,
    },
    services: {
      interval: (context) => (cb) => {
        const interval = setInterval(() => {
          cb('TICK')
        }, 1000 * context.interval)

        return () => {
          clearInterval(interval)
        }
      },
    },
  }
)

export type TimerActor = ActorRefFrom<typeof timerMachine>
