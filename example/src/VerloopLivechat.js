import { Component } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';
import Toast from 'react-native-simple-toast';

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
    //VerloopSdk.setRecipeId("91a4a9a3-646b-4c30-84b8-0df01f5f8343");
    //optional
    VerloopSdk.setUserEmail('patelpankaj.1010@gmail.com');
    //optional
    VerloopSdk.setUserPhone('+918128308604');
    //optional
    VerloopSdk.setUserName('TestReactNative');

    VerloopSdk.showChat();

    //IOS Public Method

    //VerloopSdk.clearChat();

    //VerloopSdk.logOut();

    //Open Widget
    //VerloopSdk.openWidget()

    //Close Widget
    //VerloopSdk.closeWidget()
    

    //Enable Notification
    //VerloopSdk.enableiOSNotification(deviceToken)

    //Login
    //VerloopSdk.login()
    
    //LoginWithUserID
    //VerloopSdk.logingWithUserId(userId)
    
  }

  render() {
    return null;
  }
  componentWillUnmount() {
    this.eventListener.remove(); //Removes the listener
  }
}
