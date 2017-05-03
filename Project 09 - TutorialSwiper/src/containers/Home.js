import React from 'react'
import { View, StatusBar, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Button, Text } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

const PICTURES = [{
  backgroundColor: '#01579B'
}, {
  backgroundColor: '#42A5F5'
}, {
  backgroundColor: '#00BCD4'
}]

const { width, height } = Dimensions.get('window')

class Home extends React.Component {
  componentDidMount () {
    SplashScreen.hide()
  }

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  render () {
    return (
      <View style={{ width, height, overflow: 'hidden' }}>
        <ScrollView horizontal pagingEnabled scrollEventThrottle={16}>
          {
            PICTURES.map(this._renderPage)
          }
        </ScrollView>
      </View>
    )
  }

  _renderPage = (page, i) => {
    return (
      <View key={i} style={[styles.page, { backgroundColor: page.backgroundColor, width, height, overflow: 'hidden' }]}>
        <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Page {i}</Text>
          <View style={styles.circleContainer}>
            {
              PICTURES.map((_, index) => {
                return <View key={index} style={[styles.circle, index >= i ? styles.emptyCircle : {}]} />
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center'
  },
  circleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  circle: {
    flex: -1,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8
  },
  emptyCircle: {
    backgroundColor: 'transparent'
  }
})

export default Home
