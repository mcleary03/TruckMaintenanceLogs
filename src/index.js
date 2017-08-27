import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

const Root = ({ store }) => (
  <Provider store={ store }>
    <App />
  </Provider>
)

document.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  const root = document.getElementById("root")
  ReactDOM.render(<Root store={store} />, root)
})
registerServiceWorker()
