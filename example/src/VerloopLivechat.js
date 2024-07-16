import { Component } from 'react';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {
  async componentDidMount() {
    const clientId = 'reactnative'; // it is same as https://<YOUR COMPANY ID>.verloop.io
    const userId = 'TestReactNative'; // it is the unique userID to identify all the chats for this user

    VerloopSdk.createUserConfig(clientId, userId);
    //or
    //VerloopSdk.createAnonymousUserConfig(clientId);

    VerloopSdk.setButtonClickListener((response) => {
      console.log('ButtonClickListener Response', response);
    });

    VerloopSdk.setUrlClickListener((response) => {
      console.log('UrlClickListener Response', response);
    });

    //optional
    //VerloopSdk.putCustomField('test', 'value');
    //VerloopSdk.putCustomFieldWithScope('test', 'value', 'USER');
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
  }
}
