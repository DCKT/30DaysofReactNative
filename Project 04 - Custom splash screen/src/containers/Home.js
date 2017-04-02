import React from 'react'
import { View, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Text } from 'native-base'
import { getTimestamp } from '../actions/demo'

type Props = {
  getTimestamp: Function,
  demoText: ?number
}

class Home extends React.Component {
  props: Props

  componentDidMount () {
    SplashScreen.hide()
  }

  static navigationOptions = {
    title: 'react-native-starter',
    header: {
      style: {
        backgroundColor: '#26A69A'
      },
      titleStyle: {
        color: '#fff'
      }
    }
  }

  render () {
    return (
      <View>
        <StatusBar backgroundColor='#009688' barStyle='light-content' />
        <Text>Home view</Text>
        <Text>Demo redux : {this.props.demoText}</Text>
        <Button primary onPress={this._onPress}>
          <Text>Change demo text !</Text>
        </Button>
      </View>
    )
  }

  _onPress = (): void => {
    this.props.getTimestamp()
  }
}

const mapStateToProps = ({ demo }) => ({
  demoText: demo.text
})

const mapDispatchToProps = dispatch => ({
  getTimestamp: bindActionCreators(getTimestamp, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
