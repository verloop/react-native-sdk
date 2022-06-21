#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@import VerloopSDKiOS;

@interface RNVerloopSdk : RCTEventEmitter <RCTBridgeModule, VLEventDelegate>

@end
