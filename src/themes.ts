import { DefaultTheme } from 'styled-components'

// Remember to update styled.d.ts when adding/removing colors here.
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
  blackA,
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
    ...blackA,
    types: {
      TEXT: crimson.crimson8,
      SOUND: mint.mint8,
      IMAGE: cyan.cyan8,
      VIDEO: yellow.yellow8,
    },
  },
}

export { lightTheme }
