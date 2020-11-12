import { To } from 'history'
import { history } from '../../history'

export const router = {
  goTo(to: To) {
    history.push(to)
  },
}
