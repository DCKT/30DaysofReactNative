// @flow
import { DEMO } from '../constants/index'

export const getTimestamp = () => (dispatch) => {
  return dispatch({
    type: DEMO.SET,
    data: Date.now()
  })
}
