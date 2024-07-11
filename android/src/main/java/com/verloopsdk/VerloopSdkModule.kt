package com.reactlibrary.VerloopSdkPackage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.LifecycleEventListener

import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments

import android.app.Activity
import android.widget.Toast

import io.verloop.sdk.Verloop
import io.verloop.sdk.LiveChatButtonClickListener
import io.verloop.sdk.LiveChatUrlClickListener
import io.verloop.sdk.VerloopConfig

class RNVerloopSdkModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private var verloopConfig: VerloopConfig? = null
    private var verloop: Verloop? = null
    private var configModified: Boolean = false

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "RNVerloopSdk"
    }

    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    private fun setButtonClickListener(verloopConfig: VerloopConfig) {
        verloopConfig?.setButtonClickListener(object : LiveChatButtonClickListener {
            override fun buttonClicked(title: String?, type: String?, payload: String?) {
                if (type == "web_url") {
                    val params = Arguments.createMap()
                    params.putString("title", title)
                    params.putString("type", type)
                    params.putString("payload", payload)
                    sendEvent(reactContext, "veloop_button_clicked", params)
                }
            }
        })
        configModified = true
//        verloopConfig.setButtonOnClickListener { title, type, payload ->
//            val params = Arguments.createMap()
//            params.putString("title", title)
//            params.putString("type", type)
//            params.putString("payload", payload)
//            sendEvent(reactContext, "veloop_button_clicked", params)
//        }
    }

    private fun setUrlClickListener(verloopConfig: VerloopConfig) {
        verloopConfig?.setUrlClickListener(object : LiveChatUrlClickListener {
            override fun urlClicked(url: String?) {
                val params = Arguments.createMap()
                params.putString("url", url)
                sendEvent(reactContext, "veloop_url_clicked", params)
            }
        })
//        verloopConfig.setUrlClickListener { url ->
//            val params = Arguments.createMap()
//            params.putString("url", url)
//            sendEvent(reactContext, "veloop_url_clicked", params)
//        }
        configModified = true
    }

    @ReactMethod
    fun createUserConfig(clientId: String, userId: String) {
        verloopConfig = VerloopConfig.Builder()
            .clientId(clientId)
            .userId(userId).build()
        setButtonClickListener(verloopConfig!!)
        setUrlClickListener(verloopConfig!!)
        configModified = true
    }

    @ReactMethod
    fun createAnonymousUserConfig(clientId: String) {
        verloopConfig = VerloopConfig.Builder().clientId(clientId).build()
        setButtonClickListener(verloopConfig!!)
        setUrlClickListener(verloopConfig!!)
        configModified = true
    }

    // @ReactMethod
    // fun setFcmToken(token: String) {
    //     verloopConfig?.let {
    //         it.setFcmToken(token)
    //         configModified = true
    //     }
    // }

    // @ReactMethod
    // fun setStaging(isStaging: Boolean) {
    //     verloopConfig?.setStaging(isStaging)
    // }

    @ReactMethod
    fun putCustomField(key: String, value: String) {
        verloopConfig?.let {
            it.putCustomField(key, value)
            configModified = true
        }
    }

    @ReactMethod
    fun putCustomFieldWithScope(key: String, value: String, scope: String) {
        verloopConfig?.let {
            when (scope) {
                "USER" -> it.putCustomField(key, value, VerloopConfig.Scope.USER)
                "ROOM" -> it.putCustomField(key, value, VerloopConfig.Scope.ROOM)
                else -> it.putCustomField(key, value)
            }
            configModified = true
        }
    }

    @ReactMethod
    fun setRecipeId(recipeId: String) {
        verloopConfig?.let {
            it.recipeId = recipeId
            configModified = true
        }
    }

    @ReactMethod
    fun setUserEmail(userEmail: String) {
        verloopConfig?.let {
            it.userEmail = userEmail
            configModified = true
        }
    }

    @ReactMethod
    fun setUserName(userName: String) {
        verloopConfig?.let {
            it.userName = userName
            configModified = true
        }
    }

    @ReactMethod
    fun setUserPhone(userPhone: String) {
        verloopConfig?.let {
            it.userPhone =  userPhone
            configModified = true
        }
    }

    @ReactMethod
    fun showChat() {
        verloopConfig?.let {
            if (verloop == null || configModified) {
                val activity: Activity? = currentActivity
                if (activity != null) {
                    verloop = Verloop(activity, it)
                    configModified = false
                }
            }
            verloop?.showChat()
        }
    }

    override fun onHostResume() {
        // do nothing
    }

    override fun onHostPause() {
        // do nothing
    }

    override fun onHostDestroy() {
        verloop?.onStopChat()
    }
}
