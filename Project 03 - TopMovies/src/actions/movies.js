// @flow
import { MOVIES } from '../constants/index'
import { fetchTopRated, fetchMovieDetails as fetchDetails } from '../utils/api'
import type { TMoveListResult } from '../utils/types'

export const fetchTopRatedMovies = (page = 1) => dispatch => {
  dispatch({ type: MOVIES.SET_IS_FETCHING, data: true })

  return fetchTopRated({ page })
    .then(({ results }: TMoveListResult) => {
      return dispatch({
        type: MOVIES.FETCH_TOP_RATED,
        data: results
      })
    })
    .then(() => {
      dispatch({ type: MOVIES.SET_IS_FETCHING, data: false })
    })
}

export const fetchMovieDetails = (id: string) => dispatch => {
  dispatch({ type: MOVIES.SET_IS_FETCHING, data: true })

  return fetchDetails({ id })
    .then(movie => {
      return dispatch({
        type: MOVIES.FETCH_DETAILS,
        data: movie
      })
    })
    .then(() => {
      dispatch({ type: MOVIES.SET_IS_FETCHING, data: false })
    })
}
