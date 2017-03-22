import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Spinner } from 'native-base'
import { fetchTopRatedMovies, fetchMovieDetails } from '../actions/movies'
import type { TMovieListDetail } from '../utils/types'
import Router from '../utils/router'
import ListCardItem from '../components/ListCardItem'

type Props = {
  fetchTopRatedMovies: Function,
  fetchMovieDetails: Function,
  movies: Array<TMovieListDetail>,
  navigator: Object
}

class Home extends React.Component {
  props: Props

  static navigationOptions = {
    // // Title may be a simple string:
    // title: 'Hello',

    // Or the title string may be a function of the navigation prop:
    title: ({ state }) => `Top rated movies`,
    header: {
      style: {
        backgroundColor: '#26A69A'
      },
      titleStyle: {
        color: '#fff'
      }
    }
  }

  componentDidMount () {
    this.props.fetchTopRatedMovies()
  }

  render () {
    const { movies } = this.props

    return (
      <Container>
        <StatusBar
          backgroundColor='#009688'
          barStyle='light-content'
        />
        <Content>
          { movies.length ? movies.map(this._renderMovie) : <Spinner /> }
        </Content>
      </Container>
    )
  }

  _renderMovie = (movie: TMovieListDetail, i: number) => (
    <ListCardItem movie={movie} key={i} onPress={this._goToDetails(movie.id)} />
  )

  _goToDetails = (movie_id: string) => () => {
    this.props.fetchMovieDetails(movie_id)
    this.props.navigator.push(Router.getRoute('details'))
  }
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.topRated
})

const mapDispatchToProps = dispatch => ({
  fetchTopRatedMovies: bindActionCreators(fetchTopRatedMovies, dispatch),
  fetchMovieDetails: bindActionCreators(fetchMovieDetails, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
