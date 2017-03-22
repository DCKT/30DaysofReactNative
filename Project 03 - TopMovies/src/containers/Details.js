// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Spinner } from 'native-base'
import type { TMovieDetails } from '../utils/types'

type Props = {
  details: TMovieDetails,
  navigator: Object
}

class Details extends React.Component {
  props: Props

  render () {
    const { details } = this.props

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigator.pop()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ details ? details.title : null }</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {
            details ? (
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${details.backdrop_path}` }} style={{ width: 500, height: 250 }} />
            ) : <Spinner />
          }
        </Content>
      </Container>
    )
  }
}

const mapStateTopProps = ({ movies }) => ({
  details: movies.details
})

export default connect(mapStateTopProps)(Details)
