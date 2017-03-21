import { CLOCK } from '../constants/'

const initialState = {
  time: 0,
  isRunning: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CLOCK.TICK:
      return {
        ...state,
        time: action.data
      }
    case CLOCK.STOP:
      return {
        ...state,
        isRunning: false
      }
    case CLOCK.START:
      return {
        ...state,
        isRunning: true
      }
    case CLOCK.RESET:
      return {
        ...state,
        time: 0
      }
    default:
      return state
  }
}
