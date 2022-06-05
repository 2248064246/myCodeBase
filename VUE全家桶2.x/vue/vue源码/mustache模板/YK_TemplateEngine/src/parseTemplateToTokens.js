import Scanner from "./Scanner";
import nestTokens from "./nestTokens";
/**
 * 将模板字符串转换成tokens数组
 */
export default function parseTemplateToTokens(tempalteStr) {
  // 创建 tokens 数组
  var tokens = [];
  // 创建扫描器
  var scanner = new Scanner(tempalteStr);
  // 收集文字
  var words;
  // 让扫描器工作，只要pos指针没到头
  while (!scanner.eos()) {
    words = scanner.scanUtil("{{");
    // 收集开始标记出现之前的文字
    if (words !== "") {
      // 判断普通文字的空格，还是标签中的空格
      // 标签中的空格不能去掉，比如 <div class="box"><></div> 不能去掉class前面的空格
      let isInJJH = false;
      // 空白字符串
      var _words = "";
      for (let i = 0; i < words.length; i++) {
        // 判断是否在标签里
        if (words[i] === "<") {
          isInJJH = true;
        } else if (words[i] === ">") {
          isInJJH = false;
        }
        if (!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          // 如果这项是空格，只有当它在标签内的时候，才拼接上
          if (isInJJH) {
            _words += words[i];
          }
        }
      }
      tokens.push(["text", _words]);
      // tokens.push(["text", words]);
    }
    scanner.scan("{{");

    // 收集双大括号中间的内容
    words = scanner.scanUtil("}}");
    if (words !== "") {
      // 这是{{}} 中间的东西，判断首字符
      if (words[0] === "#") {
        tokens.push(["#", words.substring(1)]);
      } else if (words[0] === "/") {
        tokens.push(["/", words.substring(1)]);
      } else {
        tokens.push(["name", words]);
      }
    }
    scanner.scan("}}");
  }
  // 返回折叠收集的 tokens
  return nestTokens(tokens);
}
