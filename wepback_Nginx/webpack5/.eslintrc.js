/*
 * @Author: huangyingli
 * @Date: 2022-02-19 16:15:39
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 10:59:01
 * @Description:
 */

/**
 * 参考文档
 * 【eslint英文文档】https://eslint.org/docs/user-guide/configuring
 * 【eslint中文文档】http://eslint.cn/docs/rules/
 */

/**
 * eslint有三种使用方式
 * 【1】js代码中通过注释的方式使用
 * 【2】通过webpack的eslintConfig字段设置，eslint会自动搜索项目的package.json文件中的配置
 * 【3】通过配置文件的方式使用，配置文件有多种文件方式，如JavaScript、JSON 或者 YAML等
 */

/**
 * 文件忽略
 * 【】让eslint跳过特定文件的检测
 * 【】通过当前工作目录下 「.eslintignore」 文件进行设置
 *  其使用的是Glob路径书写方式，与「.gitignore」的使用方法相同
 * 【】也可以在 package.json 文件中，通过 eslintIgnore 参数进行设置
 */

module.exports = {
  /* 标识当前配置文件为最底层的文件，无需往更上一级的文件目录中进行搜索 */
  root: true,
  /* 解析器 */
  parser: '@babel/eslint-parser',
  /* 解析器配置 */
  parserOptions: {
    /* 支持es10语法 */
    ecmaVersion: 10,
    /* 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script。 */
    sourceType: 'module',
    // 使用的额外的语言特性
    ecmaFeatures: {
      jsx: true, // 启用 JSX
      globalReturn: true, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    },
  },

  /**
   * vue eslint 配置: https://eslint.vuejs.org/rules/
   * 
   */
  extends: ['eslint:recommended', 'plugin:vue/strongly-recommended'],
  /**
   * 规则数值说明
   * "off" or 0 - 关闭规则
   * "warn" or 1 - 将规则视为一个警告（不会影响退出码）
   * "error" or 2 - 将规则视为一个错误 (退出码为1)
   */
  rules: {
    'no-undef': 0,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
};
