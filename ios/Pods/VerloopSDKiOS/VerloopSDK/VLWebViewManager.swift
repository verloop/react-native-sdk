//
//  VerloopWebViewManager.swift
//  Verloop
//
//  Created by Shobhit Bakliwal on 24/11/18.
//  Copyright © 2018 Verloop. All rights reserved.
//

import Foundation
import WebKit

class VLWebViewManager: NSObject, WKScriptMessageHandler, WKUIDelegate {
    var webView: WKWebView
    private var hasTriedToStartRoom = false
    private var jsInterface: VLJSInterface? = nil
    
    init(config: VLConfig) {
        let urlComponents = NSURLComponents()
        urlComponents.scheme = "https";
        
        if config.isStaging {
            urlComponents.host =  config.clientId + ".stage.verloop.io";
        } else {
            urlComponents.host =  config.clientId + ".verloop.io";
        }
        
        urlComponents.path = "/livechat";
        
        urlComponents.queryItems = [
            URLQueryItem(name: "mode", value: "sdk"),
            URLQueryItem(name: "sdk", value: "ios"),
            URLQueryItem(name: "user_id", value: config.userId)
        ]
        
        if config.notificationToken != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "device_token", value: config.notificationToken!))
            urlComponents.queryItems?.append(URLQueryItem(name: "device_type", value: "ios"))
        }
        
        if config.getCustomFieldsJSON() != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "custom_fields", value: config.getCustomFieldsJSON()!))
        }
        
        if config.userName != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "name", value: config.userName!))
        }
        
        if config.userEmail != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "email", value: config.userEmail!))
        }
        
        if config.userPhone != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "phone", value: config.userPhone!))
        }
        
        if config.recipeId != nil {
            urlComponents.queryItems?.append(URLQueryItem(name: "recipe_id", value: config.recipeId!))
        }
        
        print("Starting chat. " + urlComponents.string!)
        
        let url = URL(string: urlComponents.string!)
        let request = URLRequest(url: url!)
        
        webView =  WKWebView()
        super.init()
        
        
        webView.uiDelegate = self
        webView.load(request)
        webView.configuration.userContentController.add(self, name: "VerloopMobile")
        webView.isOpaque = true
    }
    
    func jsDelegate(delegate: VLJSInterface) {
        jsInterface = delegate
    }
    
    func startRoom() {
        hasTriedToStartRoom = true
        webView.evaluateJavaScript("VerloopLivechat.start();")
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if (message.name == "VerloopMobile") {
            if jsInterface != nil {
                jsInterface?.jsCallback(message: message.body)
            }
        }
        
        if (hasTriedToStartRoom) {
            startRoom()
        }
    }
    
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        guard let url = navigationAction.request.url else {
            return nil
        }
        
        if #available(iOS 10.0, *) {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        } else {
            UIApplication.shared.openURL(url)
        }
        return nil
    }
}
