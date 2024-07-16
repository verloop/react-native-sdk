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
import kotlin.collections.arrayListOf

class RNVerloopCustomVariable(
     val key :String = "" ,
     val value :String = "",
     val scope : VerloopConfig.Scope = VerloopConfig.Scope.ROOM
)

class RNVerloopSdkModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private var verloopConfigBuilder: VerloopConfig.Builder? = null
    private var buttonClickCallback: Callback? = null
    private var urlClickCallback: Callback? = null
    private var customVariableList: MutableList<RNVerloopCustomVariable> =  mutableListOf<RNVerloopCustomVariable>()
    private var verloop: Verloop? = null
    private var configModified: Boolean = false

    init {
        reactContext.addLifecycleEventListener(this)
    }

    override fun getName(): String {
        return "RNVerloopSdk"
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
    fun setButtonClickListener(callback: Callback) {
        buttonClickCallback = callback
        configModified = true
    }

    @ReactMethod
    fun setUrlClickListener(callback: Callback) {
        urlClickCallback = callback
        configModified = true
    }

    @ReactMethod
    fun setFcmToken(token: String) {
        verloopConfigBuilder?.let {
            it.fcmToken = token
            configModified = true
        }
    }

//    @ReactMethod
//    fun setStaging(isStaging: Boolean) {
//        verloopConfigBuilder?.let {
//            it.isStaging = isStaging
//            configModified = true
//        }
//    }

    @ReactMethod
    fun putCustomField(key: String, value: String) {
        customVariableList.add(RNVerloopCustomVariable(key,value,VerloopConfig.Scope.ROOM))
        configModified = true
    }

    @ReactMethod
    fun putCustomFieldWithScope(key: String, value: String, scope: String) {

        when (scope) {
            "USER" -> customVariableList.add(RNVerloopCustomVariable(key,value,VerloopConfig.Scope.USER))
            "ROOM" -> customVariableList.add(RNVerloopCustomVariable(key,value,VerloopConfig.Scope.ROOM))
            else -> customVariableList.add(RNVerloopCustomVariable(key,value,VerloopConfig.Scope.ROOM))
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
            it.userPhone =  userPhone
            configModified = true
        }
    }

    @ReactMethod
    fun showChat() {
        val config = verloopConfigBuilder?.build()
        if (buttonClickCallback != null) {
            config?.setButtonClickListener(object : LiveChatButtonClickListener {
                override fun buttonClicked(title: String?, type: String?, payload: String?) {
                    if (type == "web_url") {
                        val params = Arguments.createMap()
                        params.putString("title", title)
                        params.putString("type", type)
                        params.putString("payload", payload)
                        buttonClickCallback!!.invoke(params)
                    }
                }
            })
        }

        if (urlClickCallback != null) {
            config?.setUrlClickListener(object : LiveChatUrlClickListener {
                    override fun urlClicked(url: String?) {
                        val params = Arguments.createMap()
                        params.putString("url", url)
                        urlClickCallback!!.invoke(params)
                    }
            })
        }

        if (customVariableList.size > 0) {
            for (item in customVariableList) {
                config?.putCustomField(item.key,item.value,item.scope)
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
        // do nothing
    }

    override fun onHostPause() {
        // do nothing
    }

    override fun onHostDestroy() {
        // do nothing
    }
}
