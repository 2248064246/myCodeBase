/*
 * @Author: huangyingli
 * @Date: 2022-02-11 16:02:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-11 17:02:50
 * @Description:
 */
class StrArray extends Array {
  static rsAstralRange = '\\ud800-\\udfff';
  static rsZWJ = '\\u200d';
  static rsVarRange = '\\ufe0e\\ufe0f';
  static rsComboMarksRange = '\\u0300-\\u036f';
  static reComboHalfMarksRange = '\\ufe20-\\ufe2f';
  static rsComboSymbolsRange = '\\u20d0-\\u20ff';
  static rsComboRange =
    StrArray.rsComboMarksRange + StrArray.reComboHalfMarksRange + StrArray.rsComboSymbolsRange;
  static reHasUnicode = RegExp(
    '[' + StrArray.rsZWJ + StrArray.rsAstralRange + StrArray.rsComboRange + StrArray.rsVarRange + ']'
  );

  static rsFitz = '\\ud83c[\\udffb-\\udfff]';
  static rsOptVar = '[' + StrArray.rsVarRange + ']?';
  static rsCombo = '[' + StrArray.rsComboRange + ']';
  static rsModifier = '(?:' + StrArray.rsCombo + '|' + StrArray.rsFitz + ')';
  static reOptMod = StrArray.rsModifier + '?';
  static rsAstral = '[' + StrArray.rsAstralRange + ']';
  static rsNonAstral = '[^' + StrArray.rsAstralRange + ']';
  static rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
  static rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
  static rsOptJoin =
    '(?:' +
    StrArray.rsZWJ +
    '(?:' +
    [StrArray.rsNonAstral, StrArray.rsRegional, StrArray.rsSurrPair].join('|') +
    ')' +
    StrArray.rsOptVar +
    StrArray.reOptMod +
    ')*';
  static rsSeq = StrArray.rsOptVar + StrArray.reOptMod + StrArray.rsOptJoin;
  static rsSymbol =
    '(?:' +
    [
      StrArray.rsNonAstral + StrArray.rsCombo + '?',
      StrArray.rsCombo,
      StrArray.rsRegional,
      StrArray.rsSurrPair,
      StrArray.rsAstral,
    ].join('|') +
    ')';
  static reUnicode = RegExp(
    StrArray.rsFitz + '(?=' + StrArray.rsFitz + ')|' + StrArray.rsSymbol + StrArray.rsSeq,
    'g'
  );

  constructor(str: string) {
    super()
    return StrArray.toArray(str);
  }

  static toArray(val: string): Array<string> {
    return StrArray.hasUnicode(val) ? StrArray.unicodeToArray(val) : StrArray.asciiToArray(val);
  }

  static unicodeToArray(str: string): Array<string> {
    return str.match(StrArray.reUnicode) || [];
  }
  static hasUnicode(str: string): boolean {
    return StrArray.reHasUnicode.test(str);
  }

  static asciiToArray(str: string): Array<string> {
    return str.split('');
  }
}

/**
 * 回文判断, f(a) = f(b) a从头开始, b从尾部开始
 * @param str
 * @returns
 */
function palindrome(str: string): boolean {
  let result: boolean = true;

  if (typeof str !== 'string' || str === '') return false;

  /* 这里是有隐患的, 对于emoji这个方法不好 */
  // let strAry: Array<string> = Array.from(str);

  /* 使用这个方法处理 */
  let strAry: Array<string> = new StrArray(str);

  while (strAry.length > 1) {
    let front = strAry.shift();
    let last = strAry.pop();
    if (front !== last) {
      result = false;
      break;
    }
  }

  return result;
}

console.log(palindrome('🤣🤣❤️❤️🤣🤣'));

