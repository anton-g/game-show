import type { DefaultTheme } from "styled-components";
import { gray } from "@radix-ui/colors";

// Remember to update styled.d.ts when adding/removing colors here.
const theme: DefaultTheme = {
  colors: {
    primary: "black",
    secondary: "white",
    ...gray,
  },
};

export { theme };
