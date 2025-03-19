module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: "./android",
        packageImportPath: "import com.awesomeverloop.VerloopPackage;",
        packageInstance: "new VerloopPackage()",
      },
    },
  },
};
