package com.reactlibrary.VerloopSdkPackage

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.LifecycleEventListener
import io.verloop.sdk.Verloop
import io.verloop.sdk.VerloopConfig
import io.verloop.sdk.LiveChatButtonClickListener
import io.verloop.sdk.LiveChatUrlClickListener

@ReactModule(name = VerloopModule.NAME)
class VerloopModule(private val reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    companion object {
        const val NAME = "RNVerloopSdk"
    }

    private var verloopConfigBuilder: VerloopConfig.Builder? = null
    private var buttonClickCallListenerAdded: Boolean = false
    private var urlClickCallListenerAdded: Boolean = false
    private var customVariableList: MutableList<RNVerloopCustomVariable> = mutableListOf()
    private var verloop: Verloop? = null
    private var configModified: Boolean = false

    // Custom variable class
    data class RNVerloopCustomVariable(
        val key: String = "",
        val value: String = "",
        val scope: VerloopConfig.Scope = VerloopConfig.Scope.ROOM
    )

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String = NAME

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun createUserConfig(clientId: String, userId: String) {
        verloopConfigBuilder = VerloopConfig.Builder()
            .clientId(clientId)
            .userId(userId)
        configModified = true
    }

    @ReactMethod
    fun createAnonymousUserConfig(clientId: String) {
        verloopConfigBuilder = VerloopConfig.Builder().clientId(clientId)
        configModified = true
    }

    @ReactMethod
    fun setButtonClickListener() {
        buttonClickCallListenerAdded = true
        configModified = true
    }

    @ReactMethod
    fun setUrlClickListener() {
        urlClickCallListenerAdded = true
        configModified = true
    }

    @ReactMethod
    fun setFcmToken(token: String) {
        verloopConfigBuilder?.let {
            it.fcmToken = token
            configModified = true
        }
    }

    @ReactMethod
    fun putCustomField(key: String, value: String) {
        customVariableList.add(RNVerloopCustomVariable(key, value, VerloopConfig.Scope.ROOM))
        configModified = true
    }

    @ReactMethod
    fun putCustomFieldWithScope(key: String, value: String, scope: String) {
        when (scope) {
            "USER" -> customVariableList.add(RNVerloopCustomVariable(key, value, VerloopConfig.Scope.USER))
            "ROOM" -> customVariableList.add(RNVerloopCustomVariable(key, value, VerloopConfig.Scope.ROOM))
            else -> customVariableList.add(RNVerloopCustomVariable(key, value, VerloopConfig.Scope.ROOM))
        }
        configModified = true
    }

    @ReactMethod
    fun setRecipeId(recipeId: String) {
        verloopConfigBuilder?.let {
            it.recipeId = recipeId
            configModified = true
        }
    }

    @ReactMethod
    fun setUserEmail(userEmail: String) {
        verloopConfigBuilder?.let {
            it.userEmail = userEmail
            configModified = true
        }
    }

    @ReactMethod
    fun setUserName(userName: String) {
        verloopConfigBuilder?.let {
            it.userName = userName
            configModified = true
        }
    }

    @ReactMethod
    fun setUserPhone(userPhone: String) {
        verloopConfigBuilder?.let {
            it.userPhone = userPhone
            configModified = true
        }
    }

    @ReactMethod
    fun showChat() {
        val config = verloopConfigBuilder?.build()
        if (buttonClickCallListenerAdded) {
            config?.setButtonClickListener(object : LiveChatButtonClickListener {
                override fun buttonClicked(title: String?, type: String?, payload: String?) {
                    val params = Arguments.createMap()
                    params.putString("title", title)
                    params.putString("type", type)
                    params.putString("payload", payload)
                    sendEvent("veloop_button_clicked", params)
                }
            })
        }

        if (urlClickCallListenerAdded) {
            config?.setUrlClickListener(object : LiveChatUrlClickListener {
                override fun urlClicked(url: String?) {
                    val params = Arguments.createMap()
                    params.putString("url", url)
                    sendEvent("veloop_url_clicked", params)
                }
            })
        }

        if (customVariableList.isNotEmpty()) {
            for (item in customVariableList) {
                config?.putCustomField(item.key, item.value, item.scope)
            }
        }

        if (verloop == null || configModified) {
            val activity: Activity? = currentActivity
            if (activity != null) {
                verloop = config?.let { Verloop(activity, it) }
                configModified = false
            }
        }
        verloop?.showChat()
    }

    override fun onHostResume() {
        // Handle resume event if needed
    }

    override fun onHostPause() {
        // Handle pause event if needed
    }

    override fun onHostDestroy() {
        // Handle destroy event if needed
    }

    @ReactMethod
    fun addListener(type: String?) {
        // Required for RN event emitter
    }

    @ReactMethod
    fun removeListeners(type: Int?) {
        // Required for RN event emitter
    }
}