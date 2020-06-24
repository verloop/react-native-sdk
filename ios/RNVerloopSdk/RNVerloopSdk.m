
#import "RNVerloopSdk.h"
#import <React/RCTLog.h>
#import <VerloopSDK/VerloopSDK-Swift.h>

@implementation RNVerloopSdk

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

VLConfig *config;

RCT_EXPORT_METHOD(createUserConfig:(NSString *)clientId userId:(NSString *)userId )
{
    printf("came to createUserConfig");
    config = [[VLConfig alloc] initWithClientId:clientId userId:userId];
}

RCT_EXPORT_METHOD(createAnonymousUserConfig:(NSString *)clientId )
{
   config = [[VLConfig alloc] initWithClientId:clientId];
}

RCT_EXPORT_METHOD(setFcmToken:(NSString *)token)
{
   if(config != nil){
       [config setNotificationTokenWithNotificationToken:token];
   }
}

RCT_EXPORT_METHOD(setStaging:(Boolean) isStaging)
{
   if(config != nil){
       [config setStagingWithIsStaging:isStaging];
   }
}

RCT_EXPORT_METHOD(putCustomField:(NSString *)key userId:(NSString *)value)
{
   if(config != nil){
       [config putCustomFieldWithKey:key value:value scope:SCOPEUSER];
   }
}

RCT_EXPORT_METHOD(setRecipeId:(NSString *)recipeId)
{
   if(config != nil){
       [config setRecipeIdWithRecipeId:recipeId];
   }
}

RCT_EXPORT_METHOD(setUserEmail:(NSString *)userEmail)
{
   if(config != nil){
       [config setUserEmailWithUserEmail:userEmail];
   }
}

RCT_EXPORT_METHOD(setUserName:(NSString *)userName)
{
   if(config != nil){
       [config setUserNameWithUserName:userName];
   }
}

RCT_EXPORT_METHOD(setUserPhone:(NSString *)userPhone)
{
   if(config != nil){
       [config setUserPhoneWithUserPhone:userPhone];
   }
}

RCT_EXPORT_METHOD(showChat)
{
   if(config != nil){
       printf("came to showChat");
       VerloopSDK *verloop = [[VerloopSDK alloc] initWithConfig:config];
       [verloop start];
   }
}

@end
  
