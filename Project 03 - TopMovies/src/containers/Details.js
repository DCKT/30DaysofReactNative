// @flow
import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import type { TMovieDetails } from '../utils/types'

type Props = {
  details: TMovieDetails
}

class Details extends React.Component {
  props: Props

  render () {
    const { details } = this.props

    return (
      <View>
        <Image source={{ uri: details.backdrop_path }} style={{ width: 500, height: 250 }} />
      </View>
    )
  }
}

const mapStateTopProps = ({ movies }) => ({
  details: movies.details
})

export default connect(mapStateTopProps)(Details)
