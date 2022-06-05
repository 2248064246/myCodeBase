import parseAttrsString from "./parseAttrsString";

/**
 * parse函数
 * @param {*} templateString
 * @returns
 */
export default function parse(templateString) {
  // 定义一个指针
  let i = 0;
  // 剩余部分
  let rest = "";

  // 开始标记正则
  let startRegExp = /^\<([a-z1-6]+)(\s[^\<]+)?\>/;
  // 结束标记正则
  let endRegExp = /^\<\/([a-z1-6]+)\>/;
  // 结束标记之前的文字【前面不是是<】
  let wordRegExp = /^([^\<]+)\<\/[a-z0-9]+\>/;

  // 准备两个栈
  let stack1 = []; // 辅助栈，存标签名
  let stack2 = [{ chilren: [] }];

  while (i < templateString.length - 1) {
    rest = templateString.substring(i);

    // 识别开始标签
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1];
      let attrsString = rest.match(startRegExp)[2];
      console.log(i, "检测到开始标记", tag);

      const attrsStringLength = attrsString == null ? 0 : attrsString.length;
      // 将开始标记 入栈1
      stack1.push(tag);
      // 处理标签属性
      const attrsArray = parseAttrsString(attrsString);
      // 将空数组 入栈2
      stack2.push({ tag: tag, chilren: [], attrs: attrsArray });

      i += tag.length + 2 + attrsStringLength;
    } else if (endRegExp.test(rest)) {
      // 遇见结束标签
      let tag = rest.match(endRegExp)[1];
      console.log(i, "检测到结束标记", tag);

      let pop_tag = stack1.pop();
      // 此时tag一定与stack1的栈顶相同
      if (tag === pop_tag) {
        let pop_arr = stack2.pop();

        if (stack2.length > 0) {
          stack2[stack2.length - 1].chilren.push(pop_arr);
        }
      } else {
        throw new Error(pop_tag + "标签没有封闭好");
      }

      i += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      let word = rest.match(wordRegExp)[1];
      // 看word是不是全空
      if (!/^\s+$/.test(word)) {
        // 不为空
        console.log(i, "检测到文字", word);
        // 改变stack2的栈顶元素
        stack2[stack2.length - 1].chilren.push({ text: word, type: 3 });
      }
      i += word.length;
    } else {
      i++;
    }
  }
  return stack2[0].chilren[0];
}
