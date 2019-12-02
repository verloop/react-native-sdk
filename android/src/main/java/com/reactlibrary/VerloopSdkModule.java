package com.reactlibrary;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;

import io.verloop.sdk.Verloop;
import io.verloop.sdk.VerloopConfig;

public class VerloopSdkModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private VerloopConfig verloopConfig;

    private Verloop verloop;

    public VerloopSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "VerloopSdk";
    }

    @ReactMethod
    public void createUserConfig(String clientId, String userId, Promise promise) {
        verloopConfig = new VerloopConfig(clientId, userId);
        promise.resolve(null);
    }

    @ReactMethod
    public void createAnonymousUserConfig(String clientId, Promise promise) {
        verloopConfig = new VerloopConfig(clientId);
        promise.resolve(null);
    }

    @ReactMethod
    public void setFcmToken(String token) {
        if (verloopConfig != null) {
            verloopConfig.setFcmToken(token);
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
        if (verloopConfig != null) {
            if(verloop == null){
                final Activity activity = getCurrentActivity();
                verloop = new Verloop(activity, verloopConfig);
            }
            verloop.showChat();
        }
    }
}