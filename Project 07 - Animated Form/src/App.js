import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import { StackNavigator } from 'react-navigation'
import Home from './containers/Home'
import Login from './containers/Login'

const Router = StackNavigator({
  Home: { screen: Home },
  Login: { screen: Login }
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
