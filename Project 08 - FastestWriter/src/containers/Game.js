// @flow

import React from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Countdown from '../components/Countdown'

const INITIAL_COUNTDOWN = 3

class Game extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  state = {
    isCountdownVisible: true
  }

  render () {
    const { isCountdownVisible } = this.state

    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
          <View style={styles.noBackground}>
            {
              isCountdownVisible && <Countdown initial={INITIAL_COUNTDOWN} onCountEnd={this._onCountEnd} />
            }
          </View>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.inputContainer}>
              <TextInput
                autoFocus={true}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this._onChangeText}
                onSubmitEditing={this._checkWord}
                blurOnSubmit={false}
                style={styles.input}
              />
            </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }

  _onCountEnd = () => {
    this.setState({ isCountdownVisible: false })
  }

  _onChangeText = currentText => this.setState({ currentText })

  _checkWord = () => {
    global.Rtron.log('work')
  }
}

const styles = StyleSheet.create({
  noBackground: {
    backgroundColor: 'transparent',
    flex: 1
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, .3)',
    padding: 5,
    height: 40,
    width: '100%'
  },
  input: {
    height: 30,
    color: '#fff'
  }
})

export default Game
