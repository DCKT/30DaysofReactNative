import React from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'
import { Button, Text as NText } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import Video from 'react-native-video'

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
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
        />
        <Video source={require('../assets/moments.mp4')}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={true}                           // Mutes the audio entirely.                     // Pauses playback entirely.
          resizeMode='cover'                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground={false}                // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          style={styles.backgroundVideo} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../assets/logos/spotify_logo.png')} resizeMode='contain' style={{ width: 300 }} />
        </View>
        <View style={{ marginHorizontal: 10, marginBottom: 25 }}>
          <Button success block style={{ marginBottom: 10 }}>
            <NText>Login</NText>
          </Button>
          <Button light block>
            <NText style={{ color: '#1ED760' }}>Sign up</NText>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

export default Home
