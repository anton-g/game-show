import { IContext } from 'overmind'
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

export type Context = IContext<{
  state: typeof config.state
  actions: typeof config.actions
  effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()

if (module.hot) {
  module.hot.accept()
}
