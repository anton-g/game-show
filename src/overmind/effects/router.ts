import history from '../../history'

export const router = {
  goTo(to: string) {
    history.push(to)
  },
}
