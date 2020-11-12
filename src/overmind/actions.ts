import { Action, AsyncAction } from 'overmind'
import effects from './effects'

export const startShow: Action = ({ state }) => {
  state.currentSegmentIndex = 0
  effects.router.goTo('/segment')
}

export const nextSegment: Action = ({ state }) => {
  state.currentSegmentIndex += 1
  effects.router.goTo('/segment')
}

export const endSegment: AsyncAction = async ({ actions, state }) => {
  effects.router.goTo('/scores')
}
