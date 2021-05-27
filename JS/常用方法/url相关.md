

# 获取查询字符串

## 获取单个查询字符串

```JavaScript
/**
 * 获取单个查询查询字符串数据
 * @description
 * @author 洛水赋神
 * @param {String} urlSearch 要查询的url查询参数
 * @param {String} name 要查询的key
 * @returns {String}  返回对应的数据
 */
function getUrlParam(urlSearch, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = urlSearch.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  // 按照 W3C 规范, 使用 decodeURI() 来解码url, 而不是使用 unescape()
  // unescape 解码在url中存在中文时, 需要先将中文编码, 否则会乱码; decodeURI 不存在这个问题
  return null;
}

// 获取 window.location.search 键值(key value)
function loadPageVar (sVar) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

```

## 判断是否是 `url`
```JavaScript
/**
 * 判断是否是URL
 * @param {String} url URL地址
 * @returns {Boolean} false OR true
 */
function isUrl(url) {
  var isUrl = false
  if (typeof url !== 'string') return isUrl
  isUrl = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(url)
  return isUrl
}


```



## 解析URL
> URL组成: `protocol://host:port/path?search#hash`

```JavaScript
/**
 * 
 * @param {String} url 要解析的URL 
 * @param {Boolean} parseSearch 是否解析查询字符串
 * @returns {Object} - protocol: 协议
 *                   - host: 主机
 *                   - port: 端口
 *                   - path: 路径
 *                   - search: 查询字符串
 *                   - hash: 哈希
 *                   - searchObject: 解析后的查询字符串
 */
function parseUrl(url, parseSearch = true) {
  url = decodeURI(url) // 解析url使用decodeURI
  var urlReg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  var parsedURL = urlReg.exec(url);
  if (!parsedURL) {
    return false;
  }

  var [url, protocol, , host, port, path, search, hash] = parsedURL;
  search = decodeURIComponent(search) // 解析查询字符串用 decodeURIComponent
  var searchObject = {}
  search && parseSearch ? url.replace(/([^?=&#]+)=([^?=&#)]+)/g, (n, x, y) => searchObject[x] = y) : null

  return {
    protocol,
    host,
    port,
    path,
    search,
    hash,
    searchObject,
  };
}
```

> 使用 JS URL API (详细见 加密/前端涉及文件操作API)


## 将对象转为 URL 查询参数

> 自己写的简易版本

```javaScript
function obj2search(obj, decode) {
  if (typeof obj !== 'object') return ''
  let searchAry = []
  for (const key in obj) {
    let value = obj[key]
    value = (typeof value === 'object' ? JSON.stringify(value) : value)
    let searchItem = (key + '=') + (decode ? encodeURIComponent(value) : value)
    searchAry.push(searchItem)
  }
  return searchAry.join('&')
}

function search2ojb(search, obj) {
  search = decodeURIComponent(search)
  var searchObject = {}
  search.replace(/([^?=&#]+)=([^?=&#)]+)/g, (n, x, y) => searchObject[x] = y)
  return searchObject
}
```

> 推荐使用标准JS库 =>  qs 或者 urijs




