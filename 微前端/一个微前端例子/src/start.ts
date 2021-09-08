/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:44:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:12:17
 * @Description:
 */
import { getAppList, setAppList } from './appList';
import { setLifeCycle } from './lifeCycle';
import { IAppInfo, IInternalAppInfo, ILifeCycle } from './types';
import { hijackRoute, reroute } from './route';
import { AppStatus } from './enum';
import { prefetch } from './utils';

export const registerMicroApps = ( // 注册微应用, 还能设置它的声明周期
  // 可以设置应用的beforeLoad, mounted, unmounted 这三个声明周期方法
  // 同时在appList 里面可以设置应用的 mount, unmount, bootstrap 等方法
  // 好像不行, 里面规定了 appList 的类型是 IAppInfo, 无法设置那三个方法
  appList: IAppInfo[],
  lifeCycle?: ILifeCycle
) => {
  setAppList(appList); // 此时app是 NOT_LOADED
  lifeCycle && setLifeCycle(lifeCycle); // 如果存在声明周期, 则设置
};

export const start = () => {
  const list = getAppList();
  if (!list.length) {
    throw new Error('请先注册应用');
  }

  hijackRoute();
  reroute(window.location.href);

  list.forEach((app) => {
    if ((app as IInternalAppInfo).status === AppStatus.NOT_LOADED) {
      prefetch(app as IInternalAppInfo);
    }
  });
};
