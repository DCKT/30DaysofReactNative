import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import { StackNavigator } from 'react-navigation'
import Home from './containers/Home'
import Details from './containers/Details'

const Router = StackNavigator({
  Home: { screen: Home },
  Details: { screen: Details }
}, {
  mode: 'card',
  headerMode: 'screen'
})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
