
# Intl API 国际化API
> 提供了精确的字符串对比, 数字格式化, 和日期格式化

[MDN Intl API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)

[BCP 47 语言标记](https://tools.ietf.org/html/rfc5646)

## 字符串比较

###  Intl.Collator([locales[, options]])

> 字符串比较
```javaScript
 new Intl.Collator('zh').compare(a, b) // 使用中文顺序来比较 a 和 b
 // 类似 String.prototype.localeCompare(a, b), 结果是一样的
```

## 日期格式化

### Intl.DateTimeFormat([locales[, options]])
> 根据语言来格式化日期和时间的对象的构造器

+ options 参数
  + hour12: 是否使用12小时制
  + weekday: 工作日(星期)的展现方式, `narrow`, `short`, `long`
    + `narrow`: 二, 三这种
    + `short`: 周几
    + `long`: 星期几
  + ear: 纪元的展现方式(没什么用, 这个属性), `narrow`, `short`, `long`
  + year: 年的展现方式 `numeric`, `2-digit`
  + month: 月的展现方式 `numeric`, `2-digit`, `narrow`, `short`, `long`
  + day: 同年
  + hour: 同年
  + minute: 同年
  + second: 同年
  + timeZoneName: 时区名称展现方式, `short`, `long`

```javaScript

  new Intl.DateTimeFormat('zh', {
    year: 'numeric', ear: 'long',
    month: 'long',
    weekday: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date()) // => "2021年4月27日周二14:50:09"


  new Intl.DateTimeFormat('zh-u-ca-chinese', {
    year: '2-digit', ear: 'long',
    month: 'short',
    weekday: 'short', // 必须要写 weekday, 不然辛丑年不会出现
    day: '2-digit',
    hour12: false
  }).format(new Date()) // => "2021辛丑年三月16周二"

  new Intl.DateTimeFormat('zh', {
    year: 'numeric', ear: 'long', 
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date()) // => "2021/04/27 15:29:30"

```

> 说实话, 这个东西不够标准, 不同浏览器可能有问题, 移动端和web端也可能有问题, 兼容性还有很大问题

> 更加推荐使用 moment 或者 dayjs 来处理日期

## 数字格式化

### NumberFormat

> 了解了解就好, 这个API的想法是好的, 现阶段根本用不起来