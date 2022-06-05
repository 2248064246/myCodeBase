/**
 * 折叠tokens，将#xxx和/xxx之间的tokens能够折叠成Array(n)，作为xxx的末尾数组 ["#", "xxx", Array(n)]
 * @param {*} tokens
 */
export default function nestTokens(tokens) {
  // 结果数组，存储最后的嵌套数组
  var nestedTokens = [];

  // 栈，存放 # / 之间的tokens，栈顶的tokens数组中是当前操作的
  // 遇到 # 时，入栈 将#xxx和/xxx之间的tokens能够折叠成Array(n)，["#", "xxx", Array(n)]
  // 遇到 / 时，出栈
  var sections = [];

  // 收集器数组，为 栈顶 或 结果数组 收集tokens
  // 初始指向 nestedTokens结果数组，引用类型值，所以指向的是同一个数组
  // 入栈后，改变指向：入栈后栈顶末尾数组 token[2]
  // 出栈后，根据栈是否为空改变指向: 出栈后栈顶末尾数组 sections[sections.length - 1][2] 或 结果数组nestedTokens
  var collector = nestedTokens;

  for (let token of tokens) {
    // 判断token的第0个元素是什么
    switch (token[0]) {
      case "#":
        // 收集器中放入这个token（初始是nestedTokens数组，当栈中有元素时，指向栈顶token末尾数组）
        collector.push(token);
        // 入栈
        sections.push(token);
        // 改变收集器指向，指向给token添加下标为2的项
        collector = token[2] = [];
        break;
      case "/":
        // 出栈
        sections.pop();
        // 栈不空的情况下 改变收集器为 sections栈顶 末尾数组
        // 栈空就直接指向结果数组
        collector =
          sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens;
        break;
      // 普通的token
      default:
        // 栈中有元素，就进入栈顶末尾数组；栈中没有元素，就进入结果数组
        collector.push(token);
    }
  }
  return nestedTokens;
}
