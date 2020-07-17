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

#### Additional iOS step:

* Add a line in podfile (ios ->Podfile) : ENV['SWIFT_VERSION'] = '4.2'
* Run pod install in the same folder

## Usage
```javascript
import {Component} from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {


    async componentDidMount() {
        const clientId = "hello"; // it is same as https://<YOUR COMPANY ID>.verloop.io
        const userId = "raghav"; // it is the unique userID to identify all the chats for this user

        // VerloopSdk.createAnonymousUserConfig(clientId);
        //or
        VerloopSdk.createUserConfig(clientId, userId);

        const eventEmitter = new NativeEventEmitter(VerloopSdk);
        this.eventListener = eventEmitter.addListener('veloop_button_clicked', (event) => {
           console.log(event.title);
           console.log(event.type);
           console.log(event.payload);
        });
        this.eventListener = eventEmitter.addListener('veloop_url_clicked', (event) => {
           console.log(event.url);
        });

        //optional
        VerloopSdk.putCustomField(key, value);
        //optional
        VerloopSdk.setRecipeId(recipeId);
        //optional
        VerloopSdk.setUserEmail(email);
        //optional
        VerloopSdk.setUserPhone(phoneNumber);
        //optional
        VerloopSdk.setUserName(name);

        VerloopSdk.showChat();
        // VerloopSdk.hideChat();
    }

    render() {
        return null;
    }
    componentWillUnmount() {
        this.eventListener.remove(); //Removes the listener
    }
}
```

### Steps to enable notification:

Create your application on firebase console. (https://console.firebase.google.com)

Download google-services.json and GoogleService-Info.plist for android and iOS respectively.\
Make sure your google-services.json and GoogleService-Info.plist are placed in correct folders.\
google-services.json is placed inside <YOUR-PROJECT>/android/app\
GoogleService-Info.plist is placed inside <YOUR-PROJECT>/ios
  
#### Android
Configure gradle files. https://firebase.google.com/docs/cloud-messaging/android/client#set-up-firebase-and-the-fcm-sdk

Add dependency:
`implementation 'com.google.firebase:firebase-messaging:20.0.1'`

Edit MainApplication.java:
```java
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;                       
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
   new MainReactPackage(),
   new RNFirebasePackage(),
   new RNFirebaseMessagingPackage(),
   new RNFirebaseNotificationsPackage()
  );                               
}
```

Add these lines in settings.gradle
```gradle
include ':react-native-firebase'                       
project(':react-native-firebase').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-firebase/android')
```
In app build gradle, add dependency:
```gradle
dependencies {
   compile(project(':react-native-firebase')) {   
       transitive = false
   }
   // ... other dependencies listed
}
```

Install firebase as a dependency\
`npm install --save react-native-firebase`

#### React Native Code
```typescript
import React, {Component} from 'react';
import VerloopSdk from 'react-native-verloop-sdk';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

export default class VerloopLiveChat extends Component {

    async componentDidMount() {
        const token = await checkPermissionAndGetToken();
        if(token != null){
          await VerloopSdk.setFcmToken(token);
        }
          
        await VerloopSdk.createAnonymousUserConfig('hello.stage');
        VerloopSdk.showChat();
    }
   
    async checkPermissionAndGetToken() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          return this.getToken();
      } else {
          const permissionGranted = this.requestPermission();
          if(permissionGranted){
            return this.getToken();
          }
      }
      return null;
    }
    
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
              // user has a device token
              await AsyncStorage.setItem('fcmToken', fcmToken);
          }
      }
      return fcmToken;
    }

    async requestPermission() {
      try {
          await firebase.messaging().requestPermission();
          return true;
      } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
      }
      return false;
    }

    render() {
        return null;
    }
}
```
