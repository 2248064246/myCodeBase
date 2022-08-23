/*
 * @Author: huangyingli
 * @Date: 2022-08-23 10:38:23
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-23 10:47:05
 * @Description:
 */

let callback: Array<Function> = [];
let pending:boolean = false;

let timeFunc: Function;

timeFunc = () => {
  setTimeout(flushCallback, 0)
}

function flushCallback() {
  pending = false;
  callback.forEach(cb => {
    cb();
  })
  callback = [];
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve: Function;

  callback.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        console.warn(`nextTick 回调错误 ${e}`);
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if(!pending) {
    pending = true;
    timeFunc();
  }

  if (!cb) {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}



