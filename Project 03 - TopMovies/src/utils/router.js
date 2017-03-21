import { createRouter } from '@expo/ex-navigation'
import Home from '../containers/Home'

export default createRouter(() => ({
  home: () => Home
}))
