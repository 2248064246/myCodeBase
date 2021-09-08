/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:56:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:11:57
 * @Description:
 */
import { EventType } from '../types';
import {
  runBoostrap,
  runBeforeLoad,
  runMounted,
  runUnmounted,
} from '../lifeCycle';
import { getAppListStatus } from '../utils';

const capturedListeners: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: [],
};

// 劫持和 history 和 hash 相关的事件和函数
// 然后我们在劫持的方法里做一些自己的事情
// 比如说在 URL 发生改变的时候判断当前是否切换了子应用

const originalPush = window.history.pushState;
const originalReplace = window.history.replaceState;

let historyEvent: PopStateEvent | null = null;

let lastUrl: string | null = null;

export const reroute = (url: string) => {
  console.log(url, lastUrl);
  if (url !== lastUrl) {
    const { actives, unmounts } = getAppListStatus(); // 找出待激活和待挂载的app
    Promise.all(
      unmounts
        .map(async (app) => {
          await runUnmounted(app); // 执行卸载操作
        })
        .concat(
          actives.map(async (app) => {
            await runBeforeLoad(app); // 待激活app运行 beforeLoad, 此时加载 HTML, css, JS
            await runBoostrap(app);
            await runMounted(app); // 执行挂载操作
          })
        )
    ).then(() => {
      // callCapturedListeners(); // 这里是为什么??? (这个的作用是什么)
    });
  }
  lastUrl = url || location.href;
};

const handleUrlChange = () => {
  reroute(location.href);
};

export const hijackRoute = () => {
  window.history.pushState = (...args) => {
    // 这里重置浏览器的pushSate方法
    // args 参数 state, title, [, url]
    originalPush.apply(window.history, args); // 使用原有浏览器pushState 方法
    historyEvent = new PopStateEvent('popstate'); // 自定义一个 popstate 方法, 用于监听路由变化
    args[2] && reroute(args[2]); // 调用自己的路由方法
  };
  window.history.replaceState = (...args) => {
    originalReplace.apply(window.history, args);
    historyEvent = new PopStateEvent('popstate');
    args[2] && reroute(args[2]);
  };
  // 以上两个是浏览器前进后退时会调用
  window.addEventListener('hashchange', handleUrlChange); // # 路由监听
  window.addEventListener('popstate', handleUrlChange); // 普通路由监听

  // 而且为什么是在下面重写
  window.addEventListener = hijackEventListener(window.addEventListener);
  window.removeEventListener = hijackEventListener(window.removeEventListener);
};

const hasListeners = (name: EventType, fn: Function) => {
  return capturedListeners[name].filter((listener) => listener === fn).length;
};

const hijackEventListener = (func: Function): any => {
  return function (name: string, fn: Function) {
    // 如果是以下事件，保存回调函数 (这里报错回调干嘛??)
    if (name === 'hashchange' || name === 'popstate') {
      if (!hasListeners(name, fn)) {
        //
        capturedListeners[name].push(fn);
        return;
      } else {
        // 如果存在, 会去除这个回调函数???
        capturedListeners[name] = capturedListeners[name].filter(
          (listener) => listener !== fn
        );
      }
    }
    return func.apply(window, arguments);
  };
};

export function callCapturedListeners() {
  // 后续渲染子应用后使用，用于执行之前保存的回调函数 (为什么???)
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((eventName) => {
      const listeners = capturedListeners[eventName as EventType];
      if (listeners.length) {
        listeners.forEach((listener) => {
          // @ts-ignore
          listener.call(this, historyEvent);
        });
      }
    });
    historyEvent = null;
  }
}

export function cleanCapturedListeners() {
  capturedListeners['hashchange'] = [];
  capturedListeners['popstate'] = [];
}
