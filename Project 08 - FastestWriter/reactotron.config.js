import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

if (__DEV__) {
  global.Rtron = Reactotron
  Reactotron
    .configure({ name: 'React Native Demo' })
    .use(reactotronRedux())
    .connect()
}
