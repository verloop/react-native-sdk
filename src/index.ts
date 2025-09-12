import { NativeModules, Platform } from "react-native";


// Define the Verloop interface
interface VerloopInterface {
  createUserConfig(clientId: string, userId: string): void;
  createAnonymousUserConfig(clientId: string): void;
  setButtonClickListener(): void;
  setUrlClickListener(): void;
  setFcmToken?(token: string): void; // Android-specific method
  putCustomField(key: string, value: string): void;
  putCustomFieldWithScope(key: string, value: string, scope: string): void;
  setRecipeId(recipeId: string): void;
  setUserEmail(userEmail: string): void;
  setUserName(userName: string): void;
  setUserPhone(userPhone: string): void;
  showChat(): void;
  addListener(eventType: string): void; // Android-specific method
  removeListeners(count: number): void; // Android-specific method
  clearChat?(): void; // IOS-specific method
  logOut?(): void; // IOS-specific method
  openWidget?(): void; // IOS-specific method
  closeWidget?(): void; // IOS-specific method
  enableiOSNotification?(notificatioDeviceToken: string): void; // IOS-specific method
  login?(): void; // IOS-specific method
  logingWithUserId?(userId: string): void; // IOS-specific method
  setUrlRedirectionFlag?(canRedirect: string): void; // IOS-specific method
  dismissChat(): void;
}

const VerloopModule = NativeModules.RNVerloopSdk

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
  clearChat: (): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.clearChat) {
        console.error("clearChat not available on iOS");
        return;
      }
      VerloopNative.clearChat();
    }
  },

  logOut: (): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.logOut) {
        console.error("logOut not available on iOS");
        return;
      }
      VerloopNative.logOut();
    }
  },

  openWidget: (): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.openWidget) {
        console.error("openWidget not available on iOS");
        return;
      }
      VerloopNative.openWidget();
    }
  },

  closeWidget: (): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.closeWidget) {
        console.error("closeWidget not available on iOS");
        return;
      }
      VerloopNative.closeWidget();
    }
  },

  enableiOSNotification: (notificatioDeviceToken: string): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.enableiOSNotification) {
        console.error("enableiOSNotification not available on iOS");
        return;
      }
      VerloopNative.enableiOSNotification(notificatioDeviceToken);
    }
  },

  login: (): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.login) {
        console.error("login not available on iOS");
        return;
      }
      VerloopNative.login();
    }
  },

  logingWithUserId: (userId: string): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.logingWithUserId) {
        console.error("logingWithUserId not available on iOS");
        return;
      }
      VerloopNative.logingWithUserId(userId);
    }
  },

  setUrlRedirectionFlag: (canRedirect: string): void => {
    if (Platform.OS === 'ios') {
      if (!VerloopNative.setUrlRedirectionFlag) {
        console.error("setUrlRedirectionFlag not available on iOS");
        return;
      }
      VerloopNative.setUrlRedirectionFlag(canRedirect);
    }
  },
  dismissChat: (): void => {
    if (!VerloopNative.dismissChat) {
      console.error("dismissChat not available on", Platform.OS);
      return;
    }
    VerloopNative.dismissChat();
  },
};

export default Verloop;