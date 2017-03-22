import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { Spinner } from 'native-base'
import { fetchTopRatedMovies } from '../actions/movies'
import type { TMovieListDetail } from '../utils/types'
import ListCardItem from '../components/ListCardItem'

type Props = {
  fetchTopRatedMovies: Function,
  movies: Array<TMovieListDetail>
}

class Home extends React.Component {
  props: Props

  componentDidMount () {
    this.props.fetchTopRatedMovies()
  }

  render () {
    const { movies } = this.props

    return (
      <View>
        {
          movies.length ? movies.map(this._renderMovie) : <Spinner />
        }
      </View>
    )
  }

  _renderMovie = (movie: TMovieListDetail, i: number) => (
    <ListCardItem movie={movie} key={i} />
  )
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.topRated
})

const mapDispatchToProps = dispatch => ({
  fetchTopRatedMovies: bindActionCreators(fetchTopRatedMovies, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
