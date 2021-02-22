import { IConfig } from 'overmind'
import {
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createStateHook,
} from 'overmind-react'
import { state } from './state'
import effects from './effects'
import * as actions from './actions'

export const config = {
  state,
  effects,
  actions,
}

export const useAppState = createStateHook<typeof config>()
export const useActions = createActionsHook<typeof config>()
export const useEffects = createEffectsHook<typeof config>()
export const useReaction = createReactionHook<typeof config>()

if (module.hot) {
  module.hot.accept()
}

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}
