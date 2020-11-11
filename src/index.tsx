import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import config from './overmind'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DevPanel from './DevPanel'

const overmind = createOvermind(config, {
  devtools: true,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      <DevPanel></DevPanel>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
