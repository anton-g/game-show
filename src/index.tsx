import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import config from './overmind'
import App from './App'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import DevPanel from './DevPanel'
import { Segment } from './Segment'

const overmind = createOvermind(config, {
  devtools: true,
})

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider value={overmind}>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/segment">
            <Segment></Segment>
          </Route>
          <Route path="/scores">
            <p>scores</p>
          </Route>
        </Switch>
        <DevPanel></DevPanel>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
