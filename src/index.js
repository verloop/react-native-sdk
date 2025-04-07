"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const VerloopModule = react_native_1.NativeModules.RNVerloopSdk;
// Default to an empty object if the module isn’t available
const VerloopNative = VerloopModule || {};
// Export the Verloop object with safe method calls
const Verloop = {
    createUserConfig: (clientId, userId) => {
        if (!VerloopNative.createUserConfig) {
            console.error("createUserConfig not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.createUserConfig(clientId, userId);
    },
    createAnonymousUserConfig: (clientId) => {
        if (!VerloopNative.createAnonymousUserConfig) {
            console.error("createAnonymousUserConfig not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.createAnonymousUserConfig(clientId);
    },
    setButtonClickListener: () => {
        if (!VerloopNative.setButtonClickListener) {
            console.error("setButtonClickListener not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setButtonClickListener();
    },
    setUrlClickListener: () => {
        if (!VerloopNative.setUrlClickListener) {
            console.error("setUrlClickListener not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setUrlClickListener();
    },
    setFcmToken: (token) => {
        if (react_native_1.Platform.OS === 'android') {
            if (!VerloopNative.setFcmToken) {
                console.error("setFcmToken not available on android");
                return;
            }
            VerloopNative.setFcmToken(token);
        }
    },
    putCustomField: (key, value) => {
        if (!VerloopNative.putCustomField) {
            console.error("putCustomField not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.putCustomField(key, value);
    },
    putCustomFieldWithScope: (key, value, scope) => {
        if (!VerloopNative.putCustomFieldWithScope) {
            console.error("putCustomFieldWithScope not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.putCustomFieldWithScope(key, value, scope);
    },
    setRecipeId: (recipeId) => {
        if (!VerloopNative.setRecipeId) {
            console.error("setRecipeId not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setRecipeId(recipeId);
    },
    setUserEmail: (userEmail) => {
        if (!VerloopNative.setUserEmail) {
            console.error("setUserEmail not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setUserEmail(userEmail);
    },
    setUserName: (userName) => {
        if (!VerloopNative.setUserName) {
            console.error("setUserName not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setUserName(userName);
    },
    setUserPhone: (userPhone) => {
        if (!VerloopNative.setUserPhone) {
            console.error("setUserPhone not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setUserPhone(userPhone);
    },
    showChat: () => {
        if (!VerloopNative.showChat) {
            console.error("showChat not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.showChat();
    },
    addListener: (eventType) => {
        if (!VerloopNative.addListener) {
            console.error("addListener not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.addListener(eventType);
    },
    removeListeners: (count) => {
        if (!VerloopNative.removeListeners) {
            console.error("removeListeners not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.removeListeners(count);
    },
    clearChat: () => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.clearChat) {
                console.error("clearChat not available on iOS");
                return;
            }
            VerloopNative.clearChat();
        }
    },
    logOut: () => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.logOut) {
                console.error("logOut not available on iOS");
                return;
            }
            VerloopNative.logOut();
        }
    },
    openWidget: () => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.openWidget) {
                console.error("openWidget not available on iOS");
                return;
            }
            VerloopNative.openWidget();
        }
    },
    closeWidget: () => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.closeWidget) {
                console.error("closeWidget not available on iOS");
                return;
            }
            VerloopNative.closeWidget();
        }
    },
    enableiOSNotification: (notificatioDeviceToken) => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.enableiOSNotification) {
                console.error("enableiOSNotification not available on iOS");
                return;
            }
            VerloopNative.enableiOSNotification(notificatioDeviceToken);
        }
    },
    login: () => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.login) {
                console.error("login not available on iOS");
                return;
            }
            VerloopNative.login();
        }
    },
    logingWithUserId: (userId) => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.logingWithUserId) {
                console.error("logingWithUserId not available on iOS");
                return;
            }
            VerloopNative.logingWithUserId(userId);
        }
    },
    setUrlRedirectionFlag: (canRedirect) => {
        if (react_native_1.Platform.OS === 'ios') {
            if (!VerloopNative.setUrlRedirectionFlag) {
                console.error("setUrlRedirectionFlag not available on iOS");
                return;
            }
            VerloopNative.setUrlRedirectionFlag(canRedirect);
        }
    },
};
exports.default = Verloop;
