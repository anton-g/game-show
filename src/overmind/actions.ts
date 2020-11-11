import { Action } from 'overmind'

export const startShow: Action = ({ state }) => {
  state.currentSegmentIndex = 0
}
