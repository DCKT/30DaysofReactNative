import { DEMO } from '../constants/'

const initialState = {
  text: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DEMO.SET:
      return {
        ...state,
        text: action.data
      }
    default:
      return state
  }
}
