/*
 * @Author: huangyingli
 * @Date: 2022-02-19 16:07:22
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-19 16:08:27
 * @Description:
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    // 这个用于处理 class 的装饰器 @log (实际上这个JS功能还处于实验室阶段)
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true, // 这里使用这个模式, 下面 必须使用 loose: true
        // https://babel.docschina.org/docs/en/next/babel-plugin-proposal-decorators/
      },
    ],
    // 这个用于处理class语法
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true, // 宽松模式
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import', // 动态语法导入插件
  ],
};
