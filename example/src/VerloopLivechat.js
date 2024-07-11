import { Component } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {
  async componentDidMount() {
    const clientId = 'reactnative'; // it is same as https://<YOUR COMPANY ID>.verloop.io
    //const userId = "raghav"; // it is the unique userID to identify all the chats for this user

    // VerloopSdk.createAnonymousUserConfig(clientId);
    //or
    VerloopSdk.createAnonymousUserConfig(clientId);
    console.log('createAnonymousUserConfig');
    //VerloopSdk.clearChat()
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
    //VerloopSdk.putCustomFieldWithScope("test", "value", "USER");
    //optional
    //       VerloopSdk.setRecipeId(recipeId);
    //        //optional
    //        VerloopSdk.setUserEmail(email);
    //        //optional
    //        VerloopSdk.setUserPhone(phoneNumber);
    //        //optional
    //        VerloopSdk.setUserName(name);

    VerloopSdk.showChat();
    
  }

  render() {
    return null;
  }
  componentWillUnmount() {
    this.eventListener.remove(); //Removes the listener
  }
}
