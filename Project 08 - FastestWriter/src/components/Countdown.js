// @flow

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    flex: -1,
    borderRadius: 120,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#242424',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    paddingTop: 8
  },
  count: {
    fontSize: 68,
    fontFamily: 'Pixel Bug',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#242424'
  }
})

type Props = {
  initial: number,
  style: Object,
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
    this._countdown()
  }

  componentWillUnmount () {
    clearTimeout(this.countdown)
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
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
        clearTimeout(this.countdown)
        this.props.onCountEnd()
      }
    }, 1000)
  }
}
