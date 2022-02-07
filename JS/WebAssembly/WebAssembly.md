# WebAssembly

WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。

## 简介

对于网络平台而言，WebAssembly 具有巨大的意义——它提供了一条途径，以使得以各种语言编写的代码都可以以接近原生的速度在 Web 中运行。在这种情况下，以前无法以此方式运行的客户端软件都将可以运行在 Web 中。

WebAssembly 被设计为可以和 JavaScript 一起协同工作——通过使用 WebAssembly 的 JavaScript API，你可以把 WebAssembly 模块加载到一个 JavaScript 应用中并且在两者之间共享功能。这允许你在同一个应用中利用 WebAssembly 的性能和威力以及 JavaScript 的表达力和灵活性，即使你可能并不知道如何编写 WebAssembly 代码。

## WebAssembly 目标

- 快速、高效、可移植——通过利用常见的硬件能力，WebAssembly 代码在不同平台上能够以接近本地速度运行。
- 可读、可调试——WebAssembly 是一门低阶语言，但是它有确实有一种人类可读的文本格式（其标准即将得到最终版本），这允许通过手工来写代码，看代码以及调试代码。
- 保持安全——WebAssembly 被限制运行在一个安全的沙箱执行环境中。像其他网络代码一样，它遵循浏览器的同源策略和授权策略。
- 不破坏网络——WebAssembly 的设计原则是与其他网络技术和谐共处并保持向后兼容。

## WebAssembly 如何实现网络平台(即前端页面)

网络平台可以被想象成拥有两个部分：

1.  js 运行平台(JS 引擎)
2.  webAPI

从历史角度讲，JS 引擎过去只能加载 JavaScript。这对我们而言足够了，因为 JavaScript 足够强大从而能够解决人们在当今网络上遇到的绝大部分问题。尽管如此，当试图把 JavaScript 应用到诸如 3D 游戏、虚拟现实、增强现实、计算机视觉、图像/视频编辑以及大量的要求原生性能的其他领域的时候，我们遇到了性能问题

而且，下载、解析以及编译巨大的 JavaScript 应用程序的成本是过高的。移动平台和其他资源受限平台进一步放大了这些性能瓶颈。

WebAssembly 是一门不同于 JavaScript 的语言，但是，它不是用来取代 JavaScript 的。相反，它被设计为和 JavaScript 一起协同工作，从而使得网络开发者能够利用两种语言的优势：

- JavaScript 是一门高级语言。对于写网络应用程序而言，它足够灵活且富有表达力。它有许多优势——它是动态类型的，不需要编译环节以及一个巨大的能够提供强大框架、库和其他工具的生态系统。
- WebAssembly 是一门低级的类汇编语言。它有一种紧凑的二进制格式，使其能够以接近原生性能的速度运行，并且为诸如 C++和 Rust 等拥有低级的内存模型语言提供了一个编译目标以便它们能够在网络上运行。（注意，WebAssembly 有一个在将来支持使用了垃圾回收内存模型的语言的高级目标。）

随着 WebAssembly 出现在了浏览器中，我们前面提到的 JS 引擎将会加载和运行两种类型的代码——JavaScript 和 WebAssembly。

不同类型的代码能够按照需要进行相互调用——WebAssembly 的 JavaScript API 使用能够被正常调用的 JavaScript 函数封装了导出的 WebAssembly 代码，并且 WebAssembly 代码能够导入和同步调用常规的 JavaScript 函数。事实上，WebAssembly 代码的基本单元被称作一个模块，并且 WebAssembly 的模块在很多方面都和 ES2015 的模块是等价的

## WebAssembly 关键概念

为了理解 WebAssembly 如何在浏览器中运行，需要了解几个关键概念。所有这些概念都是一一映射到了 WebAssembly 的 JavaScript API 中。

- 模块：表示一个已经被浏览器编译为可执行机器码的 WebAssembly 二进制代码。一个模块是无状态的，并且像一个二进制大对象（Blob）一样能够被缓存到 IndexedDB 中或者在 windows 和 workers 之间进行+ 共享（通过 postMessage() (en-US)函数）。一个模块能够像一个 ES2015 的模块一样声明导入和导出。
- 内存：ArrayBuffer，大小可变。本质上是连续的字节数组，WebAssembly 的低级内存存取指令可以对它进行读写操作。
- 表格：带类型数组，大小可变。表格中的项存储了不能作为原始字节存储在内存里的对象的引用（为了安全和可移植性的原因）。
- 实例：一个模块及其在运行时使用的所有状态，包括内存、表格和一系列导入值。一个实例就像一个已经被加载到一个拥有一组特定导入的特定的全局变量的 ES2015 模块。
  JavaScript API 为开发者提供了创建模块、内存、表格和实例的能力。给定一个 WebAssembly 实例，JavaScript 代码能够调用普通 JavaScript 函数暴露出来的导出代码。通过把 JavaScript 函数导入到 WebAssembly 实例中，任意的 JavaScript 函数都能被 WebAssembly 代码同步调用。

因为 JavaScript 能够完全控制 WebAssembly 代码如何下载、编译运行，所以，JavaScript 开发者甚至可以把 WebAssembly 想象成一个高效地生成高性能函数的 JavaScript 特性。

将来，WebAssembly 模块将会像 ES2015 模块那样加载（使用`<script type='module'>`)，这也就意味着 JavaScript 代码能够像轻松地使用一个 ES2015 模块那样来获取、编译和导入一个 WebAssembly 模块。


## 如何使用 WebAssembly

1. C/C++ 编码为 WebAssembly
2. 直接在汇编层, 编写生成WebAssembly代码(这也太可怕了)
3. 编写Rust程序, 将WebAssembly作为它的输出
4. 使用AssemblyScript, 它类似于TypeScript并且可编译成二进制WebAssmebly代码

