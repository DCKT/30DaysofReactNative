// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Image, View, StatusBar } from 'react-native'
import { Container, Content, Spinner, H1, Text, Icon, Button } from 'native-base'
import type { TMovieDetails } from '../utils/types'

type Props = {
  details: TMovieDetails,
  navigation: Object,
  isFetching: boolean
}

const STATUS_BAR_TRANSLUCENT = true

const styles = {
  container: {
    backgroundColor: '#fff',
    position: 'relative'
  },
  navPrev: {
    position: 'absolute',
    top: 15,
    left: -10,
    zIndex: 10
  },
  badgeContainer: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 7
  },
  badgeText: {
    paddingLeft: 10
  }
}

class Details extends React.Component {
  props: Props

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  render () {
    const { details, isFetching } = this.props

    return (
      <Container>
        <Content>
          <StatusBar backgroundColor='transparent' translucent={STATUS_BAR_TRANSLUCENT} />
          {
            isFetching ? <Spinner /> : (
              <View style={styles.container}>
                <View style={{ flex: 1, position: 'relative' }}>
                  <Button transparent light style={styles.navPrev} onPress={this._goBack}>
                    <Icon name='arrow-back' color='#fff' style={{ backgroundColor: 'transparent' }} />
                    <Text style={{ backgroundColor: 'transparent', fontWeight: 'bold' }}>Top rated</Text>
                  </Button>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${details.backdrop_path}` }} style={{ flex: 1, height: 300 }} />
                  <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                      <Icon ios='ios-star' android='md-star' />
                      <Text style={styles.badgeText}>{ details.vote_average }/10</Text>
                    </View>
                    <View style={styles.badge}>
                      <Icon name='calendar' />
                      <Text style={styles.badgeText}>{ details.release_date }</Text>
                    </View>
                    {
                      details.budget ? (
                        <View style={styles.badge}>
                          <Icon name='logo-usd' />
                          <Text style={styles.badgeText}>{ details.budget / 1000 }K</Text>
                        </View>
                      ) : null
                    }
                  </View>
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
            )
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
  details: movies.details,
  isFetching: movies.isFetching
})

export default connect(mapStateTopProps)(Details)
