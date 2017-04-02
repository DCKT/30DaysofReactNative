import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Text as ButtonText, Spinner, Toast } from 'native-base'
import { fetchWeather } from '../actions/weather'
import type { TWeather } from './types'

type Props = {
  fetchWeather: Function,
  weatherData: TWeather
}

type State = {
  isFetching: boolean
}

const styles = {
  text: {
    color: '#fff',
    fontSize: 16
  },
  textKey: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 30,
    textAlign: 'center'
  },
  dataRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currentTemp: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35
  }
}

class Home extends React.Component {
  props: Props
  state: State

  static navigationOptions = {
    title: 'Weather location',
    header: {
      style: {
        backgroundColor: '#242424'
      },
      titleStyle: {
        color: '#fff'
      }
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      isFetching: false
    }
  }

  render () {
    const { weatherData } = this.props
    const { isFetching } = this.state

    return (
      <View style={{ backgroundColor: '#242424', flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexGrow: 5 }}>
          {
            isFetching ? <Spinner color='white' /> : weatherData ? (
              <View>
                <Text style={styles.city}>
                  {weatherData.name.toUpperCase()}
                </Text>
                <View style={styles.dataRow}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.text, styles.textKey]}>Humidity:</Text>
                    <Text style={styles.text}>{ weatherData.main.humidity }</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.text, styles.textKey]}>Pressure:</Text>
                    <Text style={styles.text}>{ weatherData.main.pressure }</Text>
                  </View>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.currentTemp}>{ weatherData.main.temp }°C</Text>
                </View>
                <View style={styles.dataRow}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.text, styles.textKey]}>Temp min:</Text>
                    <Text style={styles.text}>{ weatherData.main.temp_min }°C</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.text, styles.textKey]}>Temp max:</Text>
                    <Text style={styles.text}>{ weatherData.main.temp_max }°C</Text>
                  </View>
                </View>
              </View>
            ) : <Text style={{ color: '#fff', textAlign: 'center' }}>Press the button to have weather informations.</Text>
          }
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
          <Button info block onPress={this._onPress}>
            <ButtonText>Get weather current position</ButtonText>
          </Button>
        </View>
      </View>
    )
  }

  _onPress = (): void => {
    this.setState({ isFetching: true })
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.props.fetchWeather(coords.latitude, coords.longitude)
        .then(() => this.setState({ isFetching: false }))
    }, () => {
      Toast.show({
        text: 'You must allow location to use this app',
        position: 'bottom',
        buttonText: 'ok'
      })
    })
  }
}

const mapStateToProps = ({ weather }) => ({
  weatherData: weather.data
})

const mapDispatchToProps = dispatch => ({
  fetchWeather: bindActionCreators(fetchWeather, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
