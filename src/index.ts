import { NativeModules, Platform } from "react-native";

// Log available modules for debugging
console.log("Platform.OS:", Platform.OS);
console.log("NativeModules keys:", Object.keys(NativeModules));

// Define the Verloop interface
interface VerloopInterface {
  createUserConfig(clientId: string, userId: string): void;
  createAnonymousUserConfig(clientId: string): void;
  setButtonClickListener(): void;
  setUrlClickListener(): void;
  setFcmToken?(token: string): void; // Optional for Android
  putCustomField(key: string, value: string): void;
  putCustomFieldWithScope(key: string, value: string, scope: string): void;
  setRecipeId(recipeId: string): void;
  setUserEmail(userEmail: string): void;
  setUserName(userName: string): void;
  setUserPhone(userPhone: string): void;
  initialize(clientId: string): void;
  setUserId(userId: string): void;
  showChat(): void;
  addListener?(eventType: string): void; // Optional, depending on platform support
  removeListeners?(count: number): void; // Optional, depending on platform support
}

// Select the appropriate module based on platform
const VerloopModule = NativeModules.RNVerloopSdk

console.log("Selected VerloopModule:", VerloopModule);

// Default to an empty object if the module isn’t available
const VerloopNative = VerloopModule || {};

// Export the Verloop object with safe method calls
const Verloop: VerloopInterface = {
  createUserConfig: (clientId: string, userId: string): void => {
    if (!VerloopNative.createUserConfig) {
      console.error("createUserConfig not available on", Platform.OS);
      return;
    }
    VerloopNative.createUserConfig(clientId, userId);
  },
  createAnonymousUserConfig: (clientId: string): void => {
    if (!VerloopNative.createAnonymousUserConfig) {
      console.error("createAnonymousUserConfig not available on", Platform.OS);
      return;
    }
    VerloopNative.createAnonymousUserConfig(clientId);
  },
  setButtonClickListener: (): void => {
    if (!VerloopNative.setButtonClickListener) {
      console.error("setButtonClickListener not available on", Platform.OS);
      return;
    }
    VerloopNative.setButtonClickListener();
  },
  setUrlClickListener: (): void => {
    if (!VerloopNative.setUrlClickListener) {
      console.error("setUrlClickListener not available on", Platform.OS);
      return;
    }
    VerloopNative.setUrlClickListener();
  },
  setFcmToken: (token: string): void => {
    if (Platform.OS === 'android') {
      if (!VerloopNative.setFcmToken) {
        console.error("setFcmToken not available on android");
        return;
      }
      VerloopNative.setFcmToken(token);
    }
  },
  putCustomField: (key: string, value: string): void => {
    if (!VerloopNative.putCustomField) {
      console.error("putCustomField not available on", Platform.OS);
      return;
    }
    VerloopNative.putCustomField(key, value);
  },
  putCustomFieldWithScope: (key: string, value: string, scope: string): void => {
    if (!VerloopNative.putCustomFieldWithScope) {
      console.error("putCustomFieldWithScope not available on", Platform.OS);
      return;
    }
    VerloopNative.putCustomFieldWithScope(key, value, scope);
  },
  setRecipeId: (recipeId: string): void => {
    if (!VerloopNative.setRecipeId) {
      console.error("setRecipeId not available on", Platform.OS);
      return;
    }
    VerloopNative.setRecipeId(recipeId);
  },
  setUserEmail: (userEmail: string): void => {
    if (!VerloopNative.setUserEmail) {
      console.error("setUserEmail not available on", Platform.OS);
      return;
    }
    VerloopNative.setUserEmail(userEmail);
  },
  setUserName: (userName: string): void => {
    if (!VerloopNative.setUserName) {
      console.error("setUserName not available on", Platform.OS);
      return;
    }
    VerloopNative.setUserName(userName);
  },
  setUserPhone: (userPhone: string): void => {
    if (!VerloopNative.setUserPhone) {
      console.error("setUserPhone not available on", Platform.OS);
      return;
    }
    VerloopNative.setUserPhone(userPhone);
  },
  initialize: (clientId: string): void => {
    if (!VerloopNative.initialize) {
      console.error("initialize not available on", Platform.OS);
      return;
    }
    VerloopNative.initialize(clientId);
  },
  setUserId: (userId: string): void => {
    if (!VerloopNative.setUserId) {
      console.error("setUserId not available on", Platform.OS);
      return;
    }
    VerloopNative.setUserId(userId);
  },
  showChat: (): void => {
    if (!VerloopNative.showChat) {
      console.error("showChat not available on", Platform.OS);
      return;
    }
    VerloopNative.showChat();
  },
  addListener: (eventType: string): void => {
    if (!VerloopNative.addListener) {
      console.error("addListener not available on", Platform.OS);
      return;
    }
    VerloopNative.addListener(eventType);
  },
  removeListeners: (count: number): void => {
    if (!VerloopNative.removeListeners) {
      console.error("removeListeners not available on", Platform.OS);
      return;
    }
    VerloopNative.removeListeners(count);
  },
};

export default Verloop;