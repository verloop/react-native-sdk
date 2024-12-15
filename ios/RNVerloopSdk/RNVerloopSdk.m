
#import <React/RCTLog.h>

#import "RNVerloopSdk.h"

@import UIKit;

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

UIWindow * prev;
UIWindow * win;

RCT_EXPORT_METHOD(createUserConfig:(NSString *)clientId userId:(NSString *)userId )
{

    RCTLogInfo(@"Creating User Config %@ at %@", clientId, userId);
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

    RCTLogInfo(@"Creating Anonymous User Config %@", clientId);
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
       RCTLogInfo(@"Passing Fcm Token %@", token);
       [config setNotificationTokenWithNotificationToken:token];
   }
}

RCT_EXPORT_METHOD(setStaging:(BOOL) isStaging)
{
   if(config != nil){
       RCTLogInfo(@"Setting Staging");
       [config setStagingWithIsStaging:isStaging];
   }
}

RCT_EXPORT_METHOD(putCustomField:(NSString *)key userId:(NSString *)value)
{
   if(config != nil){
       RCTLogInfo(@"Setting custom fields");
       [config putCustomFieldWithKey:key value:value scope:SCOPEROOM];
   }
}

RCT_EXPORT_METHOD(putCustomFieldWithScope:(NSString *)key userId:(NSString *)value scope:(NSString *)scopeValue)
{
   if(config != nil){
       RCTLogInfo(@"Setting custom fields %@:%@ on scope %@", key, value, scopeValue);
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
       RCTLogInfo(@"Setting recipe %@", recipeId);
       [config setRecipeIdWithRecipeId:recipeId];
   }
}

RCT_EXPORT_METHOD(setUserEmail:(NSString *)userEmail)
{
   if(config != nil){
       RCTLogInfo(@"Setting useremail %@", userEmail);
       [config setUserEmailWithUserEmail:userEmail];
   }
}

RCT_EXPORT_METHOD(setUserName:(NSString *)userName)
{
   if(config != nil){
       RCTLogInfo(@"Setting username %@", userName);
       [config setUserNameWithUserName:userName];
   }
}

RCT_EXPORT_METHOD(setUserPhone:(NSString *)userPhone)
{
   if(config != nil){
       RCTLogInfo(@"Setting userphone %@", userPhone);
       [config setUserPhoneWithUserPhone:userPhone];
   }
}

RCT_EXPORT_METHOD(showChat)
{
   if(config != nil){
       printf("came to showChat");
       verloop = [[VerloopSDK alloc] initWithConfig:config];
       
       [verloop observeLiveChatEventsOnVlEventDelegate:self];
       
       prev = [[[UIApplication sharedApplication] delegate] window];
       
       win = [[UIWindow alloc] init];
       [win setOpaque:true];
       [win setBackgroundColor:[UIColor whiteColor]];
       win.frame = [[UIScreen mainScreen] bounds];
       win.windowLevel = UIWindowLevelNormal + 1;
       win.rootViewController = [verloop getNavController];
       [win makeKeyAndVisible];

   }
}

RCT_EXPORT_METHOD(hideChat)
{
   if(verloop != nil){
       [verloop hide];
   }
}


- (void) onChatMinimized{
    
    RCTLogInfo(@"Chat Minimized");

    [win resignKeyWindow];
    [prev makeKeyAndVisible];
    prev = nil;
    win.windowLevel = UIWindowLevelNormal - 30;
}

@end

