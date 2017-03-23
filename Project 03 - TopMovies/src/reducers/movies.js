import { MOVIES } from '../constants/'

const initialState = {
  topRated: [],
  details: null,
  isFetching: false
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
    case MOVIES.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.data
      }
    default:
      return state
  }
}
