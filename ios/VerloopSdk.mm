
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface  RCT_EXTERN_MODULE(RNVerloopSdk, NSObject)
RCT_EXTERN_METHOD(createUserConfig:(NSString *)clientId userId:(NSString *)userId)
RCT_EXTERN_METHOD(createAnonymousUserConfig:(NSString *)clientId)
RCT_EXTERN_METHOD(putCustomFieldWithScope:(NSString *)key value:(NSString *)value scope:(NSString *)scope)
RCT_EXTERN_METHOD(setRecipeId:(NSString *)recipeId)
RCT_EXTERN_METHOD(setUserEmail:(NSString *)userEmail)
RCT_EXTERN_METHOD(setUserPhone:(NSString *)userPhone)
RCT_EXTERN_METHOD(setUserName:(NSString *)userName)
RCT_EXTERN_METHOD(showChat)
@end
