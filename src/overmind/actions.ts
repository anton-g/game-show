import { Context } from '.'
import { Show } from './types'

export const selectShow = ({ state }: Context, showId: Show['id']) => {
  state.selectedShowId = showId
}
