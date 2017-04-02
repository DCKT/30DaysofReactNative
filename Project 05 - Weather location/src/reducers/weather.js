import { WEATHER } from '../constants/'

const initialState = {
  data: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case WEATHER.FETCH:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
