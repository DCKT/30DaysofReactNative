import React from 'react'
import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation'
import { Provider } from 'react-redux'
import store from './store'
import Router from './utils/router'

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <NavigationProvider router={Router}>
          <StackNavigation initialRoute={Router.getRoute('home')} />
        </NavigationProvider>
      </Provider>
    )
  }
}
