// @flow
import type { TWeather } from './types'
const API_KEY = 'a2ea1f47127fbe6103332ac938581927'

/* https://openweathermap.org/current */
export const fetchWeatherByCoordinates = (latitude: number, longitude: number): Promise<TWeather> => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}
