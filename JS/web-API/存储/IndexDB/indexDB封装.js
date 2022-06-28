"use strict";
/*
 * @Author: huangyingli
 * @Date: 2022-06-27 15:57:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-28 17:35:33
 * @Description:
 */
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
function connectDB(dbname, version) {
    var request = window.indexedDB.open(dbname, version || 1);
    var res, rej;
    var promise = new Promise(function (resolve, reject) {
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
var dbSession = connectDB('test-db');
function openObjectStore(dbSession, storeName) {
    var res, rej;
    var promise = new Promise(function (resolve, reject) {
        res = resolve;
        rej = reject;
    });
    dbSession.then(function (db) {
        /* MDN上命名还可以定义第三个参数, 但是这里只有两个 */
        var transaction = db.transaction(storeName, 'readwrite');
        transaction.onerror = function (ev) {
            rej(ev);
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
        if (!db.objectStoreNames.contains(storeName)) {
            var store_1 = db.createObjectStore(storeName, {
                keyPath: mainKey,
            });
            indexes === null || indexes === void 0 ? void 0 : indexes.forEach(function (i) {
                store_1.createIndex(i.name, i.keyPath, {
                    unique: i.unique,
                });
            });
            res(openObjectStore(dbSession, storeName));
        }
        else {
            res(openObjectStore(dbSession, storeName));
        }
    });
    return promise;
}
var objStore = createObjectStore(dbSession, 'user', 'ssn', [
    { name: 'name', keyPath: 'name', unique: false },
    { name: 'email', keyPath: 'email', unique: true },
]);
objStore
    .then(function (_a) {
    var store = _a.store, transaction = _a.transaction;
    console.log('db', transaction, store);
    var complete = false;
    transaction.oncomplete = function () {
        console.log('事务完成');
        complete = true;
    };
    function add(obj) {
        if (complete) {
            // console.log(transaction.)
            openObjectStore(Promise.resolve(transaction.db), store.name).then(function (_a) {
                var store = _a.store, transaction = _a.transaction;
                complete = false;
                transaction.oncomplete = function () {
                    console.log('事务完成');
                    complete = true;
                };
                store.add(obj);
            });
        }
        else {
            store.add(obj);
        }
    }
    function get(mainKey) {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });
        if (complete) {
            // console.log(transaction.)
            openObjectStore(Promise.resolve(transaction.db), store.name).then(function (_a) {
                var store = _a.store, transaction = _a.transaction;
                complete = false;
                transaction.oncomplete = function () {
                    console.log('事务完成');
                    complete = true;
                };
                var element = store.get(mainKey);
                element.onsuccess = function (ev) {
                    res(element.result);
                };
            });
        }
        else {
            var element_1 = store.get(mainKey);
            element_1.onsuccess = function (ev) {
                res(element_1.result);
            };
        }
        return promise;
    }
    return {
        add: add,
        delete: store.delete.bind(store),
        get: get,
        put: store.put.bind(store),
        index: store.index.bind(store),
        clear: store.clear.bind(store),
        getAll: store.getAll.bind(store),
        // close: db.close.bind(db),
        transaction: transaction,
    };
})
    .then(function (handle) {
    console.log(handle.transaction.durability);
    console.log('处理');
    // data.forEach((d) => {
    //   handle.add(d);
    // });
    handle.transaction.db.onclose = function () {
        console.log('对象store 关闭');
    };
    handle.get('1111').then(function (res) {
        console.log(res);
    });
    setTimeout(function () {
        handle.get('3333').then(function (res) {
            console.log(res);
        });
    }, 3000);
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
