// @flow

import React from 'react'
import { View, Animated } from 'react-native'
import { Form, Item, Input, Button, Text as NText } from 'native-base'

const styles = {
  item: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderBottomWidth: 0
  }
}

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: {
      style: {
        backgroundColor: '#5FB760'
      },
      titleStyle: {
        color: '#fff'
      }
    }
  }

  constructor () {
    super()
    this.state = {
      userAnim: new Animated.Value(0),
      passwordAnim: new Animated.Value(0),
      buttonAnim: new Animated.Value(0),
      btnErrorAnim: new Animated.Value(0)
    }
  }

  componentDidMount () {
    Animated.sequence([
      Animated.timing(this.state.userAnim, { toValue: 1, duration: 600 }),
      Animated.timing(this.state.passwordAnim, { toValue: 1, duration: 400 }),
      Animated.timing(this.state.buttonAnim, { toValue: 1, duration: 300 })
    ]).start()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Form style={{ marginTop: 30 }}>
          <Animated.View style={{ opacity: this.state.userAnim }}>
            <Item style={styles.item}>
              <Input placeholder='Username' />
            </Item>
          </Animated.View>
          <Animated.View style={{ opacity: this.state.passwordAnim }}>
            <Item style={styles.item} last>
              <Input placeholder='Password' />
            </Item>
          </Animated.View>
        </Form>

        <Animated.View style={{ opacity: this.state.buttonAnim, transform: [{ rotate: this.state.btnErrorAnim.interpolate({
          inputRange: [0, 0.25, 0.50, 0.75, 1],
          outputRange: ['0deg', '6deg', '-6deg', '6deg', '0deg']
        }) }] }}>
          <Button success block style={{ marginHorizontal: 10 }} onPress={this._send}>
            <NText>Press me</NText>
          </Button>
        </Animated.View>
      </View>
    )
  }

  _send = () => {
    Animated.sequence([
      Animated.timing(this.state.btnErrorAnim, { toValue: 1, duration: 200 }),
      Animated.timing(this.state.btnErrorAnim, { toValue: 0, duration: 0 })
    ]).start()
  }
}

export default Login
