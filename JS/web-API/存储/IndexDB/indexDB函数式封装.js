/*
 * @Author: huangyingli
 * @Date: 2022-06-29 09:58:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-30 17:54:34
 * @Description:
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lodash"], function (require, exports, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    lodash_1 = __importDefault(lodash_1);
    var data = [
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
    function connectDB(dbname, version, storeName, mainKey, indexes) {
        var request = window.indexedDB.open(dbname, version);
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        request.onerror = function (event) {
            var target = event.target;
            rej(target.error);
        };
        /**
         * 当版本变更事件触发, 但是数据库还在被使用的时候触发
         * 当有其他页面试图访问修改正在使用的数据库时触发
         */
        request.onblocked = function (event) {
            var target = event.target;
            rej(target.error);
        };
        request.onsuccess = function (event) {
            res(request.result);
        };
        /* 初始化和版本变更的时候触发, 优先于success*/
        request.onupgradeneeded = function (event) {
            console.log('变化');
            /* 只有存在要名字才创建 */
            if (storeName) {
                var store_1 = request.result.createObjectStore(storeName, {
                    keyPath: mainKey,
                });
                indexes === null || indexes === void 0 ? void 0 : indexes.forEach(function (i) {
                    store_1.createIndex(i.name, i.keyPath, {
                        unique: i.unique,
                    });
                });
            }
        };
        return promise;
    }
    function openObjectStore(dbSession, storeName) {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        dbSession.then(function (db) {
            /* MDN上命名还可以定义第三个参数, 但是这里只有两个 */
            var transaction = db.transaction(storeName, 'readwrite');
            transaction.onerror = function (event) {
                var target = event.target;
                rej(target.error);
            };
            var store = transaction.objectStore(storeName);
            res({
                store: store,
                transaction: transaction,
            });
        });
        return promise;
    }
    function createObjectStore(dbSession, storeName, mainKey, indexes) {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        dbSession.then(function (db) {
            /* 如果不存在这个对象存储, 则重新打开一个更高版本的数据库 */
            /* 并在 upgradeVersion 是创建这个对象存储 */
            if (!db.objectStoreNames.contains(storeName)) {
                console.log(db, storeName, mainKey, indexes);
                var name_1 = db.name, version = db.version;
                /* 在重新新开启一个新版本数据库时, 一定需要先关闭数据库, 不然无法打开 */
                db.close();
                res(openObjectStore(connectDB(name_1, version + 1, storeName, mainKey, indexes), storeName));
            }
            else {
                res(openObjectStore(dbSession, storeName));
            }
        });
        return promise;
    }
    function handleFactory(store, transaction, type, value) {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        var fnc = store[type];
        function _handle(store) {
            var element = fnc.bind(store)(value);
            element.onsuccess = function () {
                res(element.result);
            };
            element.onerror = function (ev) {
                var target = ev.target;
                rej(target.error);
            };
        }
        /**
         * 事务的处理可以通过打开一个新的对象存储来完成
         * 如果同一时间有多个事务, 这些事务会排队, 对于同一浏览器的多个标签而言也是如此
         */
        openObjectStore(Promise.resolve(transaction.db), store.name).then(function (_a) {
            var store = _a.store, transaction = _a.transaction;
            transaction.oncomplete = function () {
                console.log(type + ': 事务完成');
            };
            _handle(store);
        });
        return promise;
    }
    function handleStore(objStoreWrap, dbName, storeName, mainKey, indexes) {
        var objStore = objStoreWrap(dbName)(storeName, mainKey, indexes);
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        objStore.then(function (_a) {
            var store = _a.store, transaction = _a.transaction;
            res({
                add: lodash_1.default.partial(handleFactory, store, transaction, 'add'),
                get: lodash_1.default.partial(handleFactory, store, transaction, 'get'),
                delete: lodash_1.default.partial(handleFactory, store, transaction, 'delete'),
                put: lodash_1.default.partial(handleFactory, store, transaction, 'put'),
                clear: lodash_1.default.partial(handleFactory, store, transaction, 'clear'),
                count: lodash_1.default.partial(handleFactory, store, transaction, 'count'),
                index: lodash_1.default.partial(handleFactory, store, transaction, 'index'),
                getAll: lodash_1.default.partial(handleFactory, store, transaction, 'getAll'),
            });
        });
        return promise;
    }
    var indexDB = lodash_1.default.partial(handleStore, lodash_1.default.flow([connectDB, lodash_1.default.curry(createObjectStore)]));
    /* 打开或新增一个对象存储 */
    /* 新增时 keyPath 是必须的 */
    indexDB('test-db', 'user', 'ssn').then(function (handle) {
        // handle.get('1111').then((res: testData) => {
        //   console.log(res);
        // });
        // handle.get('666666').then((res: testData) => {
        //   console.log(res);
        // });
        // handle.get('6666898').then((res: testData) => {
        //   console.log(res);
        // });
        // handle.getAll().then((res: Array<testData>) => {
        //   console.log(res);
        // });
        handle.clear().then(function (res) {
            console.log(res);
        });
        handle.count().then(function (res) {
            console.log(res);
        });
        // handle
        // .add({
        //   ssn: '666666',
        //   age: 128,
        //   email: 'qqdx222x@gmail.com',
        //   name: 'Bin3',
        // } as testData)
        // .then((res: any) => {
        //   console.log(res);
        // });
        setTimeout(function () {
            handle.get('3333').then(function (res) {
                console.log(res);
            });
            setTimeout(function () {
                handle
                    .add({
                    ssn: '666689888',
                    age: 128,
                    email: 'qqdx558886x@gmail.com',
                    name: 'Bin3',
                })
                    .then(function (res) {
                    console.log(res);
                });
            }, 3000);
        }, 3000);
        // handle.add({
        //   ssn: '555',
        //   age: 18,
        //   email: 'qq@gmail.com',
        //   name: 'Bin'
        // } as testData)
    });
});
