// @flow

import React from 'react'
import {
  StyleSheet, View, TextInput, KeyboardAvoidingView, Text,
  ScrollView, Vibration
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { last, slice } from 'lodash'
import { Button, Text as NText } from 'native-base'

import Countdown from '../components/Countdown'

import shuffle from '../utils/shuffle'
import WORDS from '../utils/words/en'

const INITIAL_COUNTDOWN = 3
const GAME_TIME = 60

class Game extends React.Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor () {
    super()

    this.WORDS = shuffle(WORDS).slice(0, 150)
  }

  state = {
    isCountdownVisible: false,
    isGameRunning: false,
    score: 0
  }

  render () {
    const { isCountdownVisible, isGameRunning, score } = this.state

    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={styles.noBackground}>
          {
            isCountdownVisible ? (
              <View style={styles.containerCenter}>
                <Countdown initial={INITIAL_COUNTDOWN} onCountEnd={this._onCountEnd} />
              </View>
            ) : (
              isGameRunning ? (
                <KeyboardAvoidingView behavior='padding' style={{ paddingTop: 40 }}>
                  <Countdown initial={GAME_TIME} onCountEnd={this._onGameEnd} style={styles.counter} />
                  <ScrollView
                    ref='scrollView'
                    onContentSizeChange={(_, height) => this.refs.scrollView.scrollTo({y: height - 300})}
                    keyboardDismissMode='none'
                    keyboardShouldPersistTaps='always'
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}>
                    {
                      this.WORDS.map(this._renderWord)
                    }
                    <View style={styles.inputContainer}>
                      <TextInput
                        ref={component => this._input = component}
                        autoFocus={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={this._onChangeText}
                        onSubmitEditing={this._checkWord}
                        blurOnSubmit={false}
                        style={styles.input}
                      />
                    </View>
                  </ScrollView>
                </KeyboardAvoidingView>
              ) : (
                <View style={styles.containerCenter}>
                  <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={styles.score}>SCORE :</Text>
                    <Text style={styles.score}>
                      { score }
                      <Text style={[styles.score, styles.scoreWord]}> words</Text>
                    </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button block light style={styles.button} onPress={this._restartGame}>
                      <NText style={{ fontFamily: 'Pixel Bug', fontSize: 20 }}>RESTART</NText>
                    </Button>
                  </View>
                </View>
              )
            )
          }
        </View>
      </LinearGradient>
    )
  }

  _renderWord = (word: string, i: number) => (
    <View key={i} style={[styles.wordContainer, i === this.WORDS.length - 1 ? styles.currentWordContainer : {}]}>
      <Text style={styles.wordText}>{ word }</Text>
    </View>
  )

  _onCountEnd = () => {
    this.setState({ isCountdownVisible: false, isGameRunning: true })
  }

  _onGameEnd = () => {
    this.setState({ isGameRunning: false })
  }

  _onChangeText = currentText => this.setState({ currentText })

  _checkWord = () => {
    const { currentText, score } = this.state
    const currentWord = last(this.WORDS)

    if (currentWord === currentText) {
      this.setState({ score: score + 1 })
      this.WORDS = slice(this.WORDS, 0, this.WORDS.length - 1)
      this._input.setNativeProps({ text: '' })
    } else {
      Vibration.vibrate()
    }
  }

  _restartGame = () => {
    this.setState({ isCountdownVisible: true })
  }
}

const styles = StyleSheet.create({
  noBackground: {
    backgroundColor: 'transparent',
    flex: 1
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255, .3)',
    padding: 5,
    paddingHorizontal: 15,
    height: 40,
    width: '100%'
  },
  input: {
    height: 30,
    color: '#fff'
  },
  wordContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 5,
    flex: -1,
    width: 170,
    alignSelf: 'flex-end'
  },
  wordText: {
    color: '#242424',
    textAlign: 'center'
  },
  currentWordContainer: {
    width: 250
  },
  scrollViewContainer: {
    paddingHorizontal: 10
  },
  score: {
    color: '#fff',
    fontFamily: 'Pixel Bug',
    fontSize: 56
  },
  scoreWord: {
    fontSize: 32
  }
})

export default Game
