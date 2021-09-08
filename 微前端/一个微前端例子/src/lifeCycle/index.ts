/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:21:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:13:55
 * @Description:
 */

import { IAppInfo, IInternalAppInfo, ILifeCycle } from '../types';
import { AppStatus } from '../enum';
import { loadHTML } from '../loader';

let lifeCycle: ILifeCycle = {};

export const setLifeCycle = (list: ILifeCycle) => {
  lifeCycle = list;
};

export const getLifeCycle = () => {
  return lifeCycle;
};

export const runBeforeLoad = async (app: IInternalAppInfo) => {
  app.status = AppStatus.LOADING;
  await runLifeCycle('beforeLoad', app);

  app = await loadHTML(app);
  app.status = AppStatus.LOADED;
};

export const runBoostrap = async (app: IInternalAppInfo) => {
  if (app.status !== AppStatus.LOADED) {
    return app;
  }
  app.status = AppStatus.BOOTSTRAPPING;
  await app.bootstrap?.(app);
  app.status = AppStatus.NOT_MOUNTED;
};

export const runMounted = async (app: IInternalAppInfo) => {
  app.status = AppStatus.MOUNTING;
  await app.mount?.(app);
  app.status = AppStatus.MOUNTED;
  await runLifeCycle('mounted', app);
};

export const runUnmounted = async (app: IInternalAppInfo) => {
  app.status = AppStatus.UNMOUNTING;
  console.log('取消挂载', app)
  app.proxy.inactive(); // 将此app沙箱设置为失活
  await app.unmount?.(app); // 等待app自身的 unmount 方法卸载app
  app.status = AppStatus.NOT_MOUNTED;
  await runLifeCycle('unmounted', app); // 运行声明周期
};

const runLifeCycle = async (name: keyof ILifeCycle, app: IAppInfo) => {
  const fn = lifeCycle[name]; // 这里调用声明中期方法
  if (fn instanceof Array) {
    await Promise.all(fn.map((item) => item(app)));
  } else {
    await fn?.(app); // 函数也可以这么用啊...
  }
};
