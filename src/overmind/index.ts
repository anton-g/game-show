import { IConfig } from 'overmind'
import { Statechart, statechart } from 'overmind-statechart'
import {
  createActionsHook,
  createEffectsHook,
  createHook,
  createReactionHook,
  createStateHook,
} from 'overmind-react'
import { state } from './state'
import effects from './effects'
import * as actions from './actions'

const config = {
  state,
  effects,
  actions,
}

const gameChart: Statechart<
  typeof config,
  {
    TITLE: void
    SEGMENT: void
    SCORES: void
    RESULTS: void
  }
> = {
  initial: 'TITLE',
  states: {
    TITLE: {
      on: {
        startShow: 'SEGMENT',
      },
    },
    SEGMENT: {},
    SCORES: {},
    RESULTS: {},
  },
}

const chartConfig = statechart(config, gameChart)
export default chartConfig

declare module 'overmind' {
  interface Config extends IConfig<typeof chartConfig> {}
}

export const useOvermind = createHook<typeof chartConfig>()
export const useState = createStateHook<typeof chartConfig>()
export const useActions = createActionsHook<typeof chartConfig>()
export const useEffects = createEffectsHook<typeof chartConfig>()
export const useReaction = createReactionHook<typeof chartConfig>()

if (module.hot) {
  module.hot.accept()
}
