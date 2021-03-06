/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:22:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:21:15
 * @Description:
 */
import { IInternalAppInfo } from '../types';
import { importEntry } from 'import-html-entry';
import { ProxySandbox } from './sandbox';

export const loadHTML = async (app: IInternalAppInfo) => {
  const { container, entry } = app;

  const { template, getExternalScripts, getExternalStyleSheets } =
    await importEntry(entry);
  const dom = document.querySelector(container);

  if (!dom) {
    throw new Error('容器不存在');
  }
  dom.innerHTML = template; // 此时的 template 是一个完整的html结构, 为什么到页面上 <!DOCTYPE html> <html> 这些结构没有了...

  await getExternalStyleSheets();
  const jsCode = await getExternalScripts();

  jsCode.forEach((script) => {
    const lifeCycle = runJS(script, app); // 这里通过运行js, 找出导出的 unmount 方法
    if (lifeCycle) {
      app.bootstrap = lifeCycle.bootstrap;
      app.mount = lifeCycle.mount;
      app.unmount = lifeCycle.unmount;
    }
  });

  return app;
};

const runJS = (value: string, app: IInternalAppInfo) => {
  if (!app.proxy) {
    app.proxy = new ProxySandbox();
    // @ts-ignore
    window.__CURRENT_PROXY__ = app.proxy.proxy;
  }
  app.proxy.active();
  // window[app.name] 会是 lifeCycle 类?
  const code = `
    return (window => {
      ${value}
      return window['${app.name}'] 
    })(window.__CURRENT_PROXY__)
  `;
  return new Function(code)();
};
