#import "VerloopSdk.h"
#import <React/RCTLog.h>

@implementation VerloopSdk


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

RCT_REMAP_METHOD(createUserConfig,clientId:(NSString *)clientId userId:(NSString *)userId
                           findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                           rejecter:(RCTPromiseRejectBlock)reject )
{
    printf("came to createUserConfig");
    config = [[VLConfig alloc] initWithClientId:clientId userId:userId];
    resolve(config);
}

RCT_REMAP_METHOD(createAnonymousUserConfig,clientId:(NSString *)clientId
                           findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                           rejecter:(RCTPromiseRejectBlock)reject )
{
    printf("came to createAnonymousUserConfig");
    config = [[VLConfig alloc] initWithClientId:clientId];
    resolve(config);
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
