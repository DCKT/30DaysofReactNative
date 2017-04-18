import React from 'react'
import { StyleSheet, StatusBar, View, Text, Modal, ScrollView } from 'react-native'
import { Button, Text as NText, Icon } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'

import storage from '../utils/storage'

type Props = {
  navigation: Object
}

class Home extends React.Component {
  props: Props

  componentDidMount () {
    storage
      .getAllDataForKey('scores')
      .then(scores => {
        this.setState({ scores })
        SplashScreen.hide()
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
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <Text style={styles.title}>HIGH SCORES</Text>

            {
              this.state.scores.length ? (
                <ScrollView>
                  { this.state.scores.map(this._renderScore) }
                </ScrollView>
              ) : (
                <Text style={styles.subTitle}>Oh, it seems you didn't have played yet :(</Text>
              )
            }

            <Button transparent light onPress={this._toggleModal} style={{ position: 'absolute', top: 20, right: 5 }}>
              <Icon name='close' style={{ fontSize: 49 }} />
            </Button>
          </LinearGradient>
        </Modal>
      </LinearGradient>
    )
  }

  _renderScore = (score: string, i: number) => (
    <View style={styles.scoreListItem}>
      <Text>#{i} - {score}</Text>
    </View>
  )

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
    justifyContent: 'center'
  },
  scoreListItem: {
    backgroundColor: '#fff',
    borderRadius: 10
  }
})

export default Home
