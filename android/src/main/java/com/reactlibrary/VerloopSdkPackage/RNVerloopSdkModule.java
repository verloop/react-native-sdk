
package com.reactlibrary.VerloopSdkPackage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.app.Activity;

import io.verloop.sdk.Verloop;
import io.verloop.sdk.LiveChatButtonClickListener;
import io.verloop.sdk.LiveChatUrlClickListener;
import io.verloop.sdk.VerloopConfig;

import android.util.Log;


public class RNVerloopSdkModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private final ReactApplicationContext reactContext;

  private VerloopConfig verloopConfig;

  private Verloop verloop;

  public RNVerloopSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addLifecycleEventListener(this);
  }

  @Override
  public String getName() {
    return "RNVerloopSdk";
  }

  private void sendEvent(ReactApplicationContext reactContext,
                         String eventName,
                         WritableMap params) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }

  private void setButtonClickListener(VerloopConfig verloopConfig){
    verloopConfig.setButtonOnClickListener(new LiveChatButtonClickListener(){
      public void buttonClicked(String title, String type, String payload) {
        WritableMap params = Arguments.createMap();
        params.putString("title", title);
        params.putString("type", type);
        params.putString("payload", payload);
        sendEvent(reactContext, "veloop_button_clicked", params);
      }
    });
  }

  private void setUrlClickListener(VerloopConfig verloopConfig){
    verloopConfig.setUrlClickListener(new LiveChatUrlClickListener(){
      public void urlClicked(String url) {
        WritableMap params = Arguments.createMap();
        params.putString("url", url);
        sendEvent(reactContext, "veloop_url_clicked", params);
      }
    });
  }

  @ReactMethod
  public void createUserConfig(String clientId, String userId) {
    verloopConfig = new VerloopConfig(clientId, userId);
    setButtonClickListener(verloopConfig);
    setUrlClickListener(verloopConfig);
  }

  @ReactMethod
  public void createAnonymousUserConfig(String clientId) {
    verloopConfig = new VerloopConfig(clientId);
    setButtonClickListener(verloopConfig);
    setUrlClickListener(verloopConfig);
  }

  @ReactMethod
  public void setFcmToken(String token) {
    Log.d("Passing FCM Token Config Check",token);
    if (verloopConfig != null) {
      Log.d("Passing FCM Token", token);
      verloopConfig.setFcmToken(token);
    }
  }


  @ReactMethod
  public void getFcmToken(String token) {
    Log.d("Getting FCM Token Config Check",token);
    if (verloopConfig != null) {
      Log.d("Passing FCM Token", token);
      verloopConfig.getFcmToken(token);
    }
  }

  @ReactMethod
  public void setStaging(Boolean isStaging) {
    if (verloopConfig != null) {
      verloopConfig.setStaging(isStaging);
    }
  }

  @ReactMethod
  public void putCustomField(String key, String value) {
    if (verloopConfig != null) {
      verloopConfig.putCustomField(key, value);
    }
  }

  @ReactMethod
  public void setRecipeId(String recipeId) {
    if (verloopConfig != null) {
      verloopConfig.setRecipeId(recipeId);
    }
  }

  @ReactMethod
  public void setUserEmail(String userEmail) {
    if (verloopConfig != null) {
      verloopConfig.setUserEmail(userEmail);
    }
  }

  @ReactMethod
  public void setUserName(String userName) {
    if (verloopConfig != null) {
      verloopConfig.setUserName(userName);
    }
  }

  @ReactMethod
  public void setUserPhone(String userPhone) {
    if (verloopConfig != null) {
      verloopConfig.setUserPhone(userPhone);
    }
  }

  @ReactMethod
  public void showChat() {
    Log.d("Show Chat", verloopConfig);
    if (verloopConfig != null) {
      if(verloop == null){
        final Activity activity = getCurrentActivity();
        verloop = new Verloop(activity, verloopConfig);
      }
      
      verloop.showChat();
    }
  }

  @ReactMethod
  public void hideChat() {
    if(verloop != null){
      verloop.hideChat();
    }
  }

  @Override
  public void onHostResume() {
    // do nothing
  }

  @Override
  public void onHostPause() {
    // do nothing
  }

  @Override
  public void onHostDestroy() {
    if(verloop != null){
      verloop.onStopChat();
    }
  }
}