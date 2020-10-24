module.exports = {
  outputDir: "dist", //默认，可写可不写
  assetsDir: "./",
  publicPath: "./",
  devServer: {
    port: 3333,
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/_variable.scss";'
      }
    }
  }
};
