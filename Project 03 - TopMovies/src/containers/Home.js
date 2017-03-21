import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Spinner } from 'native-base'
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
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Top rated movies</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          {
            movies.length ? movies.map((movie, i) => (
              <ListCardItem movie={movie} key={i} />
            )) : <Spinner />
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.topRated
})

const mapDispatchToProps = dispatch => ({
  fetchTopRatedMovies: bindActionCreators(fetchTopRatedMovies, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
