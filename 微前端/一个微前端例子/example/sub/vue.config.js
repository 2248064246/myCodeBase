/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 16:22:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 17:05:14
 * @Description:
 */
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  publicPath: `//localhost:${8080}`,
  configureWebpack: {
    output: {
      library: `vue`,
      libraryTarget: 'umd',
    },
  },
};
