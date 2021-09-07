/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:32:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:34:50
 * @Description:
 */

const cache: Record<string, any> = {};

export const setCache = (key: string, url: string, value: any) => {
  cache[key] = {
    // 将这个子应用下所有的请求url保存
    ...cache[key],
    [url]: value,
  };
};

export const getCache = (key: string, url: string) => {
  if (cache[key]) {
    return cache[key][url];
  }
};
