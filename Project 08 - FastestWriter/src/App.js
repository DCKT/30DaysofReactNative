import '../reactotron.config'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import { StackNavigator } from 'react-navigation'
import Home from './containers/Home'
import Game from './containers/Game'

import './utils/storage'

const Router = StackNavigator({
  Home: { screen: Home },
  Game: { screen: Game }
}, {
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
