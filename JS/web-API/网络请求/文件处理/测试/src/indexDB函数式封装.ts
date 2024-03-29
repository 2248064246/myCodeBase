/*
 * @Author: huangyingli
 * @Date: 2022-06-29 09:58:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 15:52:46
 * @Description:
 */

import _ from 'lodash';

interface IDBIndexes {
  name: string;
  keyPath: string;
  unique: boolean;
}

interface IDBStore {
  store: IDBObjectStore;
  transaction: IDBTransaction;
}

interface HandleType {
  /**
   * 通过设定的 keyPath 值取得指定对象
   */
  get<T>(key: string): Promise<T>;
  /**
   * 给对象存储增加对象
   */
  add<T>(obj: T): Promise<string>;
  /**
   * 修改指定存储值
   * @param obj 新对象
   * @param key keyPath 值
   */
  put<T>(obj: T, key: string): Promise<string>;
  delete(key: string): Promise<any>;
  clear(): Promise<any>;
  /**
   * 统计对象存储记录的条目数量
   */
  count(): Promise<Boolean>;
  /**
   * 通过 index 和对应值 获取指定对象
   * @param name 索引名称
   * @param value 要查找的值
   */
  index(name: string, value: string): Promise<any>;
  getAll<T>(): Promise<Array<T>>;

  /* 关闭连接 */
  close(): void;

  /**
   * 数据库名称
   */
  dbName: string;

  /**
   * 对象存储名称
   */
  storeName: string;
}

function connectDB(
  dbname: string,
  version?: number,
  storeName?: string,
  mainKey?: string,
  indexes?: Array<IDBIndexes>
): Promise<IDBDatabase> {
  let request = window.indexedDB.open(dbname, version);
  let res: Function, rej: Function;
  let promise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  request.onerror = function (event: Event) {
    let target = event.target as IDBRequest;
    rej(target.error);
  };

  /**
   * 当版本变更事件触发, 但是数据库还在被使用的时候触发
   * 当有其他页面试图访问修改正在使用的数据库时触发
   */
  request.onblocked = function (event) {
    let target = event.target as IDBRequest;
    rej(target.error);
  };

  request.onsuccess = function (event) {
    res(request.result);
  };

  /* 初始化和版本变更的时候触发, 优先于success*/
  request.onupgradeneeded = function (event) {
    if (storeName) {
      let store = request.result.createObjectStore(storeName as string, {
        keyPath: mainKey,
      });
      indexes?.forEach((i) => {
        store.createIndex(i.name, i.keyPath, {
          unique: i.unique,
        });
      });
    }
  };

  return promise;
}

function openObjectStore(dbSession: Promise<IDBDatabase>, storeName: string) {
  let res: Function, rej: Function;
  let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  dbSession.then((db) => {
    /* MDN上命名还可以定义第三个参数, 但是这里只有两个 */
    let transaction = db.transaction(storeName, 'readwrite');
    transaction.onerror = function (event: Event) {
      let target = event.target as IDBRequest;
      rej(target.error);
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
  mainKey?: string,
  indexes?: Array<IDBIndexes>
) {
  let res: Function, rej: Function;
  let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  dbSession.then((db) => {
    /* 如果不存在这个对象存储, 则重新打开一个更高版本的数据库 */
    /* 并在 upgradeVersion 是创建这个对象存储 */
    if (!db.objectStoreNames.contains(storeName)) {
      console.log(db, storeName, mainKey, indexes);
      let { name, version } = db;
      /* 在重新新开启一个新版本数据库时, 一定需要先关闭数据库, 不然无法打开 */
      db.close();
      res(
        openObjectStore(
          connectDB(name, version + 1, storeName, mainKey, indexes),
          storeName
        )
      );
    } else {
      res(openObjectStore(dbSession, storeName));
    }
  });
  return promise;
}

function handleFactory(
  store: IDBObjectStore,
  transaction: IDBTransaction,
  type: keyof IDBObjectStore,
  value: any,
  real: any
) {
  let res: Function, rej: Function;
  let promise: Promise<IDBStore> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let fnc = store[type] as Function;
  let cursorAry: Array<any> = [];
  let hasIndex: Boolean = false;
  function _handle(store: IDBObjectStore) {
    let element = fnc.bind(store)(value);
    switch (type) {
      case 'index':
        element = element.openCursor() as IDBRequest;
        break;
    }
    element.onsuccess = function () {
      switch (type) {
        case 'index':
          let cursor = element.result as IDBCursorWithValue;
          if (!cursor) {
            console.log(cursorAry, hasIndex);
            if (hasIndex) {
              res(cursorAry);
            } else {
              rej(Error('Not found index: ' + real));
            }
            hasIndex = false;
            cursorAry = [];
            return;
          }
          if (cursor.key === real) {
            console.log(element.result.value);
            // res(element.result.value);
            hasIndex = true;
            cursorAry.push(element.result.value);
          }
          cursor.continue();
          break;
        default:
          res(element.result);
      }
    };
    element.onerror = function (ev: Event) {
      let target = ev.target as IDBRequest;
      rej(target.error);
    };
  }

  /**
   * 事务的处理可以通过打开一个新的对象存储来完成
   * 如果同一时间有多个事务, 这些事务会排队, 对于同一浏览器的多个标签而言也是如此
   */
  openObjectStore(Promise.resolve(transaction.db), store.name).then(
    ({ store, transaction }) => {
      transaction.oncomplete = function () {
        console.log(type + ': 事务完成');
      };
      _handle(store);
    }
  );

  return promise;
}

function handleStore(
  objStoreWrap: Function,
  dbName: string,
  storeName: string,
  mainKey?: string,
  indexes?: Array<IDBIndexes>
): Promise<HandleType> {
  let objStore = objStoreWrap(dbName)(
    storeName,
    mainKey,
    indexes
  ) as Promise<IDBStore>;
  let res: Function, rej: Function;
  let promise: Promise<HandleType> = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  objStore.then(({ store, transaction }) => {
    res({
      add: _.partial(handleFactory, store, transaction, 'add'),
      get: _.partial(handleFactory, store, transaction, 'get'),
      delete: _.partial(handleFactory, store, transaction, 'delete'),
      put: _.partial(handleFactory, store, transaction, 'put'),
      clear: _.partial(handleFactory, store, transaction, 'clear'),
      count: _.partial(handleFactory, store, transaction, 'count'),
      index: _.partial(handleFactory, store, transaction, 'index'),
      getAll: _.partial(handleFactory, store, transaction, 'getAll'),
      close: transaction.db.close.bind(transaction.db),
      dbName: transaction.db.name,
      storeName: store.name,
    } as unknown as HandleType);
  });
  return promise;
}

/**
 * 可以打开或创建indexDB
 * 创建时mainKey必填
 */
const IndexDB = _.partial(
  handleStore,
  _.flow([connectDB, _.curry(createObjectStore)])
);

export default IndexDB;
