import { Action } from 'overmind'

export const startShow: Action = ({ state }) => {
  state.currentSegmentIndex = 0
}

export const nextSegment: Action = ({ state }) => {
  state.currentSegmentIndex += 1
}
