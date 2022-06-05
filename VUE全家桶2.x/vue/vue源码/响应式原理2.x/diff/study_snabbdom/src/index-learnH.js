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
const myVnode1 = h(
  "a",
  { props: { href: "https://www.baidu.com", target: "_blank" } },
  "YK菌"
);


const myVnode2 = h('div', '我是一个盒子') 

const myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', [
    h('div', [
      h('p', '香蕉'),
      h('p', '草莓')
    ])
  ]),
  h('li', h('span','西瓜')),
  h('li', '番茄'),
])
console.log(myVnode3);
// 让虚拟节点上树
let container = document.getElementById("container");
patch(container, myVnode3);
