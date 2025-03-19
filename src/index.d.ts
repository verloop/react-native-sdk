declare module "awesome-verloop" {
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
    addListener?(eventType: string): void; // Android-specific method
    removeListeners?(count: number): void; // Android-specific method
    clearChat?(): void; // IOS-specific method
    logOut?(): void; // IOS-specific method
    openWidget?(): void; // IOS-specific method
    closeWidget?(): void; // IOS-specific method
    enableiOSNotification?(notificatioDeviceToken: string): void; // IOS-specific method
    login?(): void; // IOS-specific method
    logingWithUserId?(userId: string): void; // IOS-specific method
    setUrlRedirectionFlag?(canRedirect: string): void; // IOS-specific method
  }

  const Verloop: VerloopInterface;
  export default Verloop;
}
