import { MOVIES } from '../constants/'

const initialState = {
  topRated: [],
  details: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MOVIES.FETCH_TOP_RATED:
      return {
        ...state,
        topRated: action.data
      }
    case MOVIES.FETCH_DETAILS:
      return {
        ...state,
        details: action.data
      }
    default:
      return state
  }
}
