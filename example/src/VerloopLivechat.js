import { Component } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';
import Toast from 'react-native-simple-toast';
import PushNotification from "react-native-push-notification";

export default class VerloopLiveChat extends Component {
  async componentDidMount() {
    const clientId = 'reactnative'; // it is same as https://<YOUR COMPANY ID>.verloop.io
    const userId = 'TestReactNative'; // it is the unique userID to identify all the chats for this user

    VerloopSdk.createUserConfig(clientId, userId);
    //or
    //VerloopSdk.createAnonymousUserConfig(clientId);
  
    VerloopSdk.setButtonClickListener((error, response) => {
      console.log('Error', error, 'Response', response);
    });

    VerloopSdk.setUrlClickListener((error, response) => {
      console.log('Error', error, 'Response', response);
    });
    
    //optional
    VerloopSdk.putCustomFieldWithScope('test', 'value', 'USER');
    //optional
    //VerloopSdk.setRecipeId("<recipeId>");
    //optional
    VerloopSdk.setUserEmail('<userEmail>');
    //optional
    VerloopSdk.setUserPhone('<userPhone>');
    //optional
    VerloopSdk.setUserName('<userPhone>');

    VerloopSdk.enableiOSNotification('<device token>')

    VerloopSdk.showChat();
    
  }

  render() {
    return null;
  }
  componentWillUnmount() {
    this.eventListener.remove(); //Removes the listener
  }
}
