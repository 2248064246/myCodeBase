/*
 * @Author: huangyingli
 * @Date: 2022-06-13 16:14:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:16:24
 * @Description: 
 */
import observe from './observe.js';
import Watcher from './Watcher.js';

import Vue from './Vue.js';

// var obj = {
//   a: {
//     m: {
//       n: 5,
//     },
//   },
//   b: 10,
//   c: {
//     d: {
//       e: {
//         f: 6666,
//       },
//     },
//   },
//   g: [22, 33, 44, 55],
// };

// observe(obj);
// new Watcher(obj, 'a.m.n', (val) => {
//   console.log('★我是watcher，我在监控a.m.n', val);
// });
// obj.a.m.n = 88;
// // obj.g.push(66);
// console.log(obj);


let vm = new Vue({
    data: {
        a: 123,
        b: 345,
        c: {
            x: 'xxx',
            y: {
                z: 'zzz'
            }
        }
    },
    watch: {
        a(val) {
            console.log('watch 变化 a:  ', val)
        }
    }
})

console.log(vm._data.a)
vm.a = 999
console.log(vm._data.a)


console.log(vm._data.c.y.z)
vm._data.c.y.z = 'yyyy'
console.log(vm._data.c.y.z)