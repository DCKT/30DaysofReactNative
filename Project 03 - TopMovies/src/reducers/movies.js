import { MOVIES } from '../constants/'

const initialState = {
  topRated: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MOVIES.FETCH_TOP_RATED:
      return {
        ...state,
        topRated: action.data
      }
    default:
      return state
  }
}
