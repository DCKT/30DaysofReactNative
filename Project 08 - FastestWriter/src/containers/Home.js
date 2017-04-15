import React from 'react'
import { StyleSheet, StatusBar, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Text as NText } from 'native-base'
import { getTimestamp } from '../actions/demo'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  navigation: Object
}

class Home extends React.Component {
  props: Props

  componentDidMount () {
    SplashScreen.hide()
  }

  static navigationOptions = {
    title: 'react-native-starter',
    header: {
      visible: false
    }
  }

  render () {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <StatusBar backgroundColor='#009688' barStyle='light-content' />
        <View style={styles.noBackground}>
          <View style={[styles.container, { justifyContent: 'flex-end' }]}>
            <Text style={styles.subTitle}>Are you the</Text>
            <Text style={styles.title}>Fastest Writer ?</Text>
          </View>
          <View style={styles.container}>
            <Button block light style={styles.button} onPress={this._runGame}>
              <NText style={{ fontFamily: 'Pixel Bug', fontSize: 20 }}>PLAY</NText>
            </Button>
          </View>
        </View>
      </LinearGradient>
    )
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
    fontSize: 25,
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
  }
})

const mapStateToProps = ({ demo }) => ({
  demoText: demo.text
})

const mapDispatchToProps = dispatch => ({
  getTimestamp: bindActionCreators(getTimestamp, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
