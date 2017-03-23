// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Container, Content, Spinner, H1, Text, Icon, Button } from 'native-base'
import type { TMovieDetails } from '../utils/types'

type Props = {
  details: TMovieDetails,
  navigation: Object
}

class Details extends React.Component {
  props: Props

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  render () {
    const { details } = this.props

    return (
      <Container>
        <Content>
          {
            details ? (
              <View style={{ backgroundColor: '#fff', position: 'relative' }}>
                <Button transparent light style={{ position: 'absolute', top: 15, left: -10, zIndex: 10 }} onPress={this._goBack}>
                  <Icon name='arrow-back' color='#fff' style={{ backgroundColor: 'transparent' }} />
                  <Text style={{ backgroundColor: 'transparent', fontWeight: 'bold' }}>Top rated</Text>
                </Button>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${details.backdrop_path}` }} style={{ flex: 1, height: 300 }} />
                <View>
                  <Icon ios='ios-star' android='md-star' />
                  <Text>{ details.vote_average }/10</Text>
                </View>

                <View style={{ marginVertical: 15 }}>
                  <H1 style={{ textAlign: 'center' }}>{ details.title }</H1>
                  {
                    details.title !== details.original_title ? (
                      <Text style={{ textAlign: 'center', color: '#444' }}>{ details.original_title }</Text>
                    ) : null
                  }
                </View>

                <Text style={{ fontSize: 15, color: '#242424', textAlign: 'justify', paddingHorizontal: 20, marginBottom: 10 }}>
                  { details.overview }
                </Text>
              </View>
            ) : <Spinner />
          }
        </Content>
      </Container>
    )
  }

  _goBack = ():void => {
    this.props.navigation.goBack()
  }
}

const mapStateTopProps = ({ movies }) => ({
  details: movies.details
})

export default connect(mapStateTopProps)(Details)
