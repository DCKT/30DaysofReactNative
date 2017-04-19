import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

global.storage = new Storage({
  storageBackend: AsyncStorage,
  defaultExpires: null
})
