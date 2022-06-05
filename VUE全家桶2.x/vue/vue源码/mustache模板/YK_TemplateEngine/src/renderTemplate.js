import lookup from './lookup'
import parseArray from './parseArray'
/**
 * 让 tokens数组 变成 DOM字符串
 * @param {array} tokens
 * @param {object} data
 */
export default function renderTemplate(tokens, data) {
  // 结果字符串
  let resultStr = "";
  for (let token of tokens) {
    if (token[0] === "text") {
      resultStr += token[1];
    } else if (token[0] === "name") {
      resultStr += lookup(data, token[1]);
    } else if (token[0] === "#") {
      // 递归调用 renderTemplate
      resultStr += parseArray(token, data)
    }
  }
  return resultStr;
}
