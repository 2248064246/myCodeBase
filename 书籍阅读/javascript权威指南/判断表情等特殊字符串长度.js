/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-08 12:48:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-08 13:28:53
 * @Description: 
 */
let rsAstralRange = '\\ud800-\\udfff',
  rsZWJ = '\\u200d',
  rsVarRange = '\\ufe0e\\ufe0f',
  rsComboMarksRange = '\\u0300-\\u036f',
  reComboHalfMarksRange = '\\ufe20-\\ufe2f',
  rsComboSymbolsRange = '\\u20d0-\\u20ff',
  rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
let reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

let rsFitz = '\\ud83c[\\udffb-\\udfff]',
  rsOptVar = '[' + rsVarRange + ']?',
  rsCombo = '[' + rsComboRange + ']',
  rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
  reOptMod = rsModifier + '?',
  rsAstral = '[' + rsAstralRange + ']',
  rsNonAstral = '[^' + rsAstralRange + ']',
  rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
let reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

function toArray(val) { // 字符串转成数组
  return hasUnicode(val) ?
    unicodeToArray(val) :
    asciiToArray(val);
}

function hasUnicode(val) {
  return reHasUnicode.test(val);
}

function unicodeToArray(val) {
  return val.match(reUnicode) || [];
}

function asciiToArray(val) {
  return val.split('');
}

