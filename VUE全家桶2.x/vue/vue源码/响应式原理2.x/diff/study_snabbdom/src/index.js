import h from "./my_snabbdom/h";
import patch from "./my_snabbdom/patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

const myVnode1 = h("ul", {}, [
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "A" }, "A"),
]);

// 上树
patch(container, myVnode1);

const myVnode2 = h("ul", {}, [
  h("li", { key: "C" }, "C"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "M" }, "M"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "M" }, "M"),
]);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
};
