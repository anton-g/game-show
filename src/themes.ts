import { DefaultTheme } from 'styled-components'

// Remember to update styled.d.ts when adding/removing colors here.
import {
  blue,
  red,
  green,
  tomato,
  crimson,
  cyan,
  yellow,
  mint,
  blackA,
  mauve,
  plum,
} from '@radix-ui/colors'

const lightTheme: DefaultTheme = {
  colors: {
    gray1: mauve.mauve1,
    gray2: mauve.mauve2,
    gray3: mauve.mauve3,
    gray4: mauve.mauve4,
    gray5: mauve.mauve5,
    gray6: mauve.mauve6,
    gray7: mauve.mauve7,
    gray8: mauve.mauve8,
    gray9: mauve.mauve9,
    gray10: mauve.mauve10,
    gray11: mauve.mauve11,
    gray12: mauve.mauve12,
    ...blue,
    ...red,
    ...green,
    ...tomato,
    ...crimson,
    ...cyan,
    ...yellow,
    ...mint,
    ...blackA,
    primary1: plum.plum1,
    primary2: plum.plum2,
    primary3: plum.plum3,
    primary4: plum.plum4,
    primary5: plum.plum5,
    primary6: plum.plum6,
    primary7: plum.plum7,
    primary8: plum.plum8,
    primary9: plum.plum9,
    primary10: plum.plum10,
    primary11: plum.plum11,
    primary12: plum.plum12,
    types: {
      TEXT: crimson.crimson8,
      SOUND: mint.mint8,
      IMAGE: cyan.cyan8,
      VIDEO: yellow.yellow8,
    },
  },
}

export { lightTheme }
