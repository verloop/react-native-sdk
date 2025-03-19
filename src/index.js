"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
// Log available modules for debugging
console.log("Platform.OS:", react_native_1.Platform.OS);
console.log("NativeModules keys:", Object.keys(react_native_1.NativeModules));
// Select the appropriate module based on platform
const VerloopModule = react_native_1.Platform.OS === 'ios' ? react_native_1.NativeModules.RNVerloopSdk : react_native_1.NativeModules.AwesomeVerloop;
console.log("Selected VerloopModule:", VerloopModule);
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
    initialize: (clientId) => {
        if (!VerloopNative.initialize) {
            console.error("initialize not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.initialize(clientId);
    },
    setUserId: (userId) => {
        if (!VerloopNative.setUserId) {
            console.error("setUserId not available on", react_native_1.Platform.OS);
            return;
        }
        VerloopNative.setUserId(userId);
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
};
exports.default = Verloop;
