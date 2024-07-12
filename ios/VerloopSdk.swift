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
        return ["veloop_url_clicked"]
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
        self.config = VLConfig.init(clientId:clientId)
        self.config?.setUserId(userId:userId)
    }
    
    @objc(createAnonymousUserConfig:)
    func createAnonymousUserConfig(clientId:String) -> Void {
        self.config = VLConfig.init(clientId:clientId)
    }
    
    @objc(setButtonClickListener:)
    func setButtonClickListener(_ callback: @escaping RCTResponseSenderBlock) -> Void   {
        if self.config != nil {
        self.config?.setButtonOnClickListener {[weak self] title, type, payload in
            let values : [String] = [title ?? "", type ?? "", payload ?? ""]
            callback([NSNull() ,values])
        }
        }else{
            debugPrint("error -> config not initialised before setButtonClickListener method is called")
        }
    }

    @objc(setUrlClickListener:)
    func setUrlClickListener(_ callback: @escaping RCTResponseSenderBlock) -> Void   {
        if self.config != nil {
        self.config?.setUrlClickListener {[weak self] url in
            let values : [String] = [url ?? ""]
             callback([NSNull() ,values])
        }
        }else {
            else{
            debugPrint("error -> config not initialised before setUrlClickListener method is called")
        }
        }
    }

    
    @objc(putCustomFieldWithScope:value:scope:)
    func putCustomFieldWithScope(key:String , value:String ,scope:String) -> Void {
        if self.config != nil {
            if scope == "ROOM" {
                self.config?.putCustomField(key: key, value: value, scope: .ROOM)
            }else if scope == "USER" {
                self.config?.putCustomField(key: key, value: value, scope: .USER)
            }else{
                self.config?.putCustomField(key: key, value: value, scope: .USER)
            }
        }else{
            debugPrint("error -> config not initialised before putCustomFieldWithScope method is called")
        }
    }
    
    @objc(setRecipeId:)
    func setRecipeId(recipeId:String) -> Void {
        if self.config != nil {
           self.config?.setRecipeId(recipeId: recipeId)
        }else{
            debugPrint("error -> config not initialised before setRecipeId method is called")
        }
    }
    
    @objc(setUserEmail:)
    func setUserEmail(userEmail:String) -> Void {
        if self.config != nil {
            self.config?.setUserEmail(userEmail: userEmail)
        }else{
            debugPrint("error -> config not initialised before setUserEmail method is called")
        }
    }
    
    @objc(setUserPhone:)
    func setUserPhone(userPhone:String) -> Void {
        if self.config != nil {
            self.config?.setUserPhone(userPhone: userPhone)
        }else{
            debugPrint("error -> config not initialised before setUserPhone method is called")
        }
    }
    
    @objc(setUserName:)
    func setUserName(userName:String) -> Void {
        if config != nil {
            self.config?.setUserName(userName: userName)
        }else{
            debugPrint("error -> config not initialised before setUserName method is called")
        }
    }
    
    @objc
    func showChat() {
        if config != nil {
            DispatchQueue.main.async {
                self.config?.setUrlRedirectionFlag(canRedirect :false)
                self.verloop = VerloopSDK(config: self.config!)
               // self.verloop?.observeLiveChatEventsOn(vlEventDelegate : self)
                let cntrl = self.verloop!.getNavController()
                self.topViewController()?.present(cntrl, animated: false)
            }
        }else{
            debugPrint("error -> config not initialised before showChat method is called")
        }
    }

    @objc
    func clearChat() {
        if self.config != nil {
            DispatchQueue.main.async {
                self.verloop?.clearConfig()
            }
        }else{
            debugPrint("error -> config not initialised before clearChat method is called")
        }
    }
    
    @objc
    func logOut() {
        if self.config != nil {
            DispatchQueue.main.async {
                self.verloop?.logout()
            }
        }else{
            debugPrint("error -> config not initialised before logOut method is called")
        }
    }

    @objc
    func openWidget() {
        showChat() 
    }

    @objc
    func closeWidget() {
        if self.config != nil {
            self.config?.setButtonOnClickListener { title, type, payload in
                DispatchQueue.main.async {
                    self.verloop?.closeWidget()
                }
            }
        }else{
            debugPrint("error -> config not initialised before closeWidget method is called")
        }
    }

    @objc(enableiOSNotification:)
    func enableiOSNotification(notificatioDeviceToken:String) {
        if self.config != nil {
            self.config?.setNotificationToken(notificationToken: notificatioDeviceToken)
        }else{
            debugPrint("error -> config not initialised before enableiOSNotification method is called")
        }
    }
    
    @objc
    func login() {
        if self.config != nil {
            DispatchQueue.main.async {
                    self.verloop?.closeWidget()
            }
        }else{
            debugPrint("error -> config not initialised before login method is called")
        }
    }

    @objc(logingWithUserId:)
    func logingWithUserId(userId:String) {
        if self.config != nil {
            DispatchQueue.main.async {
                    self.verloop?.login(userId:userId)
            }
        }else{
            debugPrint("error -> config not initialised before logingWithUserId method is called")
        }
    }

    @objc(setUrlRedirectionFlag:)
    func setUrlRedirectionFlag(canRedirect:Bool){
         if self.config != nil {
            DispatchQueue.main.async {
                    self.verloop?.login(userId:userId)
            }
        }else{
            debugPrint("error -> config not initialised before setUrlRedirectionFlag method is called")
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
        self.topViewController()?.present(alertController, animated: true, completion: nil)
}
    
    @objc public override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
