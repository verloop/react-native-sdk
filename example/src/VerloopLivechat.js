import { Component } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';
import Toast from 'react-native-simple-toast'

export default class VerloopLiveChat extends Component {
  async componentDidMount() {
    const clientId = 'reactnative'; // it is same as https://<YOUR COMPANY ID>.verloop.io
    //const userId = "raghav"; // it is the unique userID to identify all the chats for this user

    // VerloopSdk.createAnonymousUserConfig(clientId);
    //or
    VerloopSdk.createAnonymousUserConfig(clientId);
    console.log('createAnonymousUserConfig');
     const eventEmitter = new NativeEventEmitter(VerloopSdk);
    this.eventListener = eventEmitter.addListener('veloop_button_clicked', (event) => {
       console.log("veloop_button_clicked",event);
       console.log("");
       console.log("");
    });

    this.eventListener = eventEmitter.addListener('veloop_url_clicked', (event) => {
        console.log("veloop_url_clicked",event);
    });

    //optional
    VerloopSdk.putCustomFieldWithScope("test", "value", "USER");
    //optional
    VerloopSdk.setRecipeId("");
    //optional
    VerloopSdk.setUserEmail("");
    //optional
    VerloopSdk.setUserPhone("");
    //optional
    VerloopSdk.setUserName("");

    VerloopSdk.showChat();

    //IOS Public Method
    
    VerloopSdk.clearChat();
    
    VerloopSdk.logOut();

    //Open Widget
    if (!clientId?.trim()){
      VerloopSdk.openWidget()
    }else{
      Toast.show("Please enter Client ID and try again",5.0)
    }
    
    //Close Widget 
    if (!clientId?.trim()){
      VerloopSdk.closeWidget()
    }else{
      Toast.show("Please enter Client ID and try again",5.0)
    }

    //Enable Notification
    if (!clientId?.trim()){
      VerloopSdk.enableiOSNotification(clientId)
    }else{
      Toast.show("Please enter Client ID and try again",5.0)
    }
    
     //LoginWithUserID
     if (!clientId?.trim()){
      VerloopSdk.setUserId(clientId)
    }else{
      Toast.show("Please enter Client ID and try again",5.0)
    }

  }

  render() {
    return null;
  }
  componentWillUnmount() {
    this.eventListener.remove(); //Removes the listener
  }
}
