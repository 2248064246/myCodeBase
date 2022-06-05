import h from "./my_snabbdom/h";

const myVnode1 = h("div", {}, [
  h("p", {}, "嘻嘻"),
  h("p", {}, "哈哈"),
  h("p", {}, h('span', {}, '呵呵')),
]);
console.log(myVnode1);
