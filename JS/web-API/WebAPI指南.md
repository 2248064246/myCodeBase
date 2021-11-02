
# WebAPI 指南


`Background Fetch API` 
一个后台请求API, 提供了一种方法来管理可能需要大量时间的下载，比如电影、音频文件和软件.
允许和后台中断连接, 在下一次连接上的时候, 会继续原来的下载


`Background Tasks API`
幕后任务协作调度API, 提供了用户代理决定(一般来说是浏览器), 在空闲时间自动执行任务队列任务的能力


`Barcode Detection API`
条形码格式检测API


`Battery API`
电源API, 提供了有关系统充电级别的信息并提供了通过电池等级或者充电状态的改变提醒用户的事件


`Beacon`
可以在当前页面关闭的时候向后台发送`post`信息, 在页面关闭后, 请求也不会停止


`Bluetooth API`
Web蓝牙API提供了与蓝牙低能耗外设连接和交互的能力


`Broadcast Channel API`
 可以实现同 源 下浏览器不同窗口，Tab页，frame或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单通讯。


`CSS Counter Styles` | `chrome 91+`
CSS Counter Styles模块允许定义自定义计数器样式，可以用于CSS列表标记和生成内容计数器(不明所以)


`CSS Font Loading API` | `chrome 35+`
css 字体动态加载API


`CSS Painting API`
允许CSS修改DOM的背景


`CSS Type Object Model API`
允许像对象一样在JS中操作css


`CSSOM`
CSS Object Model 是一组允许用JavaScript操纵CSS的API


`Canvas API`


`Channel Messaging API`
允许统一页面的不同上下文文档之间互相通信(例如主页面和iframe之间, worker之间)


`Clipboard API` | `chrome 66+` | `HTTPS only`
供了响应剪贴板命令（剪切、复制和粘贴）与异步读写系统剪贴板的能力


`COnsole API`


`Contact Picker API` | `不支持` | `HTTPS only`
可以调用系统联系人信息, 并选择(我觉得比较适用于手机端, 但是目前还没有浏览器支持)


`Content Index API`
就是可以通过js向浏览器写入类似 mock 数据


`Credential Management API`
凭证管理API


`DOM`


`Encoding API`
提供了一种机制来处理各种字符编码的文本，包括遗留的非utf -8编码


`Encrypted Media Extensions API`
加密媒体扩展API提供接口来控制受数字限制管理方案约束的内容的回放。(不知道干嘛的)


`Fetch API`


`File System Access API` | `不明` | `HTTPS only`
文件系统访问API允许读、写和文件管理能力。
这个API允许与用户本地设备或用户可访问的网络文件系统上的文件进行交互。这个API的核心功能包括读取文件、写入或保存文件，以及访问目录结构


`File and Directory Entries API` | `chrome 18+` 
文件与目录条目 API 模拟一个 web 应用可以导航和访问的本地文件系统。你在虚拟的沙箱文件系统中可以开发一个读、写、创建文件或者目录的应用。


`Fullscreen API`


`Gamepad API`
可以给予开发者一种简单、统一的方式来识别并响应游戏控制器（手柄）


`Geolocation API`
地理位置 API 允许用户向 Web 应用程序提供他们的位置。出于隐私考虑，报告地理位置前会先请求用户许可。


`HTML Drag and Drop API`


`Sanitizer API` | 不支持(需要显示开启 chrome93+)
允许开发人员获取HTML和Document或DocumentFragment对象的不可信字符串，并对它们进行消毒，以便安全插入到文档的DOM中。


`High Resolution Time`
高时间采样率标准定义了Performance接口，该接口支持应用程序中客户端的延时测量。Performance接口被认为是高采样率的，因为其精确度可达千分之一毫秒（受硬件或软件限制）。


`History API`


`Image Capture API` | `chrome 59+`
MediaStream Image Capture API是一个用于从摄影设备捕捉图像或视频的API。除了捕捉数据，它还允许您检索有关设备功能的信息，如图像大小、红眼减少、是否有闪光灯以及它们当前的设置。相反，API允许在设备允许的约束内配置功能


`Indexed DB` 

 
`Intersection Observer API` | `chrome 51`
Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。


`Layout Instability API`
布局不稳定性API, 用于记录布局变化


`Long Tasks API`
长任务API, 它可以直观地告诉我们哪些任务执行耗费了50毫秒或更多时间。


`Media Capabilities API`
媒体能力API允许开发人员确定设备的解码和编码能力，显示信息，如是否支持媒体，播放是否流畅和功率效率，与播放的实时反馈，以更好地启用自适应流，并访问显示属性信息。


`Media Stream API` | `chrome 55+`
媒体流处理API, 是一个与WebRTC相关的API，它提供了对流音频和视频数据的支持。
它提供了处理流及其组成轨道的接口和方法、与数据格式相关的约束、异步使用数据时的成功和错误回调以及流程中触发的事件。


`Media Session API` | `chrome 73+`
媒体会话API提供了一种自定义媒体通知的方法。它通过提供元数据，让用户代理显示你的web应用正在播放的媒体。


`Media Source API` | `chrome 23+`
媒体源扩展 API（MSE） 提供了实现无插件且基于 Web 的流媒体的功能。使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用 `<audio>` 和 `<video>` 元素进行播放。


`MediaStream Recording API`
允许记录保存媒体流


`Navigation Timing API`
你可以使用Navigation Timing API在客户端收集性能数据，并用XMLHttpRequest 或其它技术传送到服务端。同时，该API使你可以衡量之前难以获取的数据，如卸载前一个页面的时间，在域名解析上的时间，在执行load (en-US)事件处理器上花费的总时间等。


`Page Visibility API` | `chrome 33+`
页面可见性API


`Payment Request API` | `chrome 76+` | `HTTPS only`
支付请求API


`Performance API`


`Performance Timeline API`
Performance Timeline API定义了对Performance接口的扩展，以支持应用程序中的客户端延迟度量。扩展提供了基于特定筛选条件检索性能条目指标的接口。该标准还包括允许应用程序定义性能观察者回调的接口，当特定的性能事件被添加到浏览器的性能时间轴时，这些回调会被通知。


`Periodic Background Sync`
Web周期性后台同步API提供了一种方法，可以通过网络连接定期注册要在service worker中运行的任务。这些任务被称为周期性后台同步请求。


`Permissions API`
Permissions API提供了一种一致的编程方式来查询归因于当前上下文的API权限的状态。例如，Permissions API可用于确定是否授予或拒绝访问特定API的权限


`Picture-in-Picture API` | `chrome 69`
画中画API, 允许视频浮动, 并以小窗模式播放


`Pointer Events`


`Pointer Lock API`


`Presentation API`
表示API允许用户代理(如Web浏览器)通过大型表示设备(如投影仪和网络连接电视)有效地显示Web内容。


`Push API` | `chrome 42+`
Push API 给与了Web应用程序接收从服务器发出的推送消息的能力，无论Web应用程序是否在用户设备前台，甚至刚加载完成。这样，开发人员就可以向用户投放异步通知和更新，从而让用户能更及时地获取新内容。


`Resize Observer API`
Resize Observer API提供了一种高性能的机制，通过该机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。


`Resource Timing API`
通过Resource Timing API可以获取和分析应用资源加载的详细网络计时数据, 应用程序可以
使用时间度量标准来确定加载特定资源所需要的时间, 比如 XMLHttpRequest, `<SVG>`, 图片, 或者脚本.


`Screen Capture API`
屏幕捕获API对现有的媒体捕获和流API进行了补充，让用户选择一个屏幕或屏幕的一部分（如一个窗口）作为媒体流进行捕获。然后，该流可以被记录或通过网络与他人共享。


`Screen Orientation API` 
提供屏幕方向的信息


`Screen Wake Lock API` | `chrome 84+`
Screen Wake Lock API提供了一种方法，当应用程序需要继续运行时，可以防止设备调暗或锁定屏幕


`Sensor API` 
传感器API （Sensor APIs）是一组统一设计的接口，它们在web平台中为各类传感器提供了一致的访问方式。


`Server-sent Events`
使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。


`Service Worker API`
Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用采取来适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。


`Storage API` | `chrome 55+` | `HTTPS only`
Web 存储标准，the Storage Standard，定义了一个通用的、共享的存储系统，供所有 API 和技术使用，以存储各个网站的内容可访问数据。 


`Stream API` | `chrome 43+`
Streams API允许JavaScript以编程的方式访问通过网络接收的数据流，并根据开发人员的需要处理它们。


`Touch Event`


`URL API`


`URL Pattern API`
URL模式API定义了用于创建URL模式匹配器的语法。这些模式可以针对URL或单个URL组件进行匹配。URLPattern API由URLPattern接口使用。


`Vibration API`
大多数现代移动设备包括振动硬件，其允许软件代码通过使设备摇动来向用户提供物理反馈。Vibration API为Web应用程序提供访问此硬件（如果存在）的功能，如果设备不支持此功能，则不会执行任何操作。


`Visual Viewport API`
Visual Viewport API提供了一个显式的机制，用于查询和修改窗口的可视化视图的属性。可视视区是屏幕的可视部分，不包括屏幕上的键盘、缩放区域之外的区域或任何其他不随页面尺寸缩放的屏幕工件。


`Web Animations`


`Web Audio API`


`Web Authentication API`


`Web Crypto API`


`Web MIDI API`
Web MIDI API与乐器数字接口(MIDI)设备连接并交互。
接口处理发送和接收MIDI消息的实际方面。因此，该API可以用于音乐和非音乐用途，任何MIDI设备都可以连接到您的计算机


`Web Notifications`


`Web Share API`
Web Share API提供了一种机制，用于将文本、链接、文件和其他内容共享到用户选择的任意共享目标


`Web Speech API` 
Web Speech API 使您能够将语音数据合并到 Web 应用程序中。 Web Speech API 有两个部分：SpeechSynthesis 语音合成 （文本到语音 TTS）和 SpeechRecognition  语音识别（异步语音识别）。


`Web Storage API`


`Web Workers API`


`WebGL`


`WebCodecs API` 
WebCodecs API让web开发人员能够低级地访问视频流的单个帧和音频块。它对于需要完全控制媒体处理方式的web应用程序非常有用。例如，视频或音频编辑器和视频会议。


`WebRTC`


`WebHID`
人接口设备(HID)是一种从人那里接收输入或向人提供输出的设备。它还提到了HID协议，这是一个用于主机和设备之间双向通信的标准，旨在简化安装程序。HID协议最初是为USB设备开发的，但后来在许多其他协议上实现，包括蓝牙。


`WebVR`


`WebVTT`
Web视频文本跟踪格式 (WebVTT) 是一种使用<track>元素显示定时文本轨道（如字幕或标题）的格式。 WebVTT文件的主要用途是将文本叠加添加到<video>。 WebVTT是一种基于文本的格式，必须使用UTF-8进行编码。


`Websocket API`


`XMLHttpRequest`




