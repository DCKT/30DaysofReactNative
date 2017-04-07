import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [thunk]

if (__DEV__) {
  const createLogger = require('redux-logger')
  middlewares.push(createLogger({ collapsed: true }))
}

const store = createStore(reducers, applyMiddleware(...middlewares))
export default store
