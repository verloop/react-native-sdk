# react-native-verloop-sdk

## Getting started

`$ npm install react-native-verloop-sdk --save`

### Mostly automatic installation

`$ react-native link react-native-verloop-sdk`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-verloop-sdk` and add `VerloopSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libVerloopSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.VerloopSdkPackage;` to the imports at the top of the file
  - Add `new VerloopSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-verloop-sdk'
  	project(':react-native-verloop-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-verloop-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-verloop-sdk')
  	```


## Usage
```javascript
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {

    async componentDidMount() {
        await VerloopSdk.createAnonymousUserConfig('hello.stage');
        VerloopSdk.showChat();
    }

    render() {
        return null;
    }
}
```
