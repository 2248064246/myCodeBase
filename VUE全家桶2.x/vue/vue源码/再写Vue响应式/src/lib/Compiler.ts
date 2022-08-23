import { getBindingAttr } from '../utils/Helper';

/*
 * @Author: huangyingli
 * @Date: 2022-08-22 11:35:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-22 16:27:26
 * @Description:
 */
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const doctype = /^<!DOCTYPE [^>]+>/i;

const dynamicArgAttribute =
  /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;

export function createCompiler(template: string) {
  const ast: any = parse(template.trim());

  return {
    ast,
  };
}

/**
 * 判断是否是纯粹的文本内容元素
 * @param tag
 * @returns {boolean}
 */
export const isPlainTextElement = (tag: string): boolean => {
  return !!['script', 'style', 'textarea'].find((t) => t === tag);
};

function parse(html: string): any {
  const stack: any[] = [];
  const expectHTML = true;
  const isUnaryTag = false;
  const canBeLeftOpenTag = false;
  /* 是否保留注释 */
  const shouldKeepComment = false;
  let index = 0;
  let last, lastTag: string;

  while (html) {
    last = html;
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // comment
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (shouldKeepComment) {
              commentHandle(
                html.substring(4, commentEnd),
                index,
                index + commentEnd + 3
              );
              advance(commentEnd + 3);
              continue;
            }
          }
        }

        // 条件式注释语句
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>');
          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        }

        // 文档声明
        const doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        }

        // 结束标签
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
          const curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        }

        // Start tag:
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
          
          continue;
        }
      }
    }
  }

  /**
   * 用于裁减html内容
   * @param n
   */
  function advance(n: number) {
    index += n;
    html = html.substring(n);
  }


  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match: any = {
        tagName: start[1],
        attrs: [],
        start: index,
      };
      advance(start[0].length);
      let end, attr: any;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(dynamicArgAttribute) || html.match(attribute))
      ) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function parseEndTag(tagName: string, start?: number, end?: number) {
    let pos, lowerCasedTagName;
    if (start == null) start = index;
    if (end == null) end = index;
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      /* 找到栈中相匹配的标签位置 */
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      pos = 0;
    }

    if (pos >= 0) {
      for (let i = stack.length - 1; i >= pos; i--) {
        endHandle(stack[i].tag, start, end);
      }
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      startHandle(tagName, [], true, start, end);
    } else if (lowerCasedTagName === 'p') {
      startHandle(tagName, [], false, start, end);
      endHandle(tagName, start, end);
    }
  }
}

let root;
let currentParent: any;
const stack: any[] = [];

function commentHandle(text: string, start: number, end: number) {
  if (currentParent) {
    const child = {
      type: 3,
      text,
      isComment: true,
      start,
      end,
    };
    currentParent['children'].push(child);
  }
}

function endHandle(tag: string, start: number, end: number) {
  const element = stack.pop();
  const currentParent = stack[stack.length - 1];
  element.end = end;
  closeElement(element);
}

function startHandle(
  tag: any,
  attrs: any,
  unary: boolean,
  start: number,
  end: number
) {
  // processFor(element)
  // processIf(element)
  // processOnce(element)
  let element = createASTElement(tag, attrs, currentParent);
  if (!unary) {
    currentParent = element;
    stack.push();
  } else {
    closeElement(element);
  }
}

function closeElement(element: any) {
  trimEndingWhitespace(element);
  if (!element.processed) {
    /* 处理原始element, 解析各种指令 */
    element = processElement(element);
  }
  trimEndingWhitespace(element);
}

/**
 * 删除尾随空格节点
 * @param el
 */
function trimEndingWhitespace(el: any) {
  let lastNode;
  while (
    (lastNode = el.children[el.children.length - 1]) &&
    lastNode.type === 3 &&
    lastNode.text === ' '
  ) {
    el.children.pop();
  }
}

function processElement(el: any) {
  processKey(el);

  // !todo 后续这里还要处理很多内容
  // processAttrs(el)
  return el;
}

function processKey(el: any) {
  const exp = getBindingAttr(el, 'key');
  if (exp) {
    el.key = exp;
  }
}

export function createASTElement(
  tag: string,
  attrs: Array<any>,
  parent: any | void
): any {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent,
    children: [],
  };
}

function makeAttrsMap(attrs: any): Object {
  const map = {};
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}
