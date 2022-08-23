import { parseFilters } from './FilterParser';

/*
 * @Author: huangyingli
 * @Date: 2022-08-22 14:48:45
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-22 14:57:32
 * @Description:
 */
export function getBindingAttr(el: any, name: string, getStatic?: boolean) {
  const dynamicValue =
    getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);

  if (dynamicValue) {
    return parseFilters(dynamicValue);
  } else if (getStatic) {
    const staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}

export function getAndRemoveAttr(
  el: any,
  name: string,
  removeFromMap?: boolean
): string {
  let val;
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList;
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val;
}
