// @flow
import React from 'react'
import { Image } from 'react-native'
import { Card, CardItem, Left, Body, Text, Button, Icon } from 'native-base'
import type { TMovieListDetail } from '../utils/types'

type Props = {
  movie: TMovieListDetail,
  onPress: Function
}

export default (props: Props) => {
  const { movie, onPress } = props

  return (
    <Card>
      <CardItem button onPress={onPress}>
        <Left>
          <Body>
            <Text>{ movie.title }</Text>
            <Text note>{ movie.original_title }</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody button onPress={onPress}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} style={{ flex: 1, height: 200 }} />
      </CardItem>
      <CardItem content>
        <Text>{ movie.overview }</Text>
      </CardItem>
      <CardItem style={{ justifyContent: 'space-around' }}>
        <Button transparent>
          <Text>{ movie.vote_count} votes</Text>
        </Button>
        <Button transparent>
          <Icon ios='ios-star' android='md-star' />
          <Text>{ movie.vote_average }/10</Text>
        </Button>
        <Text>{ movie.release_date }</Text>
      </CardItem>
    </Card>
  )
}
