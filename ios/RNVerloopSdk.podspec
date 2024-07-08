
Pod::Spec.new do |s|
  s.name         = "RNVerloopSdk"
  s.version      = "1.0.0"
  s.summary      = "RNVerloopSdk"
  s.description  = <<-DESC
                  This is a wrapper over the verloop iOS SDk.
                  This SDK is used for showing chat widget in the react native mobile apps
                   DESC
  s.homepage     = "https://verloop.io"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "raghav@verloop.io" }
  s.platform     = :ios, "13.0"
  s.source       = { :git => "https://github.com/verloop/react-native-sdk.git", :tag => "master" }
  s.source_files  = "RNVerloopSdk/**/*.{h,m}"
  s.requires_arc = true
  s.vendored_frameworks = "VerloopSDK.framework"


  s.dependency "React"
  #s.dependency "others"

end

