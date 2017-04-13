import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Text } from 'native-base'
import { getTimestamp } from '../actions/demo'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  navigator: Object
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
          <Text style={styles.subTitle}>Are you the</Text>
          <Text style={styles.title}>Fastest Writer ?</Text>
          <Button block light style={styles.button}>
            <Text>Play</Text>
          </Button>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  noBackground: {
    backgroundColor: 'transparent'
  },
  linearGradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  subTitle: {
    textAlign: 'center'
  },
  title: {
    textAlign: 'center'
  }
})

const mapStateToProps = ({ demo }) => ({
  demoText: demo.text
})

const mapDispatchToProps = dispatch => ({
  getTimestamp: bindActionCreators(getTimestamp, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
