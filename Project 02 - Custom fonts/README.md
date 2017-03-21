# Project 02 - Custom fonts

[Add a custom font on iOS and Android](https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4#.9a68kszcu)

In your `package.json`
```
"rnpm": {
  "assets": ["./assets/fonts"]
}
```

Run `react-native link` will make all the works for you <3

**Note :** On Android, take care of your filename.

#### Quick log fonts available on iOS
```
for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
```

# react-native-starter
Simple React Native starter kit 

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Setup
Run `yarn` or `npm i` then `react-native link`.

**Note :** Do a replace all on `project2` for your project name

## Support
Current React Native version supported : **0.42.3**

## Packages

This starter uses :
- `redux` as state manager
- `native-base` for his UI components
- `expo` for the SDK and Router

## Scripts commands

Here is the available scripts commands : 
- `start`: run react-native packager
- `test`: run jest
- `android`: alias for "react-native run-android"
- `ios`: alias for "react-native run-ios"
- `lint`: run eslint
- `build:android`: create Android APK
- `build:ios`: create iOS jsbundle
