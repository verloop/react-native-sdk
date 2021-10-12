import React, {Component} from 'react';
import VerloopSdk from 'react-native-verloop-sdk';
import firebase from 'react-native-firebase';

import type { RemoteMessage } from 'react-native-firebase';

import { AsyncStorage } from 'react-native';

export default class VerloopLiveChat extends Component {

    async checkPermissionAndGetToken() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          return this.getToken();
      } else {
          const permissionGranted = await this.requestPermission();
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


      this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required

        console.log("Recieved Message: ", message)
      });

      this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log("Notification :", notification);

      });

      this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.

        console.log("Notification Displayed Listener Notification: ", notification)

      });

      this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
          // Process your notification as required

          console.log("Notification Listener: ", notification)

      });

      const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
    }
        
      await VerloopSdk.createAnonymousUserConfig('hello.stage');


      // const eventEmitter = new NativeEventEmitter(VerloopSdk);
      // this.eventListener = eventEmitter.addListener('veloop_button_clicked', (event) => {
      //    console.log(event.title);
      //    console.log(event.type);
      //    console.log(event.payload);
      // });
      
      // this.eventListener = eventEmitter.addListener('veloop_url_clicked', (event) => {
      //    console.log(event.url);
      // });


      console.log("Starting Chat");
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

    async componentWillUnmount() {
      this.messageListener();    
      this.removeNotificationDisplayedListener();
      this.removeNotificationListener();
  
    }
}