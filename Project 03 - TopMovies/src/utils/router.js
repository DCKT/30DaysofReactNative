import { createRouter } from '@expo/ex-navigation'
import Home from '../containers/Home'
import Details from '../containers/Details'

export default createRouter(() => ({
  home: () => Home,
  details: () => Details
}))
