
# IndexDB 使用方法


```js
/* 需要储存的数据 */
 const customerData = [{
        ssn: "444-44-4444",
        name: "Bill",
        age: 35,
        email: "bill@company.com"
      },
      {
        ssn: "444-44-5555",
        name: "Bill",
        age: 39,
        email: "bill2@company.com"
      },
      {
        ssn: "555-55-5555",
        name: "Donna",
        age: 32,
        email: "donna@home.org",
        friend: new Set([1, 2, 3])
      }
];

const dbName = 'test_name'
/* 先创建一个数据库, 版本号指定1 */
let request = indexedDB.open(dbName, 1) // 这个返回的 IDBFactory 对象

/* 我们需要给request设置监听函数 */
/* 分别是 error, success, blocked, upgradeneeded */
request.onerror = function (event) {}

request.onsuccess = function (event) {}

request.onupgradeneeded = function (event) {}

```

添加数据, 要添加数据需要获取 `IDBDatabase` 对象
```js
/* 使用 createObjectStore 创建一个对象存储区 */
request.onupgradeneeded = function (event) {

  let db = request.result // open() 方法的结果就是返回 IDBDatabase 对象

  /* 创建一个对象仓库 */
  let objectStore = db.createObjectStore('customers', {
    /* 这里 keyPath: 值的是以对象中 ssn 的属性值为键 */
    /* 后续可以通过 get(key) 查询到这个对象*/
    /* autoIncrement 则是自增键, 从 1 开始 */
    keyPath: 'ssn',
    // autoIncrement: Boolean
  })

  /* 这个是定义次键, 就是能够通过 name 属性的名字找到这个对象 */
  /* unique 指定这个属性的值是否唯一, 如果为true, 则添加相同属性值会失败 */
  /* 第一个参数指定对象参数名字, 第二个指定使用 IDBIndex 接口查询时的 key(类似 keyPath) */
  objectStore.createIndex('name', 'name', {
    unique: false
  })

  /* 使用事务的 oncomplete 方法, 确保写入数据前对象仓库已经创建完毕 */
  objectStore.transaction.oncomplete = function (event) {
    // 获取对象存储 IDBObjectStore
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
     /* 在这里可以添加 */
    customerData.forEach(function (customer) {
      let re = customerObjectStore.add(customer); // 向该库里面添加数据
      /* 在这里可以添加此次添加的事件, 来监听是否添加成功 */
      // re.onsuccess = fn
    });
  }
}
```

查询
```js
/* 查询方法需要在数据库打开成功之后操作 */
request.onsuccess = function (event) {
  let db = request.result // 现获取数据库 (IDBDatabase)
  /* 然后获取到 IDBObjectStore */
  /* transaction 第二个参数没写默认是 readonly */
  let objectStore = db.transaction('customers').objectStore('customers')

  /* 此时我们可以通过对象索引来获取结果 */
  // 如果是 autoIncrement, 则使用数字索引
  // let result = objectStore.get(1) 

  // 如果是  keyPath: 'ssn' 这种, 则使用对应属性名
  let result = objectStore.get('555-55-5555') 

  /* 应为数据库操作是异步操作, 所以需要通过方法获取结果 */
  result.onsuccess = function(event) {
    // 结果在 result.result 属性里面
  }

  /* 同样可以通过 index 查询 */
  let resultIndex = objectStore.index('name')
  let result2 = resultIndex.getAll('Bill') // 这里获取的将会是一个数组, 应为同值的 name 属性
  result2.onsuccess = function(event) {
    // 结果在 result2.result 里面
  }
}
```

删除
```js
var request = db.transaction(["customers"], "readwrite")
                .objectStore("customers")
                .delete("444-44-4444"); 
request.onsuccess = function(event) {
  // 删除成功！
};
```

修改
```js
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // 错误处理
};
request.onsuccess = function(event) {
  // 获取我们想要更新的数据
  var data = request.result;

  // 更新你想修改的数据
  data.age = 42;

  // 把更新过的对象放回数据库
  var requestUpdate = objectStore.put(data);
   requestUpdate.onerror = function(event) {
     // 错误处理
   };
   requestUpdate.onsuccess = function(event) {
     // 完成，数据已更新！
   };
};
```

## 使用游标

如果想要遍历对象存储空间中的所有值，那么你可以使用游标
```js
var objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
    cursor.continue();
  }
  else {
    alert("No more entries!");
  }
};
```

可以给 openCursor() 方法传入参数来限制游标范围和查找方向

[具体看MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)


## 当一个 web app 在另一个标签页中被打开时的版本变更

如果有其他页面加载了数据库(版本变更), 而当前页面没有关闭数据库, 则会触发 onblocked 方法, 组织其他页面操作数据库

