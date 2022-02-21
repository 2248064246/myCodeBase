/*
 * @Author: huangyingli
 * @Date: 2022-02-19 16:07:22
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-21 14:10:14
 * @Description:
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        /* 兼容目标, 详见 https://babeljs.io/docs/en/options#targets */
        targets: "> 0.25%, not dead"
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import', // 动态语法导入插件
  ],
};
