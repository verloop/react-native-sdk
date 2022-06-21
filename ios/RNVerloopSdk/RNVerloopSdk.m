
#import "RNVerloopSdk.h"

@import VerloopSDKiOS;

@implementation RNVerloopSdk

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"veloop_button_clicked", @"veloop_url_clicked"];
}

typedef void (^LiveChatButtonClickListener)(NSString *, NSString *, NSString *);
typedef void (^LiveChatUrlClickListener)(NSString *);

VLConfig *config;
VerloopSDK *verloop;

RCT_EXPORT_METHOD(createUserConfig:(NSString *)clientId userId:(NSString *)userId )
{
    config = [[VLConfig alloc] initWithClientId:clientId userId:userId];
    [config setButtonOnClickListenerOnButtonClicked:^(NSString *title, NSString *type, NSString *payload){
        [self sendEventWithName:@"veloop_button_clicked" body:@{@"title": title, @"type": type, @"payload": payload }];
        return;
    }];
    [config setUrlClickListenerOnUrlClicked:^(NSString *url){
        [self sendEventWithName:@"veloop_url_clicked" body:@{@"url": url}];
        return;
    }];
}

RCT_EXPORT_METHOD(createAnonymousUserConfig:(NSString *)clientId )
{
   config = [[VLConfig alloc] initWithClientId:clientId];
   [config setButtonOnClickListenerOnButtonClicked:^(NSString *title, NSString *type, NSString *payload){
       [self sendEventWithName:@"veloop_button_clicked" body:@{@"title": title, @"type": type, @"payload": payload }];
       return;
   }];

   [config setUrlClickListenerOnUrlClicked:^(NSString *url){
       [self sendEventWithName:@"veloop_url_clicked" body:@{@"url": url}];
       return;
   }];
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

RCT_EXPORT_METHOD(putCustomFieldWithScope:(NSString *)key userId:(NSString *)value scope:(NSString *)scopeValue)
{
   if(config != nil){
       if ([scopeValue isEqualToString:@"ROOM"]){
           [config putCustomFieldWithKey:key value:value scope:SCOPEROOM];
       }else if ([scopeValue isEqualToString:@"USER"]){
            [config putCustomFieldWithKey:key value:value scope:SCOPEUSER];
       }else{
            [config putCustomFieldWithKey:key value:value scope:SCOPEUSER];
       }

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
       verloop = [[VerloopSDK alloc] initWithConfig:config];
   }
}

RCT_EXPORT_METHOD(hideChat)
{
   if(verloop != nil){
       [verloop hide];
   }
}

@end

