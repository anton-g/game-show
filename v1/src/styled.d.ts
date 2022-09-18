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
  primary1: string
  primary2: string
  primary3: string
  primary4: string
  primary5: string
  primary6: string
  primary7: string
  primary8: string
  primary9: string
  primary10: string
  primary11: string
  primary12: string
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
