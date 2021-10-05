import React, {Component} from 'react';
import VerloopSdk from 'react-native-verloop-sdk';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

export default class VerloopLiveChat extends Component {

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

    async componentDidMount() {

      // Error in calling checkPermissions
      const token = await this.checkPermissionAndGetToken();
        if(token != null){
          console.log("Getting Token: ------ ", token);
          await VerloopSdk.setFcmToken(token);
        }
          
        await VerloopSdk.createAnonymousUserConfig('hello.dev');


        // const eventEmitter = new NativeEventEmitter(VerloopSdk);
        // this.eventListener = eventEmitter.addListener('veloop_button_clicked', (event) => {
        //    console.log(event.title);
        //    console.log(event.type);
        //    console.log(event.payload);
        // });
        
        // this.eventListener = eventEmitter.addListener('veloop_url_clicked', (event) => {
        //    console.log(event.url);
        // });


        VerloopSdk.showChat();
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