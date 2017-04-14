// @flow

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    flex: -1,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  count: {
    fontSize: 68,
    fontFamily: 'Pixel Bug',
    textAlign: 'center'
  }
})

type Props = {
  initial: number,
  onCountEnd: () => void
}

export default class Countdown extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.state = {
      count: props.initial
    }
  }

  componentDidMount () {
    // this._countdown()
  }

  componentWillUnmount () {
    clearTimeout(this.countdown)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>{ this.state.count }</Text>
      </View>
    )
  }

  _countdown = () => {
    this.countdown = setTimeout(() => {
      const { count } = this.state

      if (count > 0) {
        this.setState({ count: count - 1 })
        this._countdown()
      } else {
        this.props.onCountEnd()
        clearTimeout(this.countdown)
      }
    }, 1000)
  }
}
