import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 创建虚拟节点
const myVnode1 = h("ul", {}, [
  h("li", { key:'A' }, "A"),
  h("li", { key:'B' }, "B"),
  h("li", { key:'C' }, "C"),
  h("li", { key:'D' }, "D"),
]);

const myVnode2 = h("ul", {}, [
  h("li", { key:'A' }, "A"),
  h("li", { key:'B' }, "B"),
  h("li", { key:'C' }, "C"),
  h("li", { key:'D' }, "D"),
  h("li", { key:'E' }, "E"),
]); 

// 让虚拟节点上树
let container = document.getElementById("container");
patch(container, myVnode1);
// 点击按钮，变换 DOM
let btn = document.getElementById("btn");
btn.onclick = function () {
  patch(myVnode1, myVnode2);
};
