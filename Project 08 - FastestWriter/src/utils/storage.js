import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

export default new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null
})
