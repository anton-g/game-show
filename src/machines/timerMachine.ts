import { ActorRefFrom, assign, createMachine, sendParent } from 'xstate'

export const createTimerMachine = (duration: number) => {
  const timerMachine = createMachine(
    {
      context: {
        enabled: duration > 0,
        elapsed: 0,
        duration: duration,
        interval: 0.1,
      },
      tsTypes: {} as import('./timerMachine.typegen').Typegen0,
      schema: {
        context: {} as {
          enabled: boolean
          elapsed: number
          duration: number
          interval: number
        },
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
            START: [
              {
                cond: 'disabled',
              },
              {
                cond: 'notEnded',
                target: '#timer.running',
              },
            ],
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
          elapsed: (context) =>
            +(context.elapsed + context.interval).toFixed(2),
        }),
      },
      guards: {
        disabled: (context) => !context.enabled,
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
  return timerMachine
}

export type TimerActor = ActorRefFrom<ReturnType<typeof createTimerMachine>>
