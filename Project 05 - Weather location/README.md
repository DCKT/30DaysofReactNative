# Project 05 - Meteo location

## Notes iOS
The api endpoint of openweather is not secured (http only) so you must allow your app to accept insecure request in `Info.plit` :
```
<key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
```

## Requirements
[https://facebook.github.io/react-native/docs/geolocation.html](Setup InfoPlist & Manifest)

# react-native-starter
Simple React Native starter kit 

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Setup
Run `yarn` or `npm i` then `react-native link`.

**Note :** Do a replace all on `projectname` for your project name

## Support
Current React Native version supported : **0.42.3**

## Packages

This starter uses :
- `redux` as state manager
- `native-base` for his UI components
- `react-navigation` for the Router

## Scripts commands

Here is the available scripts commands : 
- `start`: run react-native packager
- `test`: run jest
- `android`: alias for "react-native run-android"
- `ios`: alias for "react-native run-ios"
- `lint`: run eslint
- `build:android`: create Android APK release
- `build:ios`: create iOS jsbundle release