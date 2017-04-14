// @flow

import React from 'react'
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Text, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { last, slice } from 'lodash'

import Countdown from '../components/Countdown'

import shuffle from '../utils/shuffle'
import WORDS from '../utils/words/en'

const INITIAL_COUNTDOWN = 3

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
    isCountdownVisible: true,
    score: 0
  }

  render () {
    const { isCountdownVisible } = this.state

    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={styles.noBackground}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*{
              isCountdownVisible && <Countdown initial={INITIAL_COUNTDOWN} onCountEnd={this._onCountEnd} />
            }*/}
          </View>
        </View>
        <KeyboardAvoidingView behavior='padding' style={{ paddingTop: 40 }}>
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
          </ScrollView>
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
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }

  _renderWord = (word: string, i: number) => (
    <View key={i} style={[styles.wordContainer, i === this.WORDS.length - 1 ? styles.currentWordContainer : {}]}>
      <Text style={styles.wordText}>{ word }</Text>
    </View>
  )

  _onCountEnd = () => {
    this.setState({ isCountdownVisible: false })
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

    }
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
  }
})

export default Game
