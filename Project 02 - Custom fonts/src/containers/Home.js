import React from 'react'
import { View } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base'

type State = {
  fontIndex: number
}

const FONTS = ['adlery', 'Roboto', 'Rubik', 'Verdana', 'Georgia', 'AndaleMono', 'Helvetica']

class Home extends React.Component {
  state: State

  constructor () {
    super()

    this.state = {
      fontIndex: 0
    }
  }

  render () {
    const { fontIndex } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <View>
            <Text style={{ fontFamily: FONTS[fontIndex] }}>Home view</Text>
            <Text>Current font : { FONTS[fontIndex] }</Text>
            <Button primary onPress={this._onPress}>
              <Text>Change font !</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }

  _onPress = (): void => {
    this.setState({
      fontIndex: Math.floor((Math.random() * (FONTS.length - 1)) + 0)
    })
  }
}

export default Home
