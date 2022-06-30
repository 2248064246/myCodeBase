/*
 * @Author: huangyingli
 * @Date: 2022-06-27 15:57:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-29 09:59:16
 * @Description:
 */

interface testData {
  ssn: string;
  name: string;
  age: number;
  email: string;
}

interface IDBIndexes {
  name: string;
  keyPath: string;
  unique: boolean;
}

interface IDBStore {
  store: IDBObjectStore;
  transaction: IDBTransaction;
}

let data: Array<testData> = [
  {
    ssn: '1111',
    name: 'Tom',
    age: 18,
    email: 'sss@qq.com',
  },
  {
    ssn: '2222',
    name: 'Joy',
    age: 19,
    email: 'xxxx@qq.com',
  },
];

function connectDB(dbname: string, version?: number): Promise<IDBDatabase> {
  let request = window.indexedDB.open(dbname, version || 1);
  let res: Function, rej: Function;
  let promise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  request.onerror = function (event) {
    rej(event);
  };

  /**
   * 当版本变更事件触发, 但是数据库还在被使用的时候触发
   * 当有其他页面试图访问修改正在使用的数据库时触发
   */
  request.onblocked = function (event) {
    rej(event);
  };

  request.onsuccess = function (event) {
    res(request.result);
  };

  /* 初始化和版本变更的时候触发, 优先于success*/
  request.onupgradeneeded = function (event) {
    res(request.result);
  };

  return promise;
}

let dbSession = connectDB('test-db');

function openObjectStore(dbSession: Promise<IDBDatabase>, storeName: string) {
  let res: Function, rej: Function;
  let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  dbSession.then((db) => {
    /* MDN上命名还可以定义第三个参数, 但是这里只有两个 */
    let transaction = db.transaction(storeName, 'readwrite');
    transaction.onerror = function (ev) {
      rej(ev);
    };

    let store = transaction.objectStore(storeName);
    res({
      store,
      transaction,
    });
  });

  return promise;
}

function createObjectStore(
  dbSession: Promise<IDBDatabase>,
  storeName: string,
  mainKey: string,
  indexes?: Array<IDBIndexes>
) {
  let res: Function, rej: Function;
  let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  dbSession.then((db) => {
    if (!db.objectStoreNames.contains(storeName)) {
      let store = db.createObjectStore(storeName, {
        keyPath: mainKey,
      });

      indexes?.forEach((i) => {
        store.createIndex(i.name, i.keyPath, {
          unique: i.unique,
        });
      });
      res(openObjectStore(dbSession, storeName));
    } else {
      res(openObjectStore(dbSession, storeName));
    }
  });
  return promise;
}

let objStore = createObjectStore(dbSession, 'user', 'ssn', [
  { name: 'name', keyPath: 'name', unique: false },
  { name: 'email', keyPath: 'email', unique: true },
]);

objStore
  .then(({ store, transaction }) => {
    console.log('db', transaction, store);
    let complete = false;
    transaction.oncomplete = function () {
      console.log('事务完成');
      complete = true;
    };

    function add(obj: object) {
      if (complete) {
        // console.log(transaction.)

        openObjectStore(Promise.resolve(transaction.db), store.name).then(
          ({ store, transaction }) => {
            complete = false;
            transaction.oncomplete = function () {
              console.log('事务完成');
              complete = true;
            };
            store.add(obj);
          }
        );
      } else {
        store.add(obj);
      }
    }

    function get(mainKey: string) {
      let res: Function, rej: Function;
      let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      if (complete) {
        // console.log(transaction.)

        openObjectStore(Promise.resolve(transaction.db), store.name).then(
          ({ store, transaction }) => {
            complete = false;
            transaction.oncomplete = function () {
              console.log('事务完成');
              complete = true;
            };
            let element = store.get(mainKey);
            element.onsuccess = function (ev) {
              res(element.result);
            };
          }
        );
      } else {
        let element = store.get(mainKey);
        element.onsuccess = function (ev) {
          res(element.result);
        };
      }
      return promise
    }
    return {
      add,
      delete: store.delete.bind(store),
      get,
      put: store.put.bind(store),
      index: store.index.bind(store),
      clear: store.clear.bind(store),
      getAll: store.getAll.bind(store),
      // close: db.close.bind(db),
      transaction,
    };
  })
  .then((handle) => {
    // console.log(handle.transaction.durability);
    console.log('处理');
    // data.forEach((d) => {
    //   handle.add(d);
    // });
    handle.transaction.db.onclose = function () {
      console.log('对象store 关闭');
    };
   handle.get('1111').then(res => {
    console.log(res)
   })
   setTimeout(() => {
    handle.get('3333').then(res => {
      console.log(res)
     })
   }, 3000)

    /* 默认会在很短时间内关闭事务 */
    // setTimeout(() => {
    //   handle.add({
    //     ssn: '3333',
    //     age: 16,
    //     email: 'xdf@ss.com',
    //     name: 'Tony',
    //   });
    // }, 3000);
  });
