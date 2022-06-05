import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";

// 全局提供YK_TemplateEngine对象
window.YK_TemplateEngine = {
  // 渲染方法
  render(tempalteStr, data) {
    // 调用parseTemplateToTokens，可以让模板字符串变为tokens数组
    var tokens = parseTemplateToTokens(tempalteStr);
    var domStr = renderTemplate(tokens, data);
    return domStr
  },
};
