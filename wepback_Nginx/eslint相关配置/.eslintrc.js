
let env = process.env.NODE_ENV;

module.exports = {
  // 默认情况下,ESLint会在所有父级组件中寻找配置文件,一直到根目录
  // ESLint一旦发现配置文件中有 'root': true,它就会停止在父级目录中寻找
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // 环境定义了预定义的全局变量
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/strongly-recommended'],
  rules: {
    'arrow-parens': 0, // allow paren-less arrow functions
    'generator-star-spacing': 0, // allow async-await
    'no-debugger': env === 'production' ? 2 : 0, //允许开发中使用debugger
    'no-console': env === 'production' ? 2 : 0, //允许开发中使用console
    'no-unused-vars': [
      2,
      {
        vars: 'local', // 允许声明未使用变量
        args: 'none' // 参数不检查
      }
    ],
    'no-alert': 2,
    semi: 0, // 关闭语句强制分号结尾
    // 空行最多不能超过100行
    'no-multiple-empty-lines': [
      0,
      {
        max: 100
      }
    ],
    'no-prototype-builtins': 0, //关闭禁止使用hasOwnProperty方法
    'no-mixed-spaces-and-tabs': 0, // 关闭禁止混用tab和空格
    'operator-linebreak': [2, 'after'],
    'quotes': ["error", "single"],
    'vue/html-indent': 0, // 暂时关闭html标签缩进
    // <Col>关闭自定义标签报错
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/html-self-closing': 0, // 关闭自闭合标签
    'vue/mustache-interpolation-spacing': 0, // 关闭插值表达式的前后空格
    'vue/html-closing-bracket-newline': 0,
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    "vue/multiline-html-element-content-newline": 0,
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/html-closing-bracket-spacing': 0,
    'vue/max-attributes-per-line': 0,
    // 模板中的组件名为kebab-case
    'vue/component-name-in-template-casing': [
      1,
      'kebab-case',
      {
        'registeredComponentsOnly': false
      }
    ]
  },
  globals: {
    baseUrl: true
  }
};
