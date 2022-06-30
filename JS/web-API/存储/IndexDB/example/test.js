var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../indexDB\u51FD\u6570\u5F0F\u5C01\u88C5"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var indexDB_____1 = __importDefault(require("../indexDB\u51FD\u6570\u5F0F\u5C01\u88C5"));
    /* 打开或新增一个对象存储 */
    /* 新增时 keyPath 是必须的 */
    (0, indexDB_____1.default)('test-db', 'user', 'ssn').then(function (handle) {
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
        // handle.clear().then((res) => {
        //   console.log(res);
        // });
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
                handle.close();
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
    (0, indexDB_____1.default)('test-db', 'user', 'ssn').then(function (handle) {
        // handle.get('1111').then((res: testData) => {
        //   console.log(res);
        // });
        // handle.get('666666').then((res: testData) => {
        //   console.log(res);
        // });
        // handle.get('6666898').then((res: testData) => {
        //   console.log(res);
        // });
        handle.getAll().then(function (res) {
            console.log('all', res);
        });
        // handle.clear().then((res) => {
        //   console.log(res);
        // });
        // handle.count().then((res) => {
        //   console.log(res);
        // });
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
                // handle.close();
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
