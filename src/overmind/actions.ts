import { Action } from 'overmind'

export const test: Action = ({ effects }) => {
  effects.presentation.startConnection('/')
}
