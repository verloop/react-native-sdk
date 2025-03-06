package com.reactlibrary.VerloopSdkPackage

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNVerloopSdkPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(RNVerloopSdkModule(reactContext))
    }

    // Deprecated from RN 0.47, this method can be omitted in Kotlin
    // fun createJSModules(): List<Class<out JavaScriptModule>> {
    //     return emptyList()
    // }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
