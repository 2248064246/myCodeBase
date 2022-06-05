module.exports = {
  // webpack5 不用配置mode
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 虚拟打包路径，文件夹不会真正生成，而是在8080端口虚拟生成
    publicPath: "xuni",
    // 打包出来的文件名
    filename: "bundle.js",
  },
  // 配置webpack-dev-server
  devServer: {
    // 静态根目录
    contentBase: 'www',
    // 端口号
    port: 8080,
  },
};
