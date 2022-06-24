/*
 * @Author: huangyingli
 * @Date: 2022-06-22 17:14:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-23 15:14:26
 * @Description:
 */

let _ = '_';

function curry(fnc) {
  if (typeof fnc !== 'function') {
    throw TypeError('need a function, but got ' + typeof fnc);
  }
  let paramsLen = fnc.length;

  let _fnc = function (...argsOne) {
    // 参数超过长度, 改写占位符
    while (argsOne.length > paramsLen) {
      let pop = argsOne.pop();
      argsOne[argsOne.indexOf(_)] = pop;
    }

    if (argsOne.filter((arg) => arg !== _).length === paramsLen) {
      return fnc(...argsOne);
    } else {
      // 这里聪明
      return _fnc.bind(null, ...argsOne);
    }
  };
  return _fnc;
}

let add = function (x, y, z) {
  return x + y + z;
};

let addC = curry(add);

console.log(addC(1)(2)(3));
console.log(addC(1, 2)(3));
console.log(addC(1, 2, 3));
console.log(addC(_)(2, 3)(1));
