/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:22:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:40:34
 * @Description:
 */
// 用于实现一个js沙箱

/**
 * 以上代码只是一个初版的沙箱，核心思路就是创建一个假的 window 出来，
 * 如果用户设置值的话就设置在 fakeWindow 上，这样就不会影响全局变量了。
 * 如果用户取值的话，就判断属性是存在于 fakeWindow 上还是 window 上。
 */
export class ProxySandbox {
  proxy: any;
  running = false;
  constructor() {
    const fakeWindow = Object.create(null);
    const proxy = new Proxy(fakeWindow, {
      set: (target: any, p: string, value: any) => {
        // 如果当前沙箱在运行，就直接把值设置到 fakeWindow 上
        if (this.running) {
          target[p] = value;
        }
        return true;
      },
      get(target: any, p: string): any {
        switch (p) {
          case 'window':
          case 'self':
          case 'globalThis':
            return proxy;
        }
        // 假如属性不存在 fakeWindow 上，但是存在于 window 上
        // 从 window 上取值
        if (
          !window.hasOwnProperty.call(target, p) &&
          window.hasOwnProperty(p)
        ) {
          // @ts-ignore
          const value = window[p];
          if (typeof value === 'function') return value.bind(window);
          return value;
        }
        return target[p];
      },
      has() {
        return true;
      },
    });
    this.proxy = proxy;
  }
  active() {
    this.running = true;
  }
  inactive() {
    this.running = false;
  }
}
