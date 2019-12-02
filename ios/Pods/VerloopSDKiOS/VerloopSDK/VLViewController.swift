//
//  VLController.swift
//  Verloop
//
//  Created by Shobhit Bakliwal on 20/11/18.
//  Copyright © 2018 Verloop. All rights reserved.
//

import UIKit
import WebKit

class VLViewController: UIViewController, WKUIDelegate {
    private var verloopSDK: VerloopSDK? = nil

    init() {
        super.init(nibName: nil, bundle: nil)
    }

    init(webView: VLWebViewManager) {
        super.init(nibName: nil, bundle: nil)
        setWebView(webView: webView)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    var webView: VLWebViewManager?

    func setWebView(webView v: VLWebViewManager) {
        webView = v
        view.addSubview(webView!.webView)
        webView!.webView.frame = view.bounds

        if isViewLoaded {
            webView!.startRoom()
        }
    }

    func setSDK(verloopSDK sdk: VerloopSDK) {
        verloopSDK = sdk
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        if webView != nil {
            webView!.startRoom()
        }

        self.navigationItem.leftBarButtonItem = UIBarButtonItem(title: "×", style: .done, target: self, action: #selector(back(_:)))

    }

    @objc func back(_ sender : AnyObject?) {
        if verloopSDK != nil {
            verloopSDK!.onChatClose()
        }
        self.dismiss(animated: true, completion: nil)
    }
}
