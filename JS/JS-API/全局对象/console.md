- console.log() 输出基本信息
  - 支持的占位符有：字符（%s）、整数（%d 或%i）、浮点数（%f）和对象（%o）
  - console.log("%d 年%d 月%d 日", 2019, 12, 05);
- console.dir() 输出一个对象的详细键值对信息
- console.table() 把一个多维 JSON 数组在控制台按照表格形式呈现出来
- 其他的 console 函数
  - console.group()/console.groupEnd()
    - 在控制台显示信息分组
  - console.time()/console.timeEnd()
    - 可以得到代码执行的时间
  - console.dirxml(node)
    - 显示某个节点包含的 html 代码
  - console.assert(value, message)
    - 判断 value 是否为真，并抛出 message
  - console.profiler()/console.profilerEnd()
    - 性能分析(现在好像没什么太大作用)
  - console.warn() 抛出警告
  - console.error() 抛出错误
  - console.info() 抛出一般信息
  - console.debug() 出错信息

## 补充

alert/confirm/prompt

> 控制台弹窗，输出的都是 字符串, 先通过 toString()
> 会阻断代码执行

- alert(); (消息)
- confirm();(确认) // 确定和取消：选择型弹窗
- prompt();(提示) 在 confirm 基础上多了一个输入框
