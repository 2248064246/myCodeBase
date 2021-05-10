## less 是一门css的预处理语言
+ less是一个css的增强版,通过less可以编写更少代码实现更加强大的样式
+ 在less 中添加了许多的新特性,例如对变量的支持
+ less的语法大体上和 css 语法一致, 要执行必须先将 less 转换为css,然后在由浏览器执行
```less
    body{
        // less 中的单行注释,注释内容不会被解析到css中
        /*
        * css中的注释,内容会被解析到 css中
        */
        width: 100px;
        height: 100px;
        div{
            color: red;
        }

       
    } 
    // 变量,在变量中可以存储一个任意值
    // 并且我么可以在需要的时候,任意的修改变量中的值
    // 变量的语法: @变量名
    // 使用方法
        // 直接使用 @变量名
        // 最为类名或者一部分值使用 .@(变量名)
    // 变量名可以重名,和 js 的变量提升类似
    @a: 100px;
    @b: #000;
    @c: box2;
    box1{
        width: @a;
        color: @b;
    }
    .@(c){
        background-image: url("@{c}/1.png");
    }

    @d: 200px;
    @d: 300px: // 最终是300px, 和变量提升类似

    box2{
        // 相当于 box2 > .box3
        >.box3{
            color: red;
        }

        // 相当于 box2:hover
        &:hover{
            color: blue;
        }
    }

    .p1{
        width: 100px;
        height: 100px;
    }
    .p2:extend(.p1){
        // extend 扩展其他选择器的样式
        color: red;
    }

    .p3{
        // 直接将p1 的样式负值到这里
        // Mixin 混合
        .p1();
    }

    // 它不会被直接编译为 .p4 类, 而是作为函数使用
    .p4(){
        color: red;
    }
    .p5{
        .p4();
    }

    //  混合函数中可以设置变量, 变量可以设置默认值
    .test(@w:200px) {
        width: @w;
    }
    div{
        // 和js 的函数使用方法类似
        // 按顺序传值
        .test(300px);
    }

    // 内置函数

    // 在less 中所有的数值都可以直接进行四则运算
    // 可以通过 import"" 引入其他的less文件,可以实现模块化css
    // less 在 vscode 的配置
```                 

## 主要功能

### 运算

```less
// 运算符有 +, -, *, /, 可以对任何数字, 颜色, 或变量进行运算, 会尽可能的进行单位换算
@conversion-1: 2 + 3cm + 5mm; // 5.5 cm
@conversion-2: 2- 3cm + 10mm // 0 cm

// 注意, px 是无法转换为 cm 的
@incompatible: 3px - 1cm;  // => 结果是 2px

// 变量计算
@a: 2%;
@b: @a *2; // => 4%
@c: @a + 15%; // => 17%

// 颜色也支持计算
@color: #222244;
@color-2: @color / 2; // => #111122
```
### 转义
```less
// 允许任意字符串作为 属性值
```