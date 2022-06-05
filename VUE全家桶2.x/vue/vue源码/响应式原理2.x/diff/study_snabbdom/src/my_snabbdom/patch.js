import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./patchVnode";
/**
 * 
 * @param {object} oldVnode 
 * @param {object} newVnode 
 */
export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数是 DOM节点 还是 虚拟节点
  if (oldVnode.sel == "" || oldVnode.sel === undefined) {
    // 说明是DOM节点，此时要包装成虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(), // sel
      {}, // data
      [], // children
      undefined, // text
      oldVnode // elm
    );
  }
  // 此时新旧节点都是虚拟节点了
  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log("是同一个节点，需要精细化比较");
    patchVnode(oldVnode, newVnode);
  } else {
    console.log("不是同一个节点，暴力插入新节点，删除旧节点");
    // 创建 新虚拟节点 为 DOM节点
    let newVnodeElm = createElement(newVnode);
    // 获取旧虚拟节点真正的DOM节点
    let oldVnodeElm = oldVnode.elm;
    // 判断newVnodeElm是存在的
    if (newVnodeElm) {
      // 插入 新节点 到 旧节点 之前
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm);
    }
    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm);
  }
}
