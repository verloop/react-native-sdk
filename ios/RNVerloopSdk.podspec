
Pod::Spec.new do |s|
  s.name         = "RNVerloopSdk"
  s.version      = "1.0.71"
  s.summary      = "RNVerloopSdk"
  s.description  = <<-DESC
                  This is a wrapper over the verloop iOS SDk.
                  This SDK is used for showing chat widget in the react native mobile apps
                   DESC
  s.homepage     = "https://verloop.io"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author       = { "author" => "tarun@verloop.io" }
  s.platform     = :ios, "11.0"
  s.source       = { :git => "https://github.com/verloop/react-native-sdk.git", :tag => "#{s.version}" }
  s.source_files  = "RNVerloopSdk/**/*.{h,m,swift}"
  s.requires_arc = true
  s.dependency "React"
  s.dependency "VerloopSDKiOS"
  #s.dependency "others"

end

