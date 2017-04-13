import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [thunk]
let createStoreFn = createStore

if (__DEV__) {
  const createLogger = require('redux-logger')
  createStoreFn = require('reactotron-react-native').default.createStore
  middlewares.push(createLogger({ collapsed: true }))
}

export default createStoreFn(reducers, applyMiddleware(...middlewares))
