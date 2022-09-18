import 'styled-components'
import type { gray } from '@radix-ui/colors'

type CustomColors = {
  primary: string
  secondary: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof gray & CustomColors
  }
}
