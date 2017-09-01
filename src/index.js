import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import PouchDB from 'pouchdb'
import reducers from './reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistentStore } from 'redux-pouchdb'
import registerServiceWorker from './registerServiceWorker'

const Root = ({ store }) => (
  <Provider store={ store }>
    <App />
  </Provider>
)

document.addEventListener("DOMContentLoaded", () => {
  const db = new PouchDB('maintenanceLogs')
  const createStoreWithMiddleware = compose(
    persistentStore(db)
  )(createStore)

  const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  const root = document.getElementById("root")
  ReactDOM.render(<Root store={store} />, root)
})
registerServiceWorker()
