import React, {Component} from 'react';
import VerloopSdk from 'react-native-verloop-sdk';

export default class VerloopLiveChat extends Component {

    async componentDidMount() {
        const clientId = "hello"; // it is same as https://<YOUR COMPANY ID>.verloop.io
//        await VerloopSdk.createAnonymousUserConfig(clientId);
        //or
        await VerloopSdk.createUserConfig(clientId, "213341");

        //optional
//        VerloopSdk.putCustomField(key, value);
//        //optional
//        VerloopSdk.setRecipeId(recipeId);
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
}