

# Node 

Node 是一个接口，各种类型的 DOM API 对象会从这个接口继承


## 属性

+ `baseURI` 
  + 返回当前 节点 所在文档的 URI(注意会受)
+ `childNodes` 
  + 返回一个包含该节点所有字节点的实时 `NodeList`. 
  + `NodeList` 是动态变化的, 会自动更新
+ `firstChild` 
  + 返回该节点的第一个子节点, 没有返回 null
+ `isConnected` 
  + 返回一个Boolean, 用来检测此节点是否连接(直接或者间接)到一个上下文对象上.
+ `lastChild` 
+ `nextSibling`
  + 返回与该节点同级的下一个节点
+ `nodeName`
  + 如果此节点使元素节点, 则返回大写的元素名字
  + [其他类型返回](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName)
+ `nodeType`
  + 返回一个与该节点对应的数值
  + type
    + 1: ELEMENT_NODE 元素节点
    + 3: TEXT_NODE 文本节点
    + 8: COMMENT_NODE 注释节点
    + 9: DOCUMENT_NODE 文档节点 (document)
    + 11: DOCUMENT_FRAGMENT_NODE 文档碎片节点
+ `nodeValue`
  + 返回或设置当前节点的值
  + 对于 注释, 文本节点返回其注释或文本内容, 对于元素, 文档节点返回null
+ `ownerDocument`
  + 返回单前节点所属的 `Document` 对象(不是当前节点的父级, 而是当前节点的文档)
+ `parentNode`
+ `parentElement`
  + 理论上在绝大部分情况下和`parentNode`返回的一样的
+ `previousSibling`
  + 返回与该节点同级的上一个节点
+ `textContent`
  + 返回或设置一个元素内所有子节点及后代的文本内容

## 方法

+ `appendChild(otherNode)`
  + 将指定参数作为最后一个子节点添加到当前节点
  + 如果参数引用了DOM树上现有的节点, 则节点将从当前位置分离, 并附加到新位置
+ `cloneNode(deep)`
  + deep: Boolean, 默认情况下是 false
  + 克隆当前节点, 可以选择是否克隆这个节点下的所有内容
+ `compareDocumentPosition(otherNode)`
  + 比较当前节点与任意文档中的另一个节点的位置关系
  + 返回一个数值:
    + 1: 不在同一文档中; DOCUMENT_POSITION_DISCONNECTED
    + 2: otherNode 在 当前Node 之前; DOCUMENT_POSITION_PRECEDING
    + 4: otherNode 在 当前Node 之后; DOCUMENT_POSITION_FOLLOWING
    + 8: otherNode 包含 Node; DOCUMENT_POSITION_CONTAINS
    + 16: otherNode 被 Node 包含; DOCUMENT_POSITION_CONTAINED_BY
+ `contains(otherNode)`
  + 返回一个Boolean值, 表示传入的节点是否当前节点的后代节点(是否包含)
+ `getRootNode()`
  + 返回上下文中的根节点
  + 在统一文档中, 和 `ownerDocument` 返回结果一致
+ `hasChildNodes()`
  + 返回一个Boolean值, 表示该节点是否有子节点
+ `insertBefore(otherNode, referenceNode)`
  + 在当前节点下增加一个子节点, 并使该节点位于参考节点的前面
  + 如果给定的子节点是对文档中现有节点的引用，insertBefore() 会将其从当前位置移动到新位置
+ `isEqualNode(otherNode)`
  + 判断两个节点是否一致(根据节点类型, 节点上的属性, 后代节点数量等等)
+ `isSameNode(otherNode)`
  + 返回一个 Boolean 类型值。返回这两个节点的引用比较结果。
+ `normalize()`
  + 对该元素下的所有文本节点进行整理, 合并相邻的文本节点并清空 空文本节点
+ `removeChild(childNode)`
  + 移除当前节点的一个子节点, 这个子节点必须在当前节点中
+ `replaceChild(newChild, oldChild)`
  + 使用新节点替代老节点, 如果新节点是原来存在DOM树中的引用, 则会从原位置删除

