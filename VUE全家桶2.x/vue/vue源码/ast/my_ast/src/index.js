import parse from "./parse";

let templateString = `<div>
    <h3 class="aa bb cc" v-on="xxx" id="mybox">你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
</div>`;

const AST = parse(templateString);
console.log(AST);
