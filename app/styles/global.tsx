import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html {
    margin: 0;
    height: 100%;

    @media screen and (min-width: 720px) {
      margin-left: calc(100vw - 100%);
      margin-right: 0;
    }
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: Inter, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;
