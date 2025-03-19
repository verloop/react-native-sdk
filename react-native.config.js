module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: "./android",
        packageImportPath: "import com.reactlibrary.VerloopSdkPackage;",
        packageInstance: "new VerloopSdkPackage()",
      },
    },
  },
};
