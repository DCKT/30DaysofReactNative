// @flow
import { CLOCK } from '../constants/index'
const TIME = 1000

let interval = null

export const startClock = () => (dispatch, getState) => {
  const isRunning = getState().clock.isRunning

  if (isRunning) {
    return
  }

  dispatch({ type: CLOCK.START })

  interval = setInterval(() => {
    const time = getState().clock.time

    dispatch({
      type: CLOCK.TICK,
      data: +(time + (TIME / 1000)).toFixed(1)
    })
  }, TIME)

  return interval
}

export const pauseClock = () => (dispatch) => {
  clearInterval(interval)

  return dispatch({ type: CLOCK.STOP })
}

export const resetClock = () => (dispatch) => {
  return dispatch({ type: CLOCK.RESET })
}
