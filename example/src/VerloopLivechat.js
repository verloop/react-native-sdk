import { Component } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {
  async componentDidMount() {
    const clientId = 'reactnative'; // it is same as https://<YOUR COMPANY ID>.verloop.io
    const userId = 'TestReactNative'; // it is the unique userID to identify all the chats for this user

    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';
    //VerloopSdk.createUserConfig(clientId, userId);
    //or
    VerloopSdk.createAnonymousUserConfig(clientId);

    const eventEmitter = new NativeEventEmitter(VerloopSdk);
    VerloopSdk.setButtonClickListener();
    VerloopSdk.setUrlClickListener();
    this.eventListener = eventEmitter.addListener(
      'veloop_button_clicked',
      (event) => {
        console.log('veloop_button_clicked', event);
      }
    );
    this.eventListener = eventEmitter.addListener(
      'veloop_url_clicked',
      (event) => {
        console.log('veloop_url_clicked', event);
      }
    );

    //optional
    VerloopSdk.putCustomField('test1', 'value');
    VerloopSdk.putCustomFieldWithScope('test2', 'value', 'USER');
    //optional
    //VerloopSdk.setRecipeId("<recipeId>");
    //optional
    VerloopSdk.setUserEmail('<userEmail>');
    //optional
    VerloopSdk.setUserPhone('<userPhone>');
    //optional
    VerloopSdk.setUserName('<userPhone>');

    //Only for iOS
    //VerloopSdk.enableiOSNotification('<device token>')
    //VerloopSdk.setUrlRedirectionFlag("false")

    //Only for Android
    //VerloopSdk.setFcmToken("<FcmToken>")
    VerloopSdk.showChat();
  }

  render() {
    return null;
  }
  componentWillUnmount() {
    //Removes the listener
    this.eventListener.remove();
  }
}
