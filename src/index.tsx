import React from 'react'
import ReactDOM from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import reportWebVitals from './reportWebVitals'
import { config } from './overmind'
import { App } from './App'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Creator } from './components/creator/Creator'
import { QuestionPage } from './components/library/edit-question/QuestionPage'
import { Library } from './components/library/grid/Library'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'modern-css-reset'
import { lightTheme } from './themes'
import {
  PresentationControls,
  PresentationMessageProvider,
} from './components/presentation/PresentationsControl'
import { inspect } from '@xstate/inspect'
import { ExternalPresentationReceiver } from './components/presentation/ExternalPresentation'

inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
})

const overmind = createOvermind(config, {
  devtools: false,
})

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.gray1};
    color: ${({ theme }) => theme.colors.gray12};
    accent-color: ${({ theme }) => theme.colors.primary9};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  body,
  html,
  #root {
    height: 100%;
  }

  input, textarea, select {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    color: ${({ theme }) => theme.colors.gray12};
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <Provider value={overmind}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/play" element={<PresentationControls />} />
            <Route
              path="/play/external"
              element={
                <PresentationMessageProvider>
                  <ExternalPresentationReceiver />
                </PresentationMessageProvider>
              }
            />
            <Route path="/creator" element={<Creator />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/question/" element={<QuestionPage />} />
            <Route
              path="/library/question/:questionId"
              element={<QuestionPage />}
            />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
