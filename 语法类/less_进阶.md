### less 进阶完整
[toc]
#### 变量 variable


+ 变量替换
  + 选择器
  ```less
  @base: my-id;
  .@{base} {

  }

  // compile 
  .my-id {

  }
  ```
  + URLs
  ```less
  @base: "../img/"; // 需要引号
  .xxx{
    background-color: url("@{base}/01.png");
  }
  ```
  + 引入语句 @import
  ```less
    @base: "../src"; // 需要引号
    `@import "@{base}/01.css"`
  ```
  + 作为属性
  ```less
  @base: color; // 不能有引号
  .xxx {
    @{base}: blue;
    background-@{base}: blue;
  }
  ```
+ 可变变量 (变量名可以替换)
  ```less
    @primary: blue;
    @error: red;
    .xxx {
      @color: primary; // 使用@color代替primary变量名

      color: @@color // 使用时不能 @color, 必须 @@color
    }

  ```
+ 惰性求值(类似作用域内变量的预解析) 
  >和原生CSS的变量非常相似
  ```less
    .xxx {
      width: @a; // 最后结果 width: 8%;
    }
    .bbb {
      height: @a; // 最后结果 height: 89%;
      @a: 89%;
    }
    @b: @a;
    @a: 8%;
  ```
+ 属性作为变量
  ```less
  .xxx {
    color: blue;
    background-color: $color; // 可以使用作用域里面之前的属性, 也遵从 惰性求值
  }
  ```

#### 父级原则器

+ 基本
  ```less
    .a {
      &:hover {
        cursor: point;
      }

      $-hover {
        color: blue;
      }
    }

    // compile
    .a:hover {
      cursor: point;
    }
    .a-hover {
      color: blue;
    }
  ```  
+ 多重父级选择器
  ```less
  .xxx { // 示例一
    & + & {}
    & & {}
    && {}
    &,& {

    }
  }

  // compile 
  .xxx + .xxx{

  }
  .xxx .xxx {

  }
  .xxx.xxx {}
  .xxx,.xxx{}

  ```

  ```less
  .a { // 示例二
    .b {
      & > &{}
      & & {}
    }
  }
  // compile
  .a .b > .a .b {}
  .a .b .a .b {}
  ```
+ 改变选择器顺序
  ```less
  .header {
    .menu {
      border-radius: 5px;
      .no-borderradius & {
        background-image: url('images/button-background.png');
      }
    }
  }
  // compile
  .header {
    .menu{
      border-radius: 5px;
    }
  }
  .no-borderradius .header .menu {
    background-image: xxx;
  }
  ```
+ 组合
  ```less
  p, a {
    & + &
  }
  // compile 
  p + p {

  }
  a + a {}
  ```

#### 扩展 extend
+ 示例
  ```less
  .a {
    color: blue;
    &:extend(.d)
  }
  .d {
    height: 300px;
  }
  // compile
  .a {color: blue;}
  .d, .a {
    height: 300px;
  }
  ```
+ 语法
  ```less
    .a:extend(.d) {

    }
    // 等同于
    .a {
      &:extend(.d)
    }

    // 
    .a:extend(.d all) {} // 扩展所有带 .d 的选择器

    //
    .a:extend(.d){}
    .a:extend(.c){}
    // 等同于
    .a:extend(.d, .c){}
  ```
+ 扩展内部规则
  ```less
  .a:hover, .b {
    &:extend(.c)
  }
  // 等同于
  .a:hover:extend(.c)
  .b:extend(.c)
  ```
+ 扩展嵌套选择器
  ```less
  .a {
    .b {
    
    }
  }
  .c:extend(.a .b)

  // 类似的
  .a {
    .b & {

    }
  }
  .c:extend(.b .a)
  ```
+ nth 表达式
  ```less
  // nth表达式 n+3 和 1n+3 是相同的, 但是extend 会区分
  :nth-child(n+3) {

  }
  .a:extend(:nth-child(1n+3)){} // 并不会扩展上面的样式
  ```
+ 属性选择器
  ```less
  [type=identify]{}
  [type='identify']{}
  [type="identify"]{}
  // 会分别扩展这些属性选择器
  .a:extend([type=identify])
  .a:extend([type='identify'])
  .a:extend([type="identify"])
  ```
+ all 关键字
  ```less
  // all 关键字可以扩展所有的包含选择器的样式
  // 例如
  .a,
  .b.c {

  }
  .c:extend(.b all) {}
  // compile
  .a,
  .b.c,
  .c.c{}

  // 示例二
  .a {
    &:hover {}
  }
  .c:extend(.a all){}
  // compile
  .a:hover,
  .c:hover {}
  ```
+ 插值选择器
  ```less
  // 1. 插值选择器无法被扩展
  @select: .a;
  @{select}: {}
  .b:extend(@{select}){} // 无法扩展, 无法匹配@{select} 选择器

  // 2. 插值选择器可以扩展其他选择器
  .b: {}
  @{select}:extend(.b) 
  @select: .a;
  // compile
  .b,
  .a{}
  ```
+ @media 媒体查询扩展规则
  ```less
  // 只能扩展相同的媒体查询
  @media screen {
    .extendClass:extend(.select){} // 只能扩展相同媒体查询内的选择器
    .select{

    }
    .select {} // 这个将会被忽略
  }
  ```
+ 重复检测
  ```less
  // 目前没有重复检测
  .a,
  .b{}
  .c:extend(.a, .b){}
  // compile 
  .a,
  .b,
  .c,
  .c {}
  ```
+ 应用场景
  + 扩展class, 而不是写很多个
  ```less
  // 例如有一个链接 <a class="a b">aaa</a>
  // 可以通过扩展, 将a 扩展到 b
  .a {}
  .b{
    &:extend(.a)
  }
  ```  
  + 重置class(和上面的是一个意思)

#### merge
> 合并属性, 允许相同属性合并, 使用 逗号或者空格分隔, 对于 `transform` 和 `背景`, `阴影` 非常有用
+ 使用逗号
  ```less
  .mixin() {
    box-shadow+: inset 0 0 10px #555; // + 号表示 使用 ',' 分隔
    // 如果这里还有其他的样式, 会混入到下面
  }
  .myclass {
    .mixin();
    box-shadow+: 0 0 20px black; // 有加号表示在相同属性合并的的时候使用 ',' 分隔
  }
  // compile
  .myclass {
    box-shadow: 0 0 20px black, inset 0 0 10px #555;
  }
  ```
+ 使用 空格 
  ```less
  .mixin() {
    transform+_: scale(2);
  }
  .myclass {
    .mixin();
    transform+_: rotate(90deg); // 使用 空格 分隔
  }
  // compile
  .myclass {
    transform: rotate(90deg) scale(2);
  }
  ```
#### 混入 mixin
> 可以将其他选择器混入(mix-in)到现有的选择器中
+ 示例
  ```less
  a, #b {color: blue;}
  .c {
    a();
    // 或者 #b()
  }
  // 拥有两种混入方式
  // 1. a() // 推荐的
  // 2. a // 这是不推荐的, 在后续可能会去除
  ```
+ 不输出混合选择器
  ```less
  // 可以在后面添加 括号来不让混入选择器输出
  .mixin() {} // 那么这个选择器将不会被编译
  ```
+ 选择器也可以被混入
  ```less
  .mixin-select {
    &:hover {}
  }
  .a{
    .mixin-select()
  }
  // compile
  .a:hover {} // 选择器也会被混入
  ```
+ 命名空间
  ```less
  // 拥有命名空间概念, 可以选择特定命名空间下面的选择器进行混入
  .a {
    .b{}
  }
  .c {
    .a > .b() // 会将 .a 下面的 .b 混入
  }
  // 下面这些是相同的 (可以使用 > 或者 space 来选择命名空间下面的选择器)
  // .a > .b()
  // .a .b()
  // .a.b()
  ```
+ 带守卫的命名空间
  ```less
  // 命名空间可以只有在满足特定情况下才能起作用
  #a when (@mode = abc) { // #a 这个命名空间只有在 @mode = abc 的情况下, 对它使用混入才有下效果
    .mixin() {

    }
  }
  // 下面这个和上面相等
  #a {
    .mixin when (@mode = abc) {}
  }
  // when 后面可以接 条件判断语句, 也可以是函数
  ```
  + 比较符
  `<`, `>`, `=`, `=<`, `>=`
  这个 `=<` 是真的奇怪

+ !important 关键字
  ```less
  // 在混入后面加 !important 关键字, 混入的所有属性都会加上 !important 关键字
  .a {
    color: blue;
  }
  .c {
    .a() !important;
  }
  // compile
  .c {
    color: blue !important;
  }
  ```
+ 带参数混入
  ```less
  .border-radius (@radius: 5px) { // 允许默认值
    border-radius: @radius;
  }
  .a {
    .border-radius(3px); // 有参数
  }
  .b(
    .border-radius(); // 无参数, 使用默认值
  )
  ```
+ 多参数混入
  + 支持多态
  ```less
  // 使用 ';' 分隔
  .mixin(@border){
    border-radius: @border;
  }
  .mixin(@border; @padding;){
    border-radius: @border;
    padding: @padding;
  }
  .mixin(@border; @padding; @margin;) {
    border-radius: @border;
    padding: @padding;
    margin: @margin;
  }

  .a {
    .mixin(5px) // 此时混入第一个
    // 如果 第二个混入的 @padding 有默认值, 那么两个混入都会执行 (重要)
  }
  ```
  + 命名参数
  ```less
  // 依旧使用上面的例子
  .mixin(@border; @padding:5px; @margin:1px; ) {
    border-radius: @border;
    padding: @padding;
    margin: @margin;
  }

  .a {
    .mixin(5px; @margin: 5px; ) // 使用的时候必须只有一个 .mixin, 且没有写的属性需要有默认值, 不然会报错
  }
  ```
  + @arguments 变量
  ```less
  // 和JS 的 arguments 一样
  .box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
    -webkit-box-shadow: @arguments;
      -moz-box-shadow: @arguments;
        box-shadow: @arguments;
  }
  .a {
    .box-shadow(2px; 5px);
  }

  // compile
  .a {
    box-shadow: 2px 5px 1px #000;
  }
  ```
  + @reset 剩余参数
  ```less
  // 使用方法和 js 类似, 都是 ...
  .mixin(@a; @rest...) {
    // @reset 会接收到后面所有的参数
  }
  ```
  + 模式匹配
  ```less
  .mixin(dark; @color) {
    color: darken(@color, 10%);
  }
  .mixin(light; @color) {
    color: lighten(@color, 10%);
  }
  .mixin(@_; @color) {
    display: block;
  }

  @switch: light;

  .class {
    .mixin(@switch; #888); // 此时只有 light 的和 @_ 的mixin 起作用
    // 这也就是为什么 混入的参数需要 @前缀
  }
  ```
+ 将混入作为函数
  ```less
  .average(@x, @y) { // 这里使用 ',', 那么混入时也需要用',' 分隔
    @return: ((@x + @y) /2);
  }
  div {
    padding: .average(15px, 25px)[@result]; // 查找 @result 属性, 并得到其值
  }
  ```
  + 值覆盖
  ```less
  // 类似 css 的优先级和覆盖规则, 后面的会覆盖前面的
  
  // library.less
  #library() {
    .mixin() {
      prop: foo;
    }
  }

  // customize.less
  <!-- @import "library"; --> // 引入 
  #library() {
    .mixin() {
      prop: bar;
    }
  }

  .box {
    my-value: #library.mixin[prop];
  }
  ```
  + 未命名值
  ```less
  // 例如
  padding: .average(15px, 25px)[]
  // 没有写查找值, 那么会查找最后一个声明的值
  ```
  + 混入变量
  ```less
  .mixin() {
    @width: 100px;
    @height: 200px;
  }
  .a {
    .mixin();
    width: @width;
    height: @height;
  }
  @width: 200px;
  @height: 400px;
  // compile
  .a {
    width: 100px;
    height: 200px; // 优先使用内部域内的变量
  }
  ```
+ 递归混入
  ```less
  // 示例
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));    // next iteration
    width: (10px * @counter); // code for each iteration
  }

  div {
    .loop(3); // launch the loop
  }
  // compile 
  div {
    width: 10px; // 结果和 JS 的递归相同
    width: 20px;
    width: 30px;
  }
  ```

  ```less
  // 一个使用递归循环生成CSS网格类的通用示例
  .generate-columns(4);

  .generate-columns(@n, @i: 1) when (@i =< @n) {
    .column-@{i} {
      width: (@i * 100% / @n);
    }
    .generate-columns(@n, (@i + 1));
  }

  // compile
  .column-1 {
    width: 25%;
  }
  .column-2 {
    width: 50%;
  }
  .column-3 {
    width: 75%;
  }
  .column-4 {
    width: 100%;
  }
  ```
+ 混入守卫
  ```less
    // 和带守卫的命名空间一样
    .mixin(@a; @b) when (@a > @b) {}
    .mixin(@a; @b) when (@a < @b) {}
  ```
+ 类型检测
  `isnumber`
  `iscolor`
  `isstring`
  `isurl`
  `iskeyword`
  `ispixel`
  `isem`
  `isunit`
  `ispercentage`

  ```less
  .mixin(@a) when (isnumber(@a)) {}
  ```
+ 混入别名
  ```less
  .mixin(black) {
    color: black;
    background: black;
  }
  .mixin(right) {
    color: white;
    background: white;
  }
  .a {
    @colors: .mixin(black);
    color: @colors[color] // 这种的调用方法是 Maps
  }
  ```
+ 混入别名调用
  ```less
  .mixin(){
    color: black;
  }
  .a {
    @color: .mixin();
    @color(); // 这样也是可以将 .mixin中的参数混入
  }
  ```
+ Maps
  ```less
  // 允许像js 的对象一样 定义 变量, 并通过 [] 调用
  @a: {
    color: blue;
    width: 100px;
  }
  .b {
    width: @a[width];
  }
  ```