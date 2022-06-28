
# IndexedDB

IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据(可以存储结构化克隆算法支持的任何对象)

IndexedDB 是一个事务型数据库系统

IndexedDB 是一个对象数据库, 不是关系型数据库

提供比 localStorage 更加强大高效和可靠的存储机制(能够存储 Map, set等对象)

IndexedDB 的作用域限定为包含文档的来源, 同源之间可以互相访问, 非同源完全隔离


## window.indexedDB 对象

全局indexedDB只读属性为应用程序提供了一种异步访问索引数据库功能的机制。

通过这个对象获取数据库接口

返回一个 IDBFactory 对象

## IDBFactory

此对象用于控制数据库的打开, 创建, 和删除

+ `open(name, version)` 
  + name: 数据库名称, version: 数据库版本
  + 连接数据库在一个单独的线程中进行，包括以下几个步骤：
    1. 指定数据库以存在时:
      + 等待versionchange操作完成
      + 如果数据库计划删除, 那等着删除完成
    2. 如果已有数据库版本高于给定的version, 终止操作并返回类型为 VersionError 的错误
    3. 如果已有数据库版本低于给定的version, 则触发一个 versionchange 操作
    4. 如果数据库不存在, 则创建指定名称数据库, 将版本号设置为给定版本, 如果没有给定版本号, 则设置为 1
  + open 操作成功好, 会触发 success 事件, 同时返回一个 `IDBOpenDBRequest` 对象(这个对象立即放回, 但是open的操作是异步的)
+ `deleteDatabase(name)`
  + 立即返回一个 `IDBOpenDBRequest` 对象, 然后异步执行删除操作
  + 当删除的时候, 任何打开数据库连接的操作都将得到一个 versionchange 事件
  + 当删除成功, 触发一个 success 事件, 失败是 error 事件
+ `cmp(first, second)` 
  + 比较两个 key 的大小
  + 结果
    + -1: first < second
    + 0: 相等
    + 1: first > second

## IDBOpenDBRequest 

此对象继承自 `IDBRequest`

+ `onblocked`
  + 当版本变更事件触发, 但是数据库还在被使用的时候触发
+ `onupgradeneeded`
  + 会在当一个数据库版本比已存在的版本还高的时候触发(就是版本修改的时候触发)
  + 这个事件会先于 `onsuccess` 触发(初始化的时候还有版本修改的时候)

## IDBRequest

提供了根据绑定事件处理函数访问结果集的方法

其中结果集来自对数据库和数据库对象发起的异步查询。对数据库的读写操作都是通过request的方式来实现

+ `result`
  + 这个属性返回一个 IDBDatabase 实例
+ `error`
+ `source`
+ `transaction`
+ `readState`
  + 初始时为 pending, 代开数据库成功或者失败的是否会变为 done
+ `onerror`
+ `onsuccess`


## IDBDatabase

此对象是唯一能够访问和管理数据库版本的接口

同时, 此对象能够打开一个 transaction(事务), 然后操作数据库

此对象只能用于 

+ `close()`
  + 方法立即返回(没有返回值), 并在一个单独的线程中关闭数据库连接
  + 在使用此连接创建的所有事务完成之前，连接实际上不会关闭。一旦调用此方法，就不能为该连接创建新的事务。
  + 如果关闭操作挂起，创建事务的方法会抛出异常。(意思如果先close, 后续添加事务会报错)
+ `createObjectStore(name, option)`
  + name: store 名称
  + option: 可选参数
    + keyPath
    + autoIncrement: Boolean
  + 方法返回一个 `IDBObjectStore` 对象
  + 此方法只能在 versionchange 事务中被调用。
+ `deleteObjectStore(name)`
+ `transaction(storeNames, mode)`
  + StoreNames可以是字符串数组, 也可以是一个字符串
  + mode
    + readonly
    + readwrite
  + 立即返回 `IDBTransaction` 对象, 
+ objectStoreNames 
  + 获取当前数据库下的对象store列表 (**也就是数据表**)
  + 原型方法
    + contains(storeName) 判断是否包含某个对象store
## IDBObjectStore

此对象表示数据库中的一个 对象库, 

对象库中的记录根据其键值进行排序, 这种排序可以实现快速插入, 查找和有序检索

属性
+ `indexName` 表中对象的索引名列表
+ `keyPath` 表中的键路径
+ `name` 表名
+ `transaction` 事务的名称
+ `autoIncrement` 表中自增字段的值

方法
+ `add(value[, key])`
+ `clear()`
+ `count()`
+ `createIndex(in DOMString name, in DOMString keyPath, in optional boolean unique)`
+ `delete(key)`
+ `deleteIndex(in any DOMString indexName)`
+ `get(key)`
  + 这里返回的是 `IDBRequest` 对象
+ `getAll()`
+ `getAllKeys()`
+ `index(DOMString name)`
+ `openCursor()`
  + 用于遍历存储空间中的所有值
+ `put(value[, key])`

## IDBTransaction

所有的读取和写入数据均在事务中完成

由IDBDatabase发起事务，通过IDBTransaction 来设置事务的模式（例如：是否只读readonly或读写readwrite），以及通过IDBObjectStore来发起一个请求。同时你也可以使用它来中止事务。

属性
+ `db` 
  + 当前事务所属的数据库连接
+ `mode`
  + 用于隔离事务作用域内的object store中数据访问的模式。下方的常量章节给出了所有可用的值。默认值是 readonly.
+ `objectStoreNames`

事件
+ `onabort`
+ `oncomplete`
  + 当事务成功完成时抛出。
+ `onerror`

方法
+ `abort()` 
  + 放弃本次连接的 `transaction` 的所有修改
+ `objectStore(name)`
  + 返回此次事务的存储 `IDBObjectStore`


## IDBIndex

也是为了允许访问 IndexedDB 数据库中的数据子集，但使用索引来检索记录而不是主键

方法
+ `count`
+ `get`
+ `getAll`
+ `getKey`
+ `getAllKeys`

属性
+ `name`
+ `objectStore`
+ `keyPath`
+ `multiEntry`
+ `unique`

## IDBCursorWithValue 

这个对象由 `openCursor` 方法返回

属性
+ `direction`
+ `key`
+ `value`
