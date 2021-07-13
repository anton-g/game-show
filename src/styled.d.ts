import 'styled-components'

import {
  gray,
  blue,
  red,
  green,
  tomato,
  crimson,
  yellow,
  mint,
  cyan,
  blackA,
} from '@radix-ui/colors'

type CustomColors = {
  types: {
    TEXT: string
    SOUND: string
    IMAGE: string
    VIDEO: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof gray &
      typeof blue &
      typeof red &
      typeof green &
      typeof tomato &
      typeof crimson &
      typeof cyan &
      typeof yellow &
      typeof mint &
      typeof blackA &
      CustomColors
  }
}
