## Getting started

> **Important Notes**: 
> - This SDK version supports React Native >= 0.70.0. For older React Native versions (< 0.70.0), please use our previous package versions.
> - For Expo users: This SDK requires native modules and won't work with Expo Go. You must use Development Build.

### Installation

#### For Expo projects:
1. Install the package:

`$ npm install react-native-verloop-sdk --save`

### Manual Installation (React Native >= 0.70)

The package is automatically linked when building the app. No additional installation steps are required.

### Mostly automatic installation (React Native < 0.70)

For React Native versions below 0.70, please use our older package versions and follow the legacy installation steps:

`$ react-native link react-native-verloop-sdk`

### If you are using proguard in android add the following (React Native < 0.70)

```
-keepattributes *Annotation*
-keepclassmembers class ** {
    @org.greenrobot.eventbus.Subscribe <methods>;
}
-keep enum org.greenrobot.eventbus.ThreadMode { *; }
```

### Pods installation

#### iOS

1. Navigate to Your iOS Directory:
   Open a terminal and navigate to the ios directory of your React Native project:
   `cd ios`
2. Edit Your Podfile:
   Open the generated Podfile in your favorite text editor and add the necessary ,uncomment platform set like below :
   `platform :ios, '13.0'`
3. Install Pods:
   `pod install`

   Updating Pods : (if needed)
   `cd ios`
   `pod install --repo-update`


#### Android (React Native < 0.70)

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
  useEffect(() => {
    const clientId = 'reactnative'; // Replace with your actual client ID
    // Initialize Verloop SDK
    VerloopSdk.createAnonymousUserConfig(clientId);
    // Set up event emitter with the raw native module
    const eventEmitter = new NativeEventEmitter(VerloopSdk);

    // Add listeners
    const buttonClickListener = eventEmitter.addListener(
      'veloop_button_clicked',
      event => {
        console.log('Button clicked event:', event);
      },
    );
    const urlClickListener = eventEmitter.addListener(
      'veloop_url_clicked',
      event => {
        console.log('URL clicked event:', event);
      },
    );

    VerloopSdk.putCustomField('test1', 'value');
    VerloopSdk.putCustomFieldWithScope('test2', 'value', 'USER');
    VerloopSdk.setUserEmail('user@example.com');
    VerloopSdk.setUserPhone('1234567890');
    VerloopSdk.setUserName('Test User');

    // Enable listeners and show chat
    VerloopSdk.setButtonClickListener();
    VerloopSdk.setUrlClickListener();

    return () => {
      buttonClickListener.remove();
      urlClickListener.remove();
    };
  }, []);
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