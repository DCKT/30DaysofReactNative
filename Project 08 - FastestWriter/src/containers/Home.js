import React from 'react'
import { StyleSheet, StatusBar, View, Text, Modal, ScrollView } from 'react-native'
import { Button, Text as NText, Icon } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  navigation: Object
}

class Home extends React.Component {
  props: Props

  componentDidMount () {
    this._loadHighScores()
    SplashScreen.hide()
  }

  _loadHighScores = () => {
    global.storage.load({
      key: 'scoresList'
    }).then(scores => {
      this.setState({ scores })
    }).catch(_ => {
      this.setState({ scores: [] })
    })
  }

  static navigationOptions = {
    title: 'react-native-starter',
    header: {
      visible: false
    }
  }

  state = {
    isModalVisible: false,
    scores: []
  }

  render () {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <StatusBar backgroundColor='#4c669f' barStyle='light-content' />
        <View style={styles.noBackground}>
          <View style={[styles.container, { justifyContent: 'flex-end' }]}>
            <Text style={styles.subTitle}>Are you the</Text>
            <Text style={styles.title}>Fastest Writer ?</Text>
          </View>
          <View style={styles.container}>
            <Button block light onPress={this._runGame}>
              <NText style={{ fontFamily: 'Pixel Bug', fontSize: 20 }}>PLAY</NText>
            </Button>
            <Button block light style={{ marginTop: 10 }} onPress={this._toggleModal}>
              <NText style={{ fontFamily: 'Pixel Bug', fontSize: 20 }}>HIGH SCORES</NText>
            </Button>
          </View>
        </View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.isModalVisible}
          onRequestClose={this._toggleModal}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={[styles.linearGradient, this.state.scores.length ? { paddingTop: 85 } : {}]}>
            <Text style={[styles.title, { marginBottom: 20 }]}>HIGH SCORES</Text>

            {
              this.state.scores.length ? (
                <ScrollView>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    { this.state.scores.map(this._renderScore) }
                  </View>
                </ScrollView>
              ) : (
                <Text style={styles.subTitle}>Oh, it seems you didn't have played yet :(</Text>
              )
            }

            <Button transparent light onPress={this._openScoresModal} style={{ position: 'absolute', top: 20, right: 5 }}>
              <Icon name='close' style={{ fontSize: 49 }} />
            </Button>
          </LinearGradient>
        </Modal>
      </LinearGradient>
    )
  }

  _renderScore = (score: string, i: number) => (
    <View style={styles.scoreListItem} key={i}>
      <Text style={styles.scoreListItemText}>#{i + 1} - {score}</Text>
    </View>
  )

  _openScoresModal = () => {
    this._loadHighScores()
    this._toggleModal()
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  _runGame = () => {
    this.props.navigation.navigate('Game')
  }
}

const styles = StyleSheet.create({
  noBackground: {
    backgroundColor: 'transparent',
    flex: 1
  },
  linearGradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: 'Pixel Bug',
    color: '#fff',
    fontSize: 25
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Pixel Bug',
    fontSize: 55,
    color: '#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreListItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginBottom: 15
  },
  scoreListItemText: {
    fontSize: 20,
    fontFamily: 'Pixel Bug',
    color: '#242424',
    textAlign: 'center'
  }
})

export default Home
