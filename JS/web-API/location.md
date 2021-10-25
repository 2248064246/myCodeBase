# window.location

> 显示当前页面的导航信息, 包括 `协议` `主机` `端口` 等等

## 刷新页面功能 `location.reload`

reload(Boolean) 为 `true` 强制刷新不是用缓存

## 页面替换

+ `assign`
+ `replace`


## 锚点定位

> url的 hash 就是用来锚点定位的

一般DOM通过设置 id 或者 name 属性 来定义锚点

可以通过 a 标签中的 href 指定 id 锚点就可以

```html
<a href="#xxx">xxx 就是id或者name值</a>
```

javaScript 实现锚点定位
```javascript
function showNode (oNode) {
  var nLeft = 0, nTop = 0;
  for (var oItNode = oNode; oItNode; nLeft += oItNode.offsetLeft, nTop += oItNode.offsetTop, oItNode = oItNode.offsetParent);   window.scrollTo(nLeft, nTop); }

function showBookmark (sBookmark, bUseHash) {
  if (arguments.length === 1 || bUseHash) { window.location.hash = sBookmark; return; }
  var oBookmark = document.querySelector(sBookmark);
  if (oBookmark) { showNode(oBookmark); }
}
```

带有动画的

```javascript
var showBookmark = (function () {
  var  _useHash, _scrollX, _scrollY, _nodeX, _nodeY, _itFrame, _scrollId = -1, _bookMark,
       /*
       * nDuration: the duration in milliseconds of each frame
       * nFrames: number of frames for each scroll
       */
       nDuration = 200, nFrames = 10;

  function _next () {
    if (_itFrame > nFrames) { clearInterval(_scrollId); _scrollId = -1; return; }
    _isBot = true;
    document.documentElement.scrollTop = Math.round(_scrollY + (_nodeY - _scrollY) * _itFrame / nFrames);
    document.documentElement.scrollLeft = Math.round(_scrollX + (_nodeX - _scrollX) * _itFrame / nFrames);
    if (_useHash && _itFrame === nFrames) { location.hash = _bookMark; }
    _itFrame++;
  }

  function _chkOwner () {
    if (_isBot) { _isBot = false; return; }
    if (_scrollId > -1) { clearInterval(_scrollId); _scrollId = -1; }
  }

  if (window.addEventListener) { window.addEventListener("scroll", _chkOwner, false); }
  else if (window.attachEvent) { window.attachEvent("onscroll", _chkOwner); }

  return function (sBookmark, bUseHash) {
    _scrollY = document.documentElement.scrollTop;
    _scrollX = document.documentElement.scrollLeft;
    _bookMark = sBookmark;
    _useHash = arguments.length === 1 || bUseHash;
    for (
      var nLeft = 0, nTop = 0, oNode = document.querySelector(sBookmark);
      oNode;
      nLeft += oNode.offsetLeft, nTop += oNode.offsetTop, oNode = oNode.offsetParent
    );
    _nodeX = nLeft, _nodeY = nTop, _itFrame = 1;
    if (_scrollId === -1) { _scrollId = setInterval(_next, Math.round(nDuration / nFrames)); }
  };
})();
```


