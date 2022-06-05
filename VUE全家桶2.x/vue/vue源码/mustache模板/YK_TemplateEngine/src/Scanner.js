/**
 * 扫描器类
 */
export default class Scanner {
  constructor(tempalteStr) {
    this.tempalteStr = tempalteStr;
    // 指针
    this.pos = 0;
    // 尾字符串，一开始是模板字符串原文
    this.tail = tempalteStr;
  }
  // 扫描走过指定内容{{或}}，没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) { // 尾字符串首元素是tag
      // tag 有多长，比如“{{”长度是2，就让指针向后移动多少位
      this.pos += tag.length;
      // 尾元素变成tag后面的子串
      this.tail = this.tempalteStr.substr(this.pos);
    }
  }
  // 让指针进行扫描，直到遇到指定{{或}}内容结束，返回结束之前路过的文字
  scanUtil(stopTag) {
    // 记录开始执行时 pos指针 的值
    const post_backup = this.pos;
    // 指针没到头 && 当尾字符串的开头不是stopTag时，说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++;
      // 改变尾字符串 从当前指针到最后的全部字符
      this.tail = this.tempalteStr.substr(this.pos);
    }
    // 指针到头或者尾字符串开头是stopTag退出循环返回子串 指针起始位置 到 指针找到stopTag的位置
    return this.tempalteStr.substring(post_backup, this.pos);
  }
  // 判断指针是否已经到头 end of string 到头了
  eos() {
    return this.pos >= this.tempalteStr.length
  }
}
