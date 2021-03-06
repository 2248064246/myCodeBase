/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:28:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:41:09
 * @Description:
 */

import { match } from 'path-to-regexp'; // 用于匹配路由的库
import { getAppList } from './appList';
import { IInternalAppInfo } from './types';
import { AppStatus } from './enum';
import { importEntry } from 'import-html-entry'; // 用于抽离css, js
import { getCache, setCache } from './cache';

export const getAppListStatus = () => {
  const actives: IInternalAppInfo[] = [];
  const unmounts: IInternalAppInfo[] = [];

  const list = getAppList() as IInternalAppInfo[];

  list.forEach((app) => {
    // 判断单前路由是否匹配app路径
    const isActive = match(app.activeRule, { end: false })(location.pathname);
    switch (app.status) {
      case AppStatus.NOT_LOADED:
      case AppStatus.LOADING:
      case AppStatus.LOADED:
      case AppStatus.BOOTSTRAPPING:
      case AppStatus.NOT_MOUNTED:
        isActive && actives.push(app); // 这个应该是找出待挂载的app
        break;
      case AppStatus.MOUNTED:
        !isActive && unmounts.push(app); // 找出待卸载的app
        break;
    }
  });

  return { actives, unmounts };
};

// export const fetchResource = async (url: string, appName: string) => {
//   if (getCache(appName, url)) return getCache(appName, url);
//   const data = await fetch(url).then((res) => res.text());
//   setCache(appName, url, data);
//   return data;
// };

export function getCompletionURL(src: string, baseURI: string) {
  if (!src) return src;
  if (/^(https|http)/.test(src)) return src;
  return new URL(src, getCompletionBaseURL(baseURI)).toString();
}

export function getCompletionBaseURL(url: string) {
  return url.startsWith('//') ? `${location.protocol}${url}` : url;
}

export const prefetch = async (app: IInternalAppInfo) => {
  // 使用了这个, 上面的手写的请求就不需要了
  requestIdleCallback(async () => { // 这个会在浏览器空闲的时候请求资源
    // 这里需要 @types/requestidlecallback 库
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(
      app.entry
    );
    console.log('请求资源', app);
    requestIdleCallback(getExternalStyleSheets); // 请求样式表
    requestIdleCallback(getExternalScripts); // 请求js
  });
};
