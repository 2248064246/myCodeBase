/*
 * @Author: huangyingli
 * @Date: 2022-02-19 16:04:48
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-19 16:04:48
 * @Description:
 */
const isDev = process.env.NODE_ENV === 'production';
module.exports = {
  plugins: [
    // 兼容浏览器，添加前缀
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions', // 所有主流浏览器最近2个版本
        '>1%', // 兼容市场大于 1% 份额的浏览器
      ],
    }),
  ],
  sourceMap: isDev,
};
