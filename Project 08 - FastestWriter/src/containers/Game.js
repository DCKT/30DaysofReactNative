// @flow

import React from 'react'
import {
  StyleSheet, View, TextInput, Animated, Text,
  ScrollView, Vibration, Platform, BackAndroid
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { last, slice } from 'lodash'
import { Button, Text as NText } from 'native-base'

import Countdown from '../components/Countdown'

import shuffle from '../utils/shuffle'
import WORDS_LIST from '../utils/words/en'

const INITIAL_COUNTDOWN = 3
const GAME_TIME = 60

type Props = {
  navigation: Object
}

class Game extends React.Component {
  props: Props

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor () {
    super()

    this.fadeAnim = new Animated.Value(1)
    this.state = {
      words: shuffle(WORDS_LIST).slice(0, 150),
      isCountdownVisible: true,
      isGameRunning: false,
      score: 3
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => false)
  }

  render () {
    const { isCountdownVisible, isGameRunning, score } = this.state

    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <View style={styles.noBackground}>
          {
            isCountdownVisible ? this._renderCountdown() : null
          }
          {
            isCountdownVisible ? null : isGameRunning ? (
              <View style={styles.gameContainer}>
                <Countdown initial={GAME_TIME} onCountEnd={this._onGameEnd} style={styles.counter} />
                <ScrollView
                  ref={ref => this.scrollView = ref}
                  onContentSizeChange={() => this.scrollView.scrollToEnd()}
                  keyboardDismissMode='none'
                  keyboardShouldPersistTaps='always'
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollViewContainer}>
                  {
                    this.state.words.map(this._renderWord)
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
                      underlineColorAndroid='#fff'
                      style={styles.input}
                    />
                  </View>
                </ScrollView>
              </View>
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
                  <Button block light style={{ marginTop: 15 }} onPress={this._back}>
                    <NText style={{ fontFamily: 'Pixel Bug', fontSize: 20 }}>BACK</NText>
                  </Button>
                </View>
              </View>
            )
          }
        </View>
      </LinearGradient>
    )
  }

  _renderCountdown = () => (
    <View style={styles.containerCenter}>
      <Countdown initial={INITIAL_COUNTDOWN} onCountEnd={this._onCountEnd} />
    </View>
  )

  _renderWord = (word: string, i: number) => {
    const currentWordStyle = i === this.state.words.length - 1 ? {
      width: 250,
      opacity: this.fadeAnim
    } : {}

    return (
      <Animated.View key={i} style={[styles.wordContainer, currentWordStyle]}>
        <Text style={styles.wordText}>{ word }</Text>
      </Animated.View>
    )
  }

  _onCountEnd = () => {
    this.setState({ isCountdownVisible: false, isGameRunning: true })
  }

  _onGameEnd = () => {
    this.setState({ isGameRunning: false })
    global.storage
      .load({ key: 'scoresList' })
      .then(scores => {
        scores.push(this.state.score)

        global.storage.save({
          key: 'scoresList',
          rawData: scores.sort((a, b) => b - a)
        })
      })
      .catch(_ => {
        global.storage.save({
          key: 'scoresList',
          rawData: [this.state.score]
        })
      })
  }

  _onChangeText = currentText => this.setState({ currentText })

  _checkWord = () => {
    const { currentText, score } = this.state
    const currentWord = last(this.state.words)

    if (currentWord === currentText) {
      Animated.timing(this.fadeAnim, { toValue: 0 }).start(() => {
        this.setState({
          score: score + 1,
          words: slice(this.state.words, 0, this.state.words.length - 1)
        })
        this._input.setNativeProps({ text: '' })
        this.fadeAnim.setValue(1)
      })
    } else {
      Vibration.vibrate()
    }
  }

  _restartGame = () => {
    this.setState({ isCountdownVisible: true, score: 0 })
  }

  _back = () => {
    this.props.navigation.navigate('Home')
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 20
      }
    })
  },
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
    width: '100%',
    ...Platform.select({
      android: {
        height: null,
        padding: 0,
        paddingHorizontal: 10,
        marginVertical: 10
      }
    })
  },
  input: {
    height: 30,
    color: '#fff',
    ...Platform.select({
      android: {
        height: null
      }
    })
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
    textAlign: 'center',
    fontWeight: 'bold'
  },
  currentWordContainer: {
    
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
  },
  counter: {
    position: 'absolute',
    top: 30,
    left: 10
  }
})

export default Game
