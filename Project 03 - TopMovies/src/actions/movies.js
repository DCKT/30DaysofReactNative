// @flow
import { MOVIES } from '../constants/index'
import { fetchTopRated } from '../utils/api'
import type { TMoveListResult } from '../utils/types'

export const fetchTopRatedMovies = (page = 1) => dispatch => {
  return fetchTopRated({ page })
    .then(({ results }: TMoveListResult) => {
      return dispatch({
        type: MOVIES.FETCH_TOP_RATED,
        data: results
      })
    })
}
