import {Component} from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {


    async componentDidMount() {

        console.log("Inside component did mount")

        const clientId = "hello"; // it is same as https://<YOUR COMPANY ID>.verloop.io
        const userId = "raghav"; // it is the unique userID to identify all the chats for this user

        // VerloopSdk.createAnonymousUserConfig(clientId);
        //or
        VerloopSdk.createUserConfig(clientId, userId);

        // const eventEmitter = new NativeEventEmitter(VerloopSdk);
        // this.eventListener = eventEmitter.addListener('veloop_button_clicked', (event) => {
        //    console.log(event.title);
        //    console.log(event.type);
        //    console.log(event.payload);
        // });
        
        // this.eventListener = eventEmitter.addListener('veloop_url_clicked', (event) => {
        //    console.log(event.url);
        // });

        //optional
//        VerloopSdk.putCustomField(key, value);
        //optional
        //VerloopSdk.putCustomFieldWithScope("test", "value", "USER");
//        //optional
//        VerloopSdk.setRecipeId(recipeId);
//        //optional
//        VerloopSdk.setUserEmail(email);
//        //optional
//        VerloopSdk.setUserPhone(phoneNumber);
//        //optional
//        VerloopSdk.setUserName(name);

        VerloopSdk.showChat();

        console.log("Show chat")

//        VerloopSdk.hideChat();
    }

    render() {
        return null;
    }
    componentWillUnmount() {
       // this.eventListener.remove(); //Removes the listener
    }
}
