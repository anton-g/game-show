import { DefaultTheme } from 'styled-components'

import {
  gray,
  blue,
  red,
  green,
  tomato,
  crimson,
  cyan,
  yellow,
  mint,
} from '@radix-ui/colors'

const lightTheme: DefaultTheme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...tomato,
    ...crimson,
    ...cyan,
    ...yellow,
    ...mint,
    types: {
      TEXT: crimson.crimson8,
      SOUND: mint.mint8,
      IMAGE: cyan.cyan8,
      VIDEO: yellow.yellow8,
    },
  },
}

export { lightTheme }
