import React from 'react'
import ReactDOM from 'react-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import reportWebVitals from './reportWebVitals'
import { config } from './overmind'
import { App } from './App'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import { Creator } from './components/creator/Creator'
import { QuestionPage } from './components/library/edit-question/QuestionPage'
import { Library } from './components/library/grid/Library'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'modern-css-reset'
import { lightTheme } from './themes'
import { Admin } from './components/admin/Admin'
import { inspect } from '@xstate/inspect'
import { PresentationControl } from './components/presentation/Presentation'

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
      <Router history={history}>
        <Provider value={overmind}>
          <Switch>
            <Route path="/" exact>
              <App />
            </Route>
            <Route path="/play" exact>
              <Admin />
            </Route>
            <Route path="/play/external" exact>
              <PresentationControl />
            </Route>
            <Route path="/creator">
              <Creator />
            </Route>
            <Route path="/library" exact>
              <Library />
            </Route>
            <Route path="/library/question/:questionId?">
              <QuestionPage />
            </Route>
          </Switch>
        </Provider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
