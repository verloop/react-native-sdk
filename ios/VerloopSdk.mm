
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface  RCT_EXTERN_MODULE(RNVerloopSdk, NSObject)
RCT_EXTERN_METHOD(createUserConfig:(NSString *)clientId userId:(NSString *)userId)
RCT_EXTERN_METHOD(createAnonymousUserConfig:(NSString *)clientId)
RCT_EXTERN_METHOD(setButtonClickListener)
RCT_EXTERN_METHOD(setUrlClickListener)
RCT_EXTERN_METHOD(putCustomField:(NSString *)key value:(NSString *)value)
RCT_EXTERN_METHOD(putCustomFieldWithScope:(NSString *)key value:(NSString *)value scope:(NSString *)scope)
RCT_EXTERN_METHOD(setRecipeId:(NSString *)recipeId)
RCT_EXTERN_METHOD(setUserEmail:(NSString *)userEmail)
RCT_EXTERN_METHOD(setUserPhone:(NSString *)userPhone)
RCT_EXTERN_METHOD(setUserName:(NSString *)userName)
RCT_EXTERN_METHOD(showChat)
RCT_EXTERN_METHOD(clearChat)
RCT_EXTERN_METHOD(logOut)
RCT_EXTERN_METHOD(openWidget)
RCT_EXTERN_METHOD(closeWidget)
RCT_EXTERN_METHOD(enableiOSNotification:(NSString *)notificatioDeviceToken)
RCT_EXTERN_METHOD(login)
RCT_EXTERN_METHOD(logingWithUserId:(NSString *)userId)
RCT_EXTERN_METHOD(setUrlRedirectionFlag:(NSString *)canRedirect)
RCT_EXTERN_METHOD(showDownloadButton:(NSString *)isAllowFileDownload)
RCT_EXTERN_METHOD(openMenuWidget)
@end
