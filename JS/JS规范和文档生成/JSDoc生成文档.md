# JSDoc 生成文档

```
npm i -g jsdoc
```

## 生成单个文件

直接在对应文件目录下执行
`jsdoc .\xxx.js` 就 ok

## 生成整个项目文档

1. 首先需要穿件一个 json 文件, 用来设置配置项
2. 然后执行`jsdoc -c xxx.json`

```json
{
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "include": ["./"],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "plugins": [],
  "opts": {
    "encoding": "utf8",
    "recurse": true
  },
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    }
  }
}
```

更多详细配置参见 [中文文档](https://www.shouce.ren/api/view/a/13235), 以及 [官方文档](https://jsdoc.app/)

此外它还可以配置其他模板, 来替换官方给定的模板, 这里推荐几个
1. [Minami](https://github.com/Nijikokun/minami) 这个还不错
2. [DocStrap](https://github.com/docstrap/docstrap) 这个给出了一个模板和多个主题
3. [Docdash](https://github.com/clenemt/docdash) 这个very nice
4. [TUI JSDoc Template](https://github.com/nhn/tui.jsdoc-template) 这个一般般
5. [better-docs](https://github.com/SoftwareBrothers/better-docs) 这个也不错
