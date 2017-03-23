import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Content, Spinner } from 'native-base'
import { fetchTopRatedMovies, fetchMovieDetails } from '../actions/movies'
import type { TMovieListDetail } from '../utils/types'
import ListCardItem from '../components/ListCardItem'

type Props = {
  fetchTopRatedMovies: Function,
  fetchMovieDetails: Function,
  movies: Array<TMovieListDetail>,
  navigation: Object,
  isFetching: boolean
}

class Home extends React.Component {
  props: Props

  static navigationOptions = {
    title: 'Top rated movies',
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
    const { movies, isFetching } = this.props

    return (
      <Container>
        <StatusBar
          backgroundColor='#009688'
          barStyle='light-content'
        />
        <Content>
          { isFetching ? <Spinner /> : movies ? movies.map(this._renderMovie) : null }
        </Content>
      </Container>
    )
  }

  _renderMovie = (movie: TMovieListDetail, i: number) => (
    <ListCardItem movie={movie} key={i} onPress={this._goToDetails(movie.id)} />
  )

  _goToDetails = (movie_id: string) => () => {
    this.props.fetchMovieDetails(movie_id)
    this.props.navigation.navigate('Details')
  }
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.topRated,
  isFetching: movies.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchTopRatedMovies: bindActionCreators(fetchTopRatedMovies, dispatch),
  fetchMovieDetails: bindActionCreators(fetchMovieDetails, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
