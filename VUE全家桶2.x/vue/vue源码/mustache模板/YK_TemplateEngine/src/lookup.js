/**
 * 可以在dataObj对象中，寻找连续点符号的keyName属性 比如a.b.c  {a:{b:{c:100}}}
 * @param {object} dataObj
 * @param {string} keyName
 */
export default function lookup(dataObj, keyName) {

  // 判断keyName中有没有点符号，但不能是.本身
  if (keyName.indexOf(".") !== -1 && keyName !== '.') {
    let temp = dataObj; // 临时变量用于周转，一层一层找下去
    let keys = keyName.split(".");
    for (let key of keys) {
      temp = temp[key];
    }
    return temp;
  }
  return dataObj[keyName]

  // 只有一个元素不影响最终结果，不影响循环语句最终结果
  // 另外，这里的特征是：当前的值要依赖前一个的值，所以可以用 reduce 累加器
  // return keyName !== '.' ? keyName.split('.').reduce((prevValue, currentKey) => prevValue[currentKey], dataObj) : dataObj[keyName]
}
