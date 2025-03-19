declare module "awesome-verloop" {
  interface VerloopInterface {
    createUserConfig(clientId: string, userId: string): void;
    createAnonymousUserConfig(clientId: string): void;
    setButtonClickListener(): void;
    setUrlClickListener(): void;
    setFcmToken(token: string): void;
    putCustomField(key: string, value: string): void;
    putCustomFieldWithScope(key: string, value: string, scope: string): void;
    setRecipeId(recipeId: string): void;
    setUserEmail(userEmail: string): void;
    setUserName(userName: string): void;
    setUserPhone(userPhone: string): void;
    showChat(): void;
    addListener(eventType: string): void;
    removeListeners(count: number): void;
  }

  const Verloop: VerloopInterface;
  export default Verloop;
}
