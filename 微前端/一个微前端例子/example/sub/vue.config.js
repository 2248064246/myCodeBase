/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 16:22:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:38:13
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
      library: `vue`, // 这里需要配置和注册时一样的名字,我们就能通过 window.vue 访问到应用的 JS 入口文件 export 出来的内容了
      libraryTarget: 'umd',
    },
  },
};
