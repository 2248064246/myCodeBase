const path = require("path");

module.exports = {
  mode: "development",
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    filename: "bundle.js",
  },
  // 配置webpack-dev-server
  devServer: {
    // 静态根目录
    contentBase: path.join(__dirname, "www"),
    // 不压缩
    compress: false,
    // 端口号
    port: 8080,
    // 虚拟打包的路径，bundle.js文件没有真正生成
    publicPath: "/xuni/",
  },
};