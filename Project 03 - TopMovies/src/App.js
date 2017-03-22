import React from 'react'
import {
  NavigationProvider,
  StackNavigation
} from '@expo/ex-navigation'
import { Provider } from 'react-redux'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base'
import store from './store'
import Router from './utils/router'

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <NavigationProvider router={Router}>
          <Container>
            <Header>
              <Left>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Top rated movies</Title>
              </Body>
              <Right />
            </Header>

            <Content>
              <StackNavigation initialRoute={Router.getRoute('home')} />
            </Content>
          </Container>
        </NavigationProvider>
      </Provider>
    )
  }
}
