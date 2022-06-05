/**
 * 将attrsString变为数组返回
 * @param {*} attrsString
 */
export default function parseAttrsString(attrsString) {
  let result = [];
  // 当前是否在引号内
  let isQuote = false;
  let point = 0;
  if (attrsString === undefined) return [];

  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if (char === '"') {
      isQuote = !isQuote;
    } else if (char === " " && !isQuote) {
      // 是空格且不在引号之中
      let str = attrsString.substring(point, i);
      // 不是纯空格
      if (!/^\s*$/.test(str)) {
        result.push(str.trim());
        point = i;
      }
    }
  }
  // 循环结束之后，最后一个也要加进去
  result.push(attrsString.substring(point).trim());

  result = result.map((item) => {
    // 根据等号拆分
    const o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });

  return result;
}
