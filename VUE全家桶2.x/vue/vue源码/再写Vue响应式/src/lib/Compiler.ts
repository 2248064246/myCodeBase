import e from 'express';
import { text } from 'stream/consumers';
import { cache } from 'webpack';

/*
 * @Author: huangyingli
 * @Date: 2022-08-22 11:35:51
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-25 10:56:18
 * @Description:
 */
export function createCompiler(template: string) {
  // const ast: any =
  console.log(template.trim());
  const ast: any = parse(template.trim());
  let render: Function = _render(ast);
  // let render = function() {
  //   console.log('重新渲染')
  // }
  return {
    ast,
    render,
  };
}

type AST_OBJ = {
  tagName: string;
  attrs: Array<any>;
  start: number;
  end: number;
  children: Array<AST_OBJ>;
  uniqueTag: boolean;
  type: number;
  content?: string;
};

const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute =
  /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

function parse(template: string) {
  let html = template;
  let index = 0;
  let stack: string[] = [];
  let elementStack: Array<AST_OBJ> = [];
  let root: AST_OBJ;
  let textEnd;
  let last, lastTag, end: any, attr: any;
  while (html) {
    // last = html;
    // if (!lastTag) {
    //   // textEnd = html.indexOf('<');

    // }
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        const curIndex = index;
        advance(endTagMatch[0].length);
        parseEndTag(endTagMatch[1], curIndex, index);
        continue;
      }
      let matchTag = parseStartTag();
      if (matchTag) {
        elementStack.push(matchTag);
      }
    }

    let rest, text;
    if (textEnd >= 0) {
      rest = html.slice(textEnd);

      text = html.substring(0, textEnd);
    }

    if (text) {
      advance(text.length);

      chars(text, index - text.length, index);
    }
  }

  console.log(elementStack);

  root = tree(elementStack);

  console.log(root);

  return root;

  function chars(text: string, start: number, end: number) {
    console.log('文本内容', text, start, end);
    let result: AST_OBJ = {
      tagName: '',
      attrs: [],
      start,
      end,
      children: [],
      uniqueTag: true,
      type: 3,
      content: text,
    };

    elementStack.push(result);
  }

  function tree(elStack: Array<AST_OBJ>): AST_OBJ {
    let obj: AST_OBJ;
    let parent: AST_OBJ;
    let child: AST_OBJ;
    for (let i = 0; i < elStack.length; i++) {
      if (!obj) {
        obj = elStack[i];
        continue;
      }
      for (let j = i; j > 0; j--) {
        child = elStack[i];
        parent = elStack[j - 1];
        if (child && parent) {
          if (parent.start < child.start && parent.end > child.start) {
            parent.children.push(child);
            break;
          }
        }
      }
    }
    return obj;
  }

  function parseEndTag(tagName: string, start: number, end: number) {
    let endTag = stack.pop();
    console.log(tagName, start, end, endTag, stack);
    if (endTag !== tagName) {
      stack.push(endTag);
    } else {
      let len = elementStack.length;
      while (len--) {
        let el = elementStack[len];
        if (el.tagName === tagName) {
          el.end = end;
        }
      }
    }
  }

  function parseStartTag() {
    if (startTagOpen.test(html)) {
      let match = html.match(startTagOpen);
      if (match) {
        stack.push(match[1]);
        let result: AST_OBJ = {
          tagName: match[1],
          attrs: [],
          start: index,
          end: null,
          children: [],
          uniqueTag: false,
          type: 1,
        };
        advance(match[0].length);
        while (
          !(end = html.match(startTagClose)) &&
          (attr = html.match(dynamicArgAttribute) || html.match(attribute))
        ) {
          attr.start = index;
          advance(attr[0].length);
          attr.end = index;
          result.attrs.push(attr);
        }
        if (end) {
          result.uniqueTag = match[1] === 'br' || !!end[1];
          console.log('end', end);
          if (result.uniqueTag) {
            stack.pop();
          }
          advance(end[0].length);
          result.end = index;
          return result;
        }
      }
    }
  }

  function advance(n: number) {
    index += n;
    html = html.substring(n);
  }
}

function _render(ast: AST_OBJ): Function {
  let fragment = document.createDocumentFragment();

  function generator(ast: AST_OBJ, parent: Element) {
    console.log('要渲染的ast', ast, this);
    if (ast) {
      let type = ast.type;
      let tag: any;
      switch (type) {
        case 1:
          tag = document.createElement(ast.tagName);
          break;
        case 3:
          let text = ast.content;
          text = text.replace(/\{\{([\s\S]*)\}\}/g, (str, key): string => {
            return this[key];
          });
          tag = text;
          break;
      }

      if (ast.attrs.length !== 0) {
        ast.attrs.forEach((attr) => {
          let attrKey = attr[1];
          let attrValue = attr[3];
          let attrMatch = attrKey.match(/^([:@])([\s\S]*)/);
          if (attrMatch) {
            let mark = attrMatch[1];
            let key = attrMatch[2];
            switch (mark) {
              case ':':
                tag.setAttribute(key, this[attrValue]);
                break;
              case '@':
                tag.addEventListener(key, (event: any) => {
                  this.$emit(attrValue, event);
                });
                break;
            }
          } else {
            console.dir('tag', tag);
            tag.setAttribute(attrKey, attrValue);
          }
        });
      }
      if (ast.children.length !== 0) {
        ast.children.forEach((child) => {
          generator.call(this, child, tag);
        });
      }

      parent.append(tag);
    }
  }

  return function (el: Element) {
    console.log(el);
    console.dir(fragment);
    generator.call(this, ast ,fragment);
    if (!el) {
      console.warn('没有挂载点');
      return;
    }
    el.innerHTML = '';
    el.appendChild(fragment);
  };
}
