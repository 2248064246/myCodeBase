module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "build",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "www",
    port: 8080,
  },
};
