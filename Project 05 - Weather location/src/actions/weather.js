// @flow
import { WEATHER } from '../constants/index'
import { fetchWeatherByCoordinates } from '../utils/api'

export const fetchWeather = (latitude: number, longitude: number) => (dispatch) => {
  return fetchWeatherByCoordinates(latitude, longitude)
    .then(data => {
      return dispatch({
        type: WEATHER.FETCH,
        data
      })
    })
}
