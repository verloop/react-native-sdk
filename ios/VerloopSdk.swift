import Foundation
import VerloopSDKiOS
// class VerloopSdk: NSObject {

//   @objc(multiply:withB:withResolver:withRejecter:)
//   func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//     resolve(a*b)
//   }
// }
@objc(RNVerloopSdk)
public class RNVerloopSdk : RCTEventEmitter {
    
    private var config:VLConfig?
    private var verloop:VerloopSDK?
    
    
    var hasObservers:Bool?
    override public func supportedEvents() -> [String]! {
        return ["veloop_button_clicked","veloop_url_clicked"]
    }
    
    public override init() {
        super.init()
    }
    
    public override func startObserving() {
        self.hasObservers = true
        super.startObserving()
    }
    
    public override func stopObserving() {
        self.hasObservers = false
        super.stopObserving()
    }
    
    @objc(createUserConfig:userId:)
    func createUserConfig(_ clientId: String, userId: String) -> Void {
        config = VLConfig.init(clientId:clientId)
        config?.setUserId(userId:userId)
    }
    
    @objc(createAnonymousUserConfig:)
    func createAnonymousUserConfig(clientId:String) -> Void {
       // print("clientId -> \(clientId)")
        debugPrint("clientId -> \(clientId)")
        config = VLConfig.init(clientId:clientId)
        config?.setButtonOnClickListener { title, type, payload in
            let values : [String] = [title ?? "", type ?? "", payload ?? ""]
            DispatchQueue.main.async {
                if self.hasObservers ?? false {
                    self.sendEvent(withName: "veloop_button_clicked", body: values)
                }
            }
        }
        
        config?.setUrlRedirectionFlag(canRedirect: false)
        config?.setUrlClickListener {[weak self] url in
            let values : [String] = [url ?? ""]
            print("URL click listener called")
            DispatchQueue.main.async {
                if self?.hasObservers ?? false {
                    self?.sendEvent(withName: "veloop_url_clicked", body: values)
                }
            }
        }
    }
    

    @objc(putCustomFieldWithScope:value:scope:)
    func putCustomFieldWithScope(key:String , value:String ,scope:String) -> Void {
        if config != nil {
            if scope == "ROOM" {
                config?.putCustomField(key: key, value: value, scope: .ROOM)
            }else if scope == "USER" {
                config?.putCustomField(key: key, value: value, scope: .USER)
            }else{
                config?.putCustomField(key: key, value: value, scope: .USER)
            }
        }
    }
    
    @objc(setRecipeId:)
    func setRecipeId(recipeId:String) -> Void {
        if config != nil {
            config?.setRecipeId(recipeId: recipeId)
        }
    }
    
    @objc(setUserEmail:)
    func setUserEmail(userEmail:String) -> Void {
        if config != nil {
            config?.setUserEmail(userEmail: userEmail)
        }
    }
    
    @objc(setUserPhone:)
    func setUserPhone(userPhone:String) -> Void {
        if config != nil {
            config?.setUserPhone(userPhone: userPhone)
        }
    }
    
    @objc(setUserName:)
    func setUserName(userName:String) -> Void {
        if config != nil {
            config?.setUserName(userName: userName)
        }
    }
    
    @objc
    func showChat() {
        if config != nil {
            DispatchQueue.main.async {
                self.config.setUrlRedirectionFlag(canRedirect :false)
                self.verloop = VerloopSDK(config: self.config!)
                self.verloop.observeLiveChatEventsOn(vlEventDelegate : self)
                let cntrl = self.verloop!.getNavController()
                self.topViewController()?.present(cntrl, animated: false)
            }
        }
    }

    @objc
    func clearChat() {
        if config != nil {
            DispatchQueue.main.async {
                self.verloop?.clearConfig()
            }
        }
    }
    
    @objc
    func logOut() {
        if self.config != nil {
            DispatchQueue.main.async {
                self.verloop?.logOut()
            }
        }
    }

    @objc
    func openWidget() {
        showChat() 
    }

    @objc
    func closeWidget() {
        if self.config != nil {
            config.setButtonOnClickListener { title, type, payload in
                DispatchQueue.main.async {
                    self.verloop?.closeWidget()
                }
            }
        }
    }

    @objc
    @objc(enableiOSNotification:)
    func enableiOSNotification(notificatioDeviceToken:String) {
        if self.config != nil {
            config.setNotificationToken(notificationToken: token)
            showChat()
        }
    }
    
    @objc(setUserId:)
    func setUserId(userId:String) {
        if self.config != nil {
            config.setUserId(userId: userId)
            showChat()
        }
    }

    func topViewController() -> UIViewController? {
        
        let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
        if var topController = keyWindow?.rootViewController {
            while let presentedViewController = topController.presentedViewController {
                topController = presentedViewController
            }
            return topController
        } else {
            return nil
        }
    }

    func showErrorMessage(_ message: String) {
    let alertController = UIAlertController(title: "Error", message: message, preferredStyle: UIAlertController.Style.alert)
    alertController.addAction(UIAlertAction(title: "Close", style: UIAlertAction.Style.cancel, handler: { _ in
        
    }))
    self.topViewController()??.present(alertController, animated: true, completion: nil)
}
    
    @objc public override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}