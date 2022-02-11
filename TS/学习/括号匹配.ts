/*
 * @Author: huangyingli
 * @Date: 2022-02-11 17:14:04
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-11 18:16:32
 * @Description:
 */

function BracketMatching(str: string): boolean {
  if (typeof str !== 'string' || str === '') return false;
  let reg: RegExp = /[{}()\[\]]/g;

  let matchTable = {
    '{': '}',
    '[': ']',
    '(': ')',
  };
  let bracketAry: RegExpMatchArray = str.match(reg) || [];

  let tempAry: Array<any> = [];

  bracketAry.forEach((el: any, idx) => {
    tempAry.push(el);
    let pre = tempAry[tempAry.length - 2];
    /* typescript 这里好恶心 */
    if (matchTable[pre as keyof typeof matchTable] === el) {
      tempAry.pop();
      tempAry.pop();
    }
  });

  return tempAry.length === 0;
}

console.log(BracketMatching('{([])}{}()[]'));
