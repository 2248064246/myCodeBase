# Unicode 字符集

Unicode 的编码的空间从 `U+0000` 到 `U+10FFFF` 共 `17 * 65536 = 1112064` 个码位(code point)来映射字符.

Unicode 编码划分为 `17`个平面, 每个平面`65536(2^16)`个字符.

第一个平面从 `U+0000` 到 `U+FFFF`, 包含最常用的字符, 被称为[基本多语言平面(BMP)](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84#%E5%9F%BA%E6%9C%AC%E5%A4%9A%E6%96%87%E7%A7%8D%E5%B9%B3%E9%9D%A2)

## 编码形式

### UTF-8

这是目前大部分软件使用的编码形式.

### UTF-16

这是 Unicode 最早使用的编码方式

也是`java` `javaScript`等编程语言使用的编码方式

其中从`U+D800` 到 `U+DFFF` 之间的区段是永久保留不映射到 Unicode 字符的, 用来对辅助平面的字符进行编码.

对于`第一平面`的 Unicode 字符, 使用 UTF-16 编码一个`2字节`码点对应一个字符.

但是字符不是第一平面的, 在 UTF-16 会被编码为`一对码点`(即 4 个字节), 称作`代理对`. 具体方法是:

1. 码位减去 `0x10000`, 得到一个长`20位`, 范围在`0x0 ~ 0xFFFFF`的值.
2. 高位的`10个比特`(值范围 0 ~ 0x3FF)被加到`0xD800`上, 得到第一个码元, 称作高位代理(也叫前导代理)
3. 后面的`10个比特`(值范围 0 ~ 0x3FF)被加到`0xDC00`上, 得到第二个码元, 称作低位代理(也叫后尾代理)

高位代理范围 `0xD800 ~ 0xDBFF`

低位代理范围 `0xDC00 ~ 0xDFFF`

参考资料[wiki UTF-16](https://zh.wikipedia.org/wiki/UTF-16)

#### 关于在 JS 中得到准确的 Unicode 字符长度

字符串存储的是字符的码点, 而不是字符本身.

对于非 BMP 的字符, UTF-16 编码情况下, 需要 4 个字节去存储.

所以在 js 中, 通过`length`获取 emoji 长度会不准确.

通过 UTF-16 编码原理, 可以通过`charCodeAt`获取字符`code`, 然后判断是否在代理对范围内. 来实现计算准确字符长度.

MDN 文档中有对这个的处理[MDN charCodeAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

实际上, 后来 JS 的 `for...of`, `Array.from` 都通过上述方法对`非BMP`字符做了处理.

**但是, 上面算法过于简化, 对于字形簇, 表情符号序列等符号会有问题**

[Unicode 标准附录 #29](http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries) 关于 Unicode 文本分割描述了一种用于确定字素簇边界的算法。

要准确获取字符串长度, 还需要实现这个算法

### UTF-32
